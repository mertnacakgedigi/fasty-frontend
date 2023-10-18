import { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // Insert Google Analytics or any other client-side scripts here
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-59FZX1ECBV';
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-59FZX1ECBV');
      `;
      document.head.appendChild(script2);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
