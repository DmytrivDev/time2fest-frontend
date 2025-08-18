import { useEffect, useState } from 'react';

const MS_IN_SEC = 1000;
const MS_IN_MIN = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MIN;
const MS_IN_DAY = 24 * MS_IN_HOUR;

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdownToTimezone(offsetHours = 14, tickMs = 1000) {
  const [timeLeft, setTimeLeft] = useState(ZERO);

  useEffect(() => {
    const offset = offsetHours * MS_IN_HOUR;

    function getTargetMs(now = new Date()) {
      const localTarget = new Date(now.getTime() + offset);
      let year = localTarget.getUTCFullYear();

      // 1 січня 00:00 в цільовому поясі => назад у UTC
      let target = Date.UTC(year, 0, 1, 0, 0, 0) - offset;

      if (now.getTime() >= target) {
        year += 1;
        target = Date.UTC(year, 0, 1, 0, 0, 0) - offset;
      }

      return target;
    }

    const targetMs = getTargetMs();

    const calc = () => {
      const now = Date.now();
      const diff = targetMs - now;

      if (diff <= 0) {
        setTimeLeft(ZERO);
        return false;
      }

      const days = Math.floor(diff / MS_IN_DAY);
      const hours = Math.floor((diff % MS_IN_DAY) / MS_IN_HOUR);
      const minutes = Math.floor((diff % MS_IN_HOUR) / MS_IN_MIN);
      const seconds = Math.floor((diff % MS_IN_MIN) / MS_IN_SEC);

      setTimeLeft({ days, hours, minutes, seconds });
      return true;
    };

    let go = calc();
    const id = globalThis.setInterval(() => {
      go = calc();
      if (!go) globalThis.clearInterval(id);
    }, tickMs);

    return () => globalThis.clearInterval(id);
  }, [offsetHours, tickMs]);

  return timeLeft;
}
