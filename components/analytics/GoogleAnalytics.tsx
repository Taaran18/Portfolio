import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-ZWPEP9X6EP'

// Google Analytics 4. Loaded when the browser is idle so it never competes with first paint,
// and only in production so local development doesn't send hits.
// Page changes between routes are counted by GA's enhanced measurement (browser history events).
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production' || !GA_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
