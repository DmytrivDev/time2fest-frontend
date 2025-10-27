import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';

import MapHintOverlay from './MapHintOverlay';
import WorldContent from './WorldContent';
import styles from './MapCanvas.module.scss';

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

export default function MapCanvas({ windowWidth, onZoneClick }) {
  const { t } = useTranslation('common');
  const viewportRef = useRef(null);
  const svgRef = useRef(null);
  const worldRef = useRef(null);
  const zoomRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, [windowWidth]);

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

  const tfRef = useRef({ k: 1, x: 0, y: 0 });
  const baseKRef = useRef(1);

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
      setIsMobile(true);
    };

    check();
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
    if (!svgRef.current || !worldRef.current || !zoomRef.current) return;

    const svg = d3.select(svgRef.current);
    const box = worldRef.current?.getBBox();
    if (!box) return;

    boxRef.current = box;

    const baseK = Math.max(VB_W / box.width, VB_H / box.height);
    baseKRef.current = baseK;
    zoomRef.current.scaleExtent([baseK, MAX_K]);

    let x, y;
    if (isMobile) {
      x = VB_W - baseK * (box.x + box.width);
      y = -baseK * box.y;
    } else {
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
          if (!worldRef.current) return;
          const box = worldRef.current.getBBox();
          boxRef.current = box;
          fitToViewport(false);
        }
      });
    };

    handleResize();
  }, [isMobile]);

  // після зміни worldSize повністю скидаємо transform
  useEffect(() => {
    if (!svgRef.current || !zoomRef.current || !worldRef.current) return;

    const svg = d3.select(svgRef.current);

    // чекаємо, поки DOM відміряє нові розміри
    requestAnimationFrame(() => {
      if (!worldRef.current) return;
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
