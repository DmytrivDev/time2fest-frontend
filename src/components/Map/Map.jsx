import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { CircleFlag } from 'react-circle-flags';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as d3 from 'd3';
import clsx from 'clsx';

import Zones from './Zones';
import TimeLines from './TimeLines';
import Borders from './Borders';
import DayLine from './DayLine';
import ZonesList from './ZonesList';
import MapHintOverlay from './MapHintOverlay';

import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useMapStore } from '../../stores/useMapStore';
import { useTimeZoneCountries } from '../../hooks/useTimeZoneCountries';

import styles from './Map.module.scss';

let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

let WORLD_W = window.innerWidth;

if (WORLD_W > 1140) {
  WORLD_W = WORLD_W - 3.75 * rem;
} else {
  WORLD_W = WORLD_W - 2 * rem;
}

WORLD_W = Math.min(WORLD_W, 1440);
let WORLD_H = WORLD_W * 0.55;
const MAX_K = 8;
const WHEEL_SENS = 0.0015;
const EPS = 0.05;
const BASE_S = 1;

export default function Map() {
  const { t } = useTranslation('common');
  const locale = getValidLocale();

  // ---- Zustand state ----
  const mode = useMapStore(s => s.mode);
  const setMode = useMapStore(s => s.setMode);
  const selectedZone = useMapStore(s => s.selectedZone);
  const selectedCountry = useMapStore(s => s.selectedCountry);
  const hasSelection = useMapStore(s => s.hasSelection);
  const setMapSelection = useMapStore(s => s.setMapSelection);
  const setHasSelection = useMapStore(s => s.setHasSelection);
  const listLevel = useMapStore(s => s.listLevel);
  const listZone = useMapStore(s => s.listZone);
  const enterListCountries = useMapStore(s => s.enterListCountries);
  const backToListZones = useMapStore(s => s.backToListZones);

  const listRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // MAP data
  const {
    data: tzCountriesMap,
    isLoading: tzLoadingMap,
    error: tzErrorMap,
  } = useTimeZoneCountries(selectedZone);

  // LIST zones
  const {
    data: zonesResp,
    isLoading: zonesLoading,
    error: zonesError,
  } = useQuery({
    enabled: mode === 'list' && listLevel === 'zones',
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(
        `/time-zones?populate=countries&locale=${locale}`
      );
      return res.data?.data ?? res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // LIST countries
  const {
    data: tzCountriesList,
    isLoading: tzLoadingList,
    error: tzErrorList,
  } = useTimeZoneCountries(
    mode === 'list' && listLevel === 'countries' ? listZone : null
  );

  const getCode = c =>
    (
      c?.CountryCode ??
      c?.attributes?.CountryCode ??
      c?.attributes?.code ??
      c?.code ??
      ''
    )
      .toString()
      .toUpperCase();

  const mapItems = selectedCountry
    ? Array.isArray(tzCountriesMap)
      ? tzCountriesMap.filter(c => getCode(c) === selectedCountry)
      : []
    : Array.isArray(tzCountriesMap)
      ? tzCountriesMap
      : [];

  const scrollListTop = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        const top =
          listRef.current.getBoundingClientRect().top + window.scrollY - 45;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  };

  const handleZoneClick = (zoneCode, countryCode) => {
    if (countryCode) {
      setMapSelection(zoneCode || null, countryCode);
    } else if (zoneCode) {
      setMapSelection(zoneCode, null);
    }
    setHasSelection(true);
    scrollListTop();
  };

  const handlePickZoneFromList = zoneCode => {
    enterListCountries(zoneCode);
    scrollListTop();
  };

  const handleBackToZones = () => {
    backToListZones();
    scrollListTop();
  };

  return (
    <section id="new-year" className={styles.map}>
      <div className="container">
        <div className={styles.top}>
          <h2>{t('controls.map_title')}</h2>

          <ToggleGroup.Root
            type="single"
            value={mode}
            onValueChange={v => v && setMode(v)}
            className={styles.toggleWrap}
          >
            <ToggleGroup.Item value="map" className={styles.toggleItem}>
              <span>{t('controls.map')}</span>
            </ToggleGroup.Item>

            <ToggleGroup.Item value="list" className={styles.toggleItem}>
              <span>{t('controls.list')}</span>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        {mode === 'map' && (
          <>
            <MapCanvas t={t} key={windowWidth} onZoneClick={handleZoneClick} />
            <div ref={listRef}>
              {hasSelection && (
                <ZonesList
                  type="countries"
                  zone={selectedZone}
                  loading={tzLoadingMap}
                  error={tzErrorMap}
                  items={mapItems}
                />
              )}
            </div>
          </>
        )}

        {mode === 'list' && (
          <div ref={listRef}>
            {listLevel === 'zones' && (
              <ZonesList
                type="zones"
                loading={zonesLoading}
                error={zonesError}
                items={zonesResp}
                onZonePick={handlePickZoneFromList}
              />
            )}
            {listLevel === 'countries' && (
              <ZonesList
                type="countries"
                zone={listZone}
                loading={tzLoadingList}
                error={tzErrorList}
                items={Array.isArray(tzCountriesList) ? tzCountriesList : []}
                onBack={handleBackToZones}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------- MapCanvas --------------------- */
function MapCanvas({ t, onZoneClick }) {
  const viewportRef = useRef(null);
  const svgRef = useRef(null);
  const worldRef = useRef(null);
  const zoomRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // одразу показуємо loading
    setIsLoading(true);

    // знімаємо після першого кадру + невеликої затримки
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // можна підрегулювати час
    });
  }, []);

  rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  WORLD_W = window.innerWidth;
  if (WORLD_W > 1140) {
    WORLD_W = WORLD_W - 3.75 * rem;
  } else {
    WORLD_W = WORLD_W - 2 * rem;
  }
  WORLD_W = Math.min(WORLD_W, 1440);
  WORLD_H = WORLD_W * 0.55;

  const [worldSize, setWorldSize] = useState({ w: WORLD_W, h: WORLD_H });
  const VB_W = worldSize.w;
  const VB_H = worldSize.h;

  useEffect(() => {
    const prevWidthRef = { current: window.innerWidth };

    const updateWorldSize = () => {
      const newWidth = window.innerWidth;

      // ⚡ нічого не робимо, якщо ширина не змінилась
      if (newWidth === prevWidthRef.current) return;
      prevWidthRef.current = newWidth;

      if (
        window.matchMedia('(orientation: portrait)').matches &&
        viewportRef.current
      ) {
        // 📱 тільки в портреті
        setWorldSize({
          w: viewportRef.current.clientWidth,
          h: viewportRef.current.clientHeight,
        });
      } else {
        const rem = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );

        WORLD_W = newWidth;

        if (WORLD_W > 1140) {
          WORLD_W = WORLD_W - 3.75 * rem;
        } else {
          WORLD_W = WORLD_W - 2 * rem;
        }

        WORLD_W = Math.min(WORLD_W, 1440);
        WORLD_H = WORLD_W * 0.55;

        setWorldSize({ w: WORLD_W, h: WORLD_H });
      }
    };

    updateWorldSize(); // виклик при монтуванні
    window.addEventListener('resize', updateWorldSize);
    return () => window.removeEventListener('resize', updateWorldSize);
  }, []);

  const tfRef = useRef({ k: 1, x: 0, y: 0 });
  const baseKRef = useRef(1);

  rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  WORLD_W = window.innerWidth;
  if (WORLD_W > 1140) {
    WORLD_W = WORLD_W - 3.75 * rem;
  } else {
    WORLD_W = WORLD_W - 2 * rem;
  }
  WORLD_W = Math.min(WORLD_W, 1440);
  WORLD_H = WORLD_W * 0.55;

  const boxRef = useRef({ x: 0, y: 0, width: WORLD_W, height: WORLD_H });

  const [uiScale, setUiScale] = useState(100);
  const rafRef = useRef(null);
  const hoveringRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // Tooltip state
  const tooltipRef = useRef(null);
  const tipSizeRef = useRef({ w: 220, h: 80 });
  const [tip, setTip] = useState({
    show: false,
    x: 0,
    y: 0,
    tt: null,
    label: '',
    time: '',
    flags: [],
    country: null,
  });

  useEffect(() => {
    const check = () => {
      const portrait = window.matchMedia('(orientation: portrait)').matches;
      setIsMobile(portrait);
    };

    check(); // одразу при завантаженні
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);

    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  const getDeviceScale = () => {
    const svg = svgRef.current;
    if (!svg) return 1;
    const vpW = svg.clientWidth;
    const vpH = svg.clientHeight;
    return Math.min(vpW / VB_W, vpH / VB_H);
  };

  const snapToPixel = t => {
    const s = getDeviceScale();
    const snap = v => Math.round(v * s) / s;
    return { k: t.k, x: snap(t.x), y: snap(t.y) };
  };

  const clampTransform = t => {
    const box = boxRef.current;
    const kpx = t.k * BASE_S;
    const contentW = box.width * kpx;
    const contentH = box.height * kpx;

    const minX = VB_W - kpx * (box.x + box.width);
    const maxX = -kpx * box.x;
    const minY = VB_H - kpx * (box.y + box.height);
    const maxY = -kpx * box.y;

    let x = t.x;
    let y = t.y;

    x = Math.min(Math.max(x, minX), maxX);
    y = Math.min(Math.max(y, minY), maxY);

    return { k: t.k, x, y };
  };

  const applyToDOM = t => {
    if (!worldRef.current) return;
    worldRef.current.setAttribute(
      'transform',
      `translate(${t.x},${t.y}) scale(${t.k * BASE_S})`
    );
    tfRef.current = t;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setUiScale(Math.round((t.k / baseKRef.current) * 100));
      });
    }
  };

  const fitToViewport = (animate = false) => {
    const svg = d3.select(svgRef.current);
    if (!worldRef.current) return;

    const box = worldRef.current.getBBox(); // завжди свіже
    boxRef.current = box;

    const baseK = Math.max(VB_W / box.width, VB_H / box.height);

    baseKRef.current = baseK;
    zoomRef.current?.scaleExtent([baseK, MAX_K]);

    let x, y;
    if (isMobile) {
      // карта вирівнюється вправо
      x = VB_W - baseK * (box.x + box.width);
      y = -baseK * box.y;
    } else {
      // карта центрована
      x = (VB_W - box.width * baseK) / 2 - box.x * baseK;
      y = (VB_H - box.height * baseK) / 2 - box.y * baseK;
    }

    const t = { k: baseK, x, y };
    const snapped = snapToPixel(t);
    const zt = d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k);

    if (animate) {
      svg.transition().duration(150).call(zoomRef.current.transform, zt);
    } else {
      svg.call(zoomRef.current.transform, zt);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (!viewportRef.current) return;

      setWorldSize({
        w: viewportRef.current.clientWidth,
        h: viewportRef.current.clientHeight,
      });

      // ⚡️ одразу підлаштовуємо карту
      requestAnimationFrame(() => {
        if (worldRef.current) {
          const box = worldRef.current.getBBox();
          boxRef.current = box;
          fitToViewport(false);
        }
      });
    };

    window.addEventListener('orientationchange', handleResize);
    handleResize();
    return () => window.removeEventListener('orientationchange', handleResize);
  }, [isMobile]);

  // після зміни worldSize повністю скидаємо transform
  useEffect(() => {
    if (!svgRef.current || !zoomRef.current || !worldRef.current) return;

    const svg = d3.select(svgRef.current);

    // чекаємо, поки DOM відміряє нові розміри
    requestAnimationFrame(() => {
      const box = worldRef.current.getBBox();
      boxRef.current = box;

      // тепер скидаємо transform
      svg.property('__zoom', d3.zoomIdentity);
      tfRef.current = { k: 1, x: 0, y: 0 };

      // і викликаємо fitToViewport вже після оновленого box
      requestAnimationFrame(() => {
        fitToViewport(true);
      });
    });
  }, [worldSize.w, worldSize.h, isMobile]);

  const zoomBy = factor => {
    const svg = svgRef.current;
    if (!svg) return;
    const cur = tfRef.current;
    const nextK = Math.min(Math.max(cur.k * factor, baseKRef.current), MAX_K);
    if (Math.abs(nextK - cur.k) < 1e-6) return;

    const s0 = getDeviceScale();
    const mxu = svg.clientWidth / 2 / s0;
    const myu = svg.clientHeight / 2 / s0;

    const denom = cur.k * BASE_S;
    const worldX = (mxu - cur.x) / denom;
    const worldY = (myu - cur.y) / denom;

    const nextX = mxu - worldX * (nextK * BASE_S);
    const nextY = myu - worldY * (nextK * BASE_S);

    const bounded = clampTransform({ k: nextK, x: nextX, y: nextY });
    const snapped = snapToPixel(bounded);

    d3.select(svgRef.current).call(
      zoomRef.current.transform,
      d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k)
    );
  };

  // init zoom
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const world = d3.select(worldRef.current);
    svg.style('overflow', 'hidden');

    const zoom = d3
      .zoom()
      .filter(e => {
        // колесо миші — тільки з ctrl/cmd
        if (e.type === 'wheel') return e.ctrlKey || e.metaKey;

        // жести на сенсорі — тільки якщо два пальці
        if (
          e.type === 'touchstart' ||
          e.type === 'touchmove' ||
          e.type === 'touchend'
        ) {
          return e.touches && e.touches.length === 2;
        }

        // миша — залишаємо як є
        return !e.ctrlKey && !e.metaKey;
      })
      .wheelDelta(e => -e.deltaY * WHEEL_SENS)
      .on('zoom', event => {
        const raw = {
          k: event.transform.k,
          x: event.transform.x,
          y: event.transform.y,
        };
        const bounded = clampTransform(raw);
        const snapped = snapToPixel(bounded);

        svg.property(
          '__zoom',
          d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k)
        );
        world.attr(
          'transform',
          `translate(${snapped.x},${snapped.y}) scale(${snapped.k * BASE_S})`
        );
        applyToDOM(snapped);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    const rId = requestAnimationFrame(() => {
      const box = worldRef.current.getBBox();
      boxRef.current = box;
      fitToViewport(false);
    });

    const onResize = () => {
      // чекаємо поки DOM перерахує розміри
      requestAnimationFrame(() => {
        if (viewportRef.current) {
          setWorldSize({
            w: viewportRef.current.clientWidth,
            h: viewportRef.current.clientHeight,
          });

          // ще один кадр, щоб точно було оновлено
          requestAnimationFrame(() => {
            const box = worldRef.current?.getBBox();
            if (box) {
              boxRef.current = box;
              fitToViewport(false);
            }
          });
        }
      });
    };
    window.addEventListener('orientationchange', onResize);

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('orientationchange', onResize);
      svg.on('.zoom', null);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // wheel/gesture/keyboard
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const onWheelCapture = e => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    el.addEventListener('wheel', onWheelCapture, {
      passive: false,
      capture: true,
    });

    const stopGesture = e => e.preventDefault();
    el.addEventListener('gesturestart', stopGesture, { passive: false });
    el.addEventListener('gesturechange', stopGesture, { passive: false });
    el.addEventListener('gestureend', stopGesture, { passive: false });

    const onKeyDown = e => {
      if (!hoveringRef.current) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const isMinus =
        e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract';
      const isPlus =
        e.key === '+' ||
        e.key === '=' ||
        e.code === 'Equal' ||
        e.code === 'NumpadAdd';
      const isZero =
        e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0';
      if (isMinus || isPlus || isZero) e.preventDefault();
      if (isMinus) zoomBy(0.84);
      else if (isPlus) zoomBy(1.19);
      else if (isZero) fitToViewport(true);
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheelCapture, true);
      el.removeEventListener('gesturestart', stopGesture);
      el.removeEventListener('gesturechange', stopGesture);
      el.removeEventListener('gestureend', stopGesture);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Tooltip
  const computeTipPos = (mx, my) => {
    const vp = viewportRef.current;
    const { w, h } = tipSizeRef.current;
    const pad = 12;
    if (!vp) return { x: mx + pad, y: my + pad };
    const rectW = vp.clientWidth;
    const rectH = vp.clientHeight;

    let x = mx + pad;
    let y = my + pad;

    if (x + w > rectW) x = mx - w - pad;
    if (y + h > rectH) y = my - h - pad;

    x = Math.max(0, Math.min(x, Math.max(0, rectW - w)));
    y = Math.max(0, Math.min(y, Math.max(0, rectH - h)));

    return { x, y };
  };

  const MAX_FLAGS_DISPLAY = 5;

  const handlePointerMove = e => {
    const vp = viewportRef.current;
    if (!vp) return;

    const closest = e.target?.closest?.('[data-tt]');
    const rect = vp.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (!closest) {
      if (tip.show) setTip(s => ({ ...s, show: false }));
      return;
    }

    const ttRaw = closest.getAttribute('data-tt');
    const tt = ttRaw ? Number(ttRaw) : null;

    const label =
      closest.getAttribute('data-label') ||
      closest.getAttribute('data-name') ||
      closest.id ||
      '';

    const time = closest.getAttribute('data-time') || '';
    const flagsStr = closest.getAttribute('data-flags') || '';
    const flags = flagsStr
      .split(',')
      .map(f => f.trim().toLowerCase())
      .filter(Boolean);

    const country =
      (closest.getAttribute('data-country') || '').toLowerCase() ||
      flags[0] ||
      null;

    const pos = computeTipPos(mx, my);

    setTip({
      show: true,
      x: pos.x,
      y: pos.y,
      tt,
      label,
      time,
      flags,
      country,
    });
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    setTip(s => ({ ...s, show: false }));
  };

  const zoomByPublic = factor => zoomBy(factor);
  const fitPublic = () => fitToViewport(true);

  return (
    <div
      className={clsx(styles.wrap, 'mapWrap', { [styles.loading]: isLoading })}
    >
      <div className={clsx(styles.loadingMap, 'loading')}></div>
      <div className={styles.controls}>
        <button
          onClick={() => zoomByPublic(0.84)}
          aria-label={t('controls.zoom_out')}
        >
          -
        </button>
        <span>{uiScale}%</span>
        <button
          onClick={() => zoomByPublic(1.19)}
          aria-label={t('controls.zoom_in')}
        >
          +
        </button>
        <button onClick={fitPublic}>{t('controls.reset')}</button>
      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => (hoveringRef.current = true)}
        onMouseMove={handlePointerMove}
      >
        <MapHintOverlay viewportRef={viewportRef} />
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${worldSize.w} ${worldSize.h}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width={worldSize.w}
            height={worldSize.h}
            fill="#484848"
            pointerEvents="all"
          />
          <g ref={worldRef}>
            <WorldContent onZoneClick={onZoneClick} />
          </g>
        </svg>

        {/* Tooltip */}
        {tip.show && (
          <div
            ref={tooltipRef}
            className={styles.tooltip}
            style={{ left: tip.x, top: tip.y }}
            onMouseEnter={e => e.stopPropagation()}
          >
            {tip.tt === 1 && (
              <div>
                <div className={styles.topTool}>
                  <strong>{tip.label}</strong>
                  {tip.flags?.length > 0 && (
                    <div className={styles.flagsList}>
                      {tip.flags.slice(0, MAX_FLAGS_DISPLAY).map(code => (
                        <CircleFlag key={code} countryCode={code} height={16} />
                      ))}
                      {tip.flags.length > MAX_FLAGS_DISPLAY && (
                        <span>+{tip.flags.length - MAX_FLAGS_DISPLAY}</span>
                      )}
                    </div>
                  )}
                </div>
                {tip.time && (
                  <div className={styles.toolTime}>
                    {tip.time} <em>{t('tooltip.by_your_time')}</em>
                  </div>
                )}
              </div>
            )}

            {tip.tt === 2 && (
              <div>
                <div className={styles.topToolC}>
                  {tip.country && (
                    <CircleFlag countryCode={tip.country} height={16} />
                  )}
                  <strong style={{ lineHeight: 1.2 }}>{tip.label}</strong>
                </div>
                {tip.time && (
                  <div className={styles.toolTime}>
                    {tip.time} <em>{t('tooltip.by_your_time')}</em>
                  </div>
                )}
              </div>
            )}

            {!tip.tt && <div />}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------- WorldContent --------------------- */
function WorldContent({ onZoneClick }) {
  return (
    <svg
      width="1781"
      height="911"
      viewBox="0 0 1781 911"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1781" height="911" fill="#D2D1D1" />
      <g id="Group 43">
        <g id="Time_zones_of_the_world-UTC (1) 4" clipPath="url(#clip0_0_1)">
          <g id="Group">
            <path
              id="Vector"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.99567 0H1777C1779.22 0 1779 0 1781 0.000556886V911C1779 911 1779.22 911 1777 911H3.99567C1.78207 911 2.5 911 0 911V0.000556886C2 0 1.78207 0 3.99567 0Z"
              fill="#474747"
            />
          </g>
          <Zones onZoneClick={onZoneClick} />
          <Borders />
          <TimeLines />
          <DayLine />
        </g>
      </g>
    </svg>
  );
}
