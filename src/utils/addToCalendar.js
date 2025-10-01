// utils/addToCalendar.js
export const addToCalendar = t => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('add_to_calendar');
  }

  const title = t('calendar_title');
  const description = `${t('calendar_desc')}\n\nhttps://time2fest.com`;

  // ✅ Подія: 31 грудня 2025, 10:00 UTC → 1 січня 2026, 12:00 UTC
  const start = '20251231T100000Z';
  const end = '20260101T120000Z';
  const url = 'https://time2fest.com';

  const isApple = /iPhone|iPad|iPod|Macintosh/.test(
    window.navigator.userAgent
  );

  if (isApple) {
    // --- iOS / macOS: створюємо .ics ---
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
DTSTART:${start}
DTEND:${end}
URL:${url}
BEGIN:VALARM
TRIGGER:-P4D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${title}
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'time2fest-reminder.ics';
    link.click();
  } else {
    // --- Інші (Android/Windows/Web): Google Calendar ---
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(url)}&sf=true&output=xml`;

    window.open(googleUrl, '_blank');
  }
};
