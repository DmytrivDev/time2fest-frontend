// Map.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useQuery } from '@tanstack/react-query';

import Zones from './Zones';
import TimeLines from './TimeLines';
import Borders from './Borders';
import DayLine from './DayLine';
import ZonesList from './ZonesList';

import { useTimeZoneCountries } from '@/hooks/useTimeZoneCountries';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { CircleFlag } from 'react-circle-flags';

// Zustand store з персистом
import { useMapStore } from '@/stores/useMapStore';

import styles from './Map.module.scss';

const WORLD_W = 1440;
const WORLD_H = 742;
const MAX_K = 8;
const WHEEL_SENS = 0.0015;
const EPS = 0.05;
const BASE_S = 1;
const ALIGN = { x: 'left', y: 'top' };
const VB_W = WORLD_W;
const VB_H = WORLD_H;

export default function Map() {
  const { t } = useTranslation('common');
  const locale = getValidLocale();

  // ---- глобальний стан із Zustand (персиститься) ----
  const mode = useMapStore((s) => s.mode);
  const setMode = useMapStore((s) => s.setMode);

  const selectedZone = useMapStore((s) => s.selectedZone);
  const selectedCountry = useMapStore((s) => s.selectedCountry);
  const hasSelection = useMapStore((s) => s.hasSelection);
  const setMapSelection = useMapStore((s) => s.setMapSelection);
  const setHasSelection = useMapStore((s) => s.setHasSelection);

  const listLevel = useMapStore((s) => s.listLevel);
  const listZone = useMapStore((s) => s.listZone);
  const enterListCountries = useMapStore((s) => s.enterListCountries);
  const backToListZones = useMapStore((s) => s.backToListZones);

  // посилання на контейнер списку (для скролу)
  const listRef = useRef(null);

  // --- дані для MAP (країни вибраної зони)
  const {
    data: tzCountriesMap,
    isLoading: tzLoadingMap,
    error: tzErrorMap,
  } = useTimeZoneCountries(selectedZone);

  // --- дані для LIST: список зон
  const {
    data: zonesResp,
    isLoading: zonesLoading,
    error: zonesError,
  } = useQuery({
    enabled: mode === 'list' && listLevel === 'zones',
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(`/time-zones?populate=countries&locale=${locale}`);
      return res.data?.data ?? res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // --- дані для LIST: країни конкретної зони (коли провалилися всередину)
  const {
    data: tzCountriesList,
    isLoading: tzLoadingList,
    error: tzErrorList,
  } = useTimeZoneCountries(mode === 'list' && listLevel === 'countries' ? listZone : null);

  // нормалізатор коду країни
  const getCode = (c) =>
    (c?.CountryCode ?? c?.attributes?.CountryCode ?? c?.attributes?.code ?? c?.code ?? '')
      .toString()
      .toUpperCase();

  // елементи списку під картою (MAP)
  const mapItems = selectedCountry
    ? Array.isArray(tzCountriesMap)
      ? tzCountriesMap.filter((c) => getCode(c) === selectedCountry)
      : []
    : Array.isArray(tzCountriesMap)
      ? tzCountriesMap
      : [];

  // універсальна функція скролу до верху блока зі списком
  const scrollListTop = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        const top = listRef.current.getBoundingClientRect().top + window.scrollY - 45;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  };

  // клік по зоні/країні на КАРТІ
  const handleZoneClick = (zoneCode, countryCode) => {
    if (countryCode) {
      setMapSelection(zoneCode || null, countryCode);
    } else if (zoneCode) {
      setMapSelection(zoneCode, null);
    }
    setHasSelection(true);
    scrollListTop();
  };

  // клік по зоні у LIST — НЕ переходимо до карти, показуємо країни цієї зони на місці
  const handlePickZoneFromList = (zoneCode) => {
    enterListCountries(zoneCode);
    scrollListTop();
  };

  // повернення зі списку країн до списку зон у LIST
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
            onValueChange={(v) => v && setMode(v)}
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

        {/* Режим MAP: карта + під нею список країн вибраної зони */}
        {mode === 'map' && (
          <>
            <MapCanvas t={t} onZoneClick={handleZoneClick} />

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

        {/* Режим LIST: без карти; або список зон, або список країн обраної зони */}
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

/* --------------------- Карта (окремий підкомпонент) --------------------- */
function MapCanvas({ t, onZoneClick }) {
  const viewportRef = useRef(null);
  const svgRef = useRef(null);
  const worldRef = useRef(null);
  const zoomRef = useRef(null);

  const tfRef = useRef({ k: 1, x: 0, y: 0 });
  const baseKRef = useRef(1);
  const boxRef = useRef({ x: 0, y: 0, width: WORLD_W, height: WORLD_H });

  const [uiScale, setUiScale] = useState(100);
  const rafRef = useRef(null);
  const hoveringRef = useRef(false);

  // тултіп
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

  const getDeviceScale = () => {
    const svg = svgRef.current;
    if (!svg) return 1;
    const vpW = svg.clientWidth;
    const vpH = svg.clientHeight;
    return Math.min(vpW / VB_W, vpH / VB_H);
  };

  const snapToPixel = (t) => {
    const s = getDeviceScale();
    const snap = (v) => Math.round(v * s) / s;
    return { k: t.k, x: snap(t.x), y: snap(t.y) };
  };

  const clampTransform = (t) => {
    const box = boxRef.current;
    const kpx = t.k * BASE_S;
    const contentW = box.width * kpx;
    const contentH = box.height * kpx;

    const canPanX = contentW + EPS >= VB_W;
    const canPanY = contentH + EPS >= VB_H;

    const minX = VB_W - kpx * (box.x + box.width);
    const maxX = -kpx * box.x;
    const minY = VB_H - kpx * (box.y + box.height);
    const maxY = -kpx * box.y;

    let x = t.x;
    let y = t.y;

    if (canPanX) {
      x = Math.min(Math.max(x, minX), maxX);
    } else {
      const freeX = VB_W - contentW;
      x =
        ALIGN.x === 'left'
          ? -kpx * box.x
          : ALIGN.x === 'right'
            ? -kpx * box.x + freeX
            : -kpx * box.x + Math.round(freeX / 2);
    }

    if (canPanY) {
      y = Math.min(Math.max(y, minY), maxY);
    } else {
      const freeY = VB_H - contentH;
      y =
        ALIGN.y === 'top'
          ? -kpx * box.y
          : ALIGN.y === 'bottom'
            ? -kpx * box.y + freeY
            : -kpx * box.y + Math.round(freeY / 2);
    }

    return { k: t.k, x, y };
  };

  const applyToDOM = (t) => {
    if (!worldRef.current) return;
    worldRef.current.setAttribute('transform', `translate(${t.x},${t.y}) scale(${t.k * BASE_S})`);
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
    const box = boxRef.current;

    const baseK = Math.min(VB_W / box.width, VB_H / box.height);
    baseKRef.current = baseK;
    zoomRef.current?.scaleExtent([baseK, MAX_K]);

    const bounded = clampTransform({ k: baseK, x: 0, y: 0 });
    const snapped = snapToPixel(bounded);
    const zt = d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k);

    if (animate) {
      svg.transition().duration(150).call(zoomRef.current.transform, zt);
    } else {
      svg.call(zoomRef.current.transform, zt);
    }
  };

  const zoomBy = (factor) => {
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
      d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k),
    );
  };

  // init zoom/pan
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const world = d3.select(worldRef.current);
    svg.style('overflow', 'hidden');

    const zoom = d3
      .zoom()
      .filter((e) => (e.type === 'wheel' ? e.ctrlKey || e.metaKey : true))
      .wheelDelta((e) => -e.deltaY * WHEEL_SENS)
      .on('zoom', (event) => {
        const raw = { k: event.transform.k, x: event.transform.x, y: event.transform.y };
        const bounded = clampTransform(raw);
        const snapped = snapToPixel(bounded);

        svg.property('__zoom', d3.zoomIdentity.translate(snapped.x, snapped.y).scale(snapped.k));
        world.attr(
          'transform',
          `translate(${snapped.x},${snapped.y}) scale(${snapped.k * BASE_S})`,
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

    const onResize = () => fitToViewport(false);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', onResize);
      svg.on('.zoom', null);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // wheel/gesture/keyboard
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const onWheelCapture = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    el.addEventListener('wheel', onWheelCapture, { passive: false, capture: true });

    const stopGesture = (e) => e.preventDefault();
    el.addEventListener('gesturestart', stopGesture, { passive: false });
    el.addEventListener('gesturechange', stopGesture, { passive: false });
    el.addEventListener('gestureend', stopGesture, { passive: false });

    const onKeyDown = (e) => {
      if (!hoveringRef.current) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const isMinus = e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract';
      const isPlus =
        e.key === '+' || e.key === '=' /* Equal */ || e.code === 'Equal' || e.code === 'NumpadAdd';
      const isZero = e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0';
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

  // тултіп
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

  const handlePointerMove = (e) => {
    const vp = viewportRef.current;
    if (!vp) return;

    const closest = e.target?.closest?.('[data-tt]');
    const rect = vp.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (!closest) {
      if (tip.show) setTip((s) => ({ ...s, show: false }));
      return;
    }

    const ttRaw = closest.getAttribute('data-tt');
    const tt = ttRaw ? Number(ttRaw) : null;

    const label =
      closest.getAttribute('data-label') || closest.getAttribute('data-name') || closest.id || '';

    const time = closest.getAttribute('data-time') || '';
    const flagsStr = closest.getAttribute('data-flags') || '';
    const flags = flagsStr
      .split(',')
      .map((f) => f.trim().toLowerCase())
      .filter(Boolean);

    const country = (closest.getAttribute('data-country') || '').toLowerCase() || flags[0] || null;

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
    setTip((s) => ({ ...s, show: false }));
  };

  const zoomByPublic = (factor) => zoomBy(factor);
  const fitPublic = () => fitToViewport(true);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <button onClick={() => zoomByPublic(0.84)} aria-label={t('controls.zoom_out')}>
          -
        </button>
        <span>{uiScale}%</span>
        <button onClick={() => zoomByPublic(1.19)} aria-label={t('controls.zoom_in')}>
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
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width={VB_W} height={VB_H} fill="#484848" pointerEvents="all" />
          <g ref={worldRef}>
            <WorldContent onZoneClick={onZoneClick} />
          </g>
        </svg>

        {/* Абсолютний тултіп поверх SVG */}
        {tip.show && (
          <div
            ref={tooltipRef}
            className={styles.tooltip}
            style={{ left: tip.x, top: tip.y }}
            onMouseEnter={(e) => e.stopPropagation()}
          >
            {tip.tt === 1 && (
              <div>
                <div className={styles.topTool}>
                  <strong>{tip.label}</strong>
                  {tip.flags?.length > 0 && (
                    <div className={styles.flagsList}>
                      {tip.flags.slice(0, MAX_FLAGS_DISPLAY).map((code) => (
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
                  {tip.country && <CircleFlag countryCode={tip.country} height={16} />}
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

/* Обгортка для зони + бордери/лінії */
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
          {/* Всередині <Zones> кожна зона/країна викликає onZoneClick(zoneCode, countryCode) */}
          <Zones onZoneClick={onZoneClick} />
          <Borders />
          <TimeLines />
          <DayLine />
        </g>
      </g>
    </svg>
  );
}
