// Provider Script and Google
import Script from 'next/script';
import React from 'react';

const ProviderScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4471GEE5EK"
      ></Script>

      <Script id="google-analytics" strategy="afterInteractive">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4471GEE5EK');
        gtag('send', 'pageview');
        `}
      </Script>
    </>
  );
};

export default ProviderScript;
