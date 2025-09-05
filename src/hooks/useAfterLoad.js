import { useEffect, useState } from 'react'

/**
 * ✅ Хук повертає true після того,
 * як спрацює подія window.load (сторінка повністю завантажена)
 */
export function useAfterLoad() {
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    const onLoad = () => setPageLoaded(true)

    if (document.readyState === 'complete') {
      setPageLoaded(true)
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return pageLoaded
}
