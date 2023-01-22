import { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
export default function App({ Component, pageProps }) {
  return (
    // <div className=" bg-white from-gradient-two to-gradient-one text-secondary dark:bg-gradient-to-r dark:text-white ">
    <ThemeProvider enableSystem={false} attribute="class">
      <div className=" bg-white from-gradient-two to-gradient-one text-secondary dark:bg-gradient-to-r dark:text-white ">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
