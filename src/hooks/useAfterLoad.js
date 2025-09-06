import { useEffect, useState } from 'react'

/**
 * ✅ Хук повертає true через 1 секунду після того,
 * як спрацює подія window.load (сторінка повністю завантажена)
 */
export function useAfterLoad(delay = 2000) {
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    let timer = null

    const trigger = () => {
      timer = setTimeout(() => {
        setPageLoaded(true)
      }, delay)
    }

    if (document.readyState === 'complete') {
      trigger()
    } else {
      window.addEventListener('load', trigger)
    }

    return () => {
      window.removeEventListener('load', trigger)
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  return pageLoaded
}
