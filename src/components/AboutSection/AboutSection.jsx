import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getValidLocale } from '@/utils/getValidLocale'
import { api } from '@/utils/api'
import clsx from 'clsx'

import styles from './AboutSection.module.scss'

export default function AboutPortalSection() {
  const [pageLoaded, setPageLoaded] = useState(false)
  const locale = getValidLocale()

  useEffect(() => {
    const onLoad = () => setPageLoaded(true)
    if (document.readyState === 'complete') {
      setPageLoaded(true)
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['about', locale],
    queryFn: async () => {
      const res = await api.get(`/about?locale=${locale}`)
      return res.data
    },
    staleTime: 5 * 60 * 1000,
    enabled: pageLoaded, // 🚀 запит піде тільки після load
  })

  if (!pageLoaded) return null

  if (isLoading) {
    return (
      <section className={styles.section}>
        <picture>
          <source srcSet="/about/bg.avif" type="image/avif" />
          <source srcSet="/about/bg.webp" type="image/webp" />
          <img
            src="/about/bg.jpg"
            srcSet="/about/bg-480.jpg 480w,
                    /about/bg-768.jpg 768w,
                    /about/bg-1280.jpg 1280w,
                    /about/bg-1920.jpg 1920w"
            sizes="100vw"
            className={styles.bgImage}
            alt=""
            loading="eager"
            decoding="async"
          />
        </picture>
        <div className="container">
          <div className={clsx(styles.loadingTitle, 'loading')}></div>
          <ul className={styles.list}>
            {Array.from({ length: 6 }).map((_, index) => (
              <li className={clsx(styles.loadingItem, 'loading')} key={index}></li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (error) {
    console.error(error)
  }
  if (!data) return null

  return (
    <section id="about" className={styles.section}>
      <picture>
        <source srcSet="/about/bg.avif" type="image/avif" />
        <source srcSet="/about/bg.webp" type="image/webp" />
        <img
          src="/about/bg.jpg"
          srcSet="/about/bg-480.jpg 480w,
                  /about/bg-768.jpg 768w,
                  /about/bg-1280.jpg 1280w,
                  /about/bg-1920.jpg 1920w"
          sizes="100vw"
          className={styles.bgImage}
          alt=""
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="container">
        <h2>{data.Title}</h2>
        <ul className={styles.list}>
          {data.items.map(item => (
            <li key={item.id}>
              <div className={styles.topItem}>
                {item.Icon?.url && (
                  <span>
                    <img
                      src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon.url}`}
                      alt={item.Icon.alternativeText || item.Icon.name}
                    />
                  </span>
                )}
                <h3>{item.Title}</h3>
              </div>
              {item.Description && (
                <p className={styles.text}>{item.Description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
