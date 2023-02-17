import { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return (
    // <div className=" bg-white from-gradient-two to-gradient-one text-secondary dark:bg-gradient-to-r dark:text-white ">
    <Provider store={store}>
      <ThemeProvider enableSystem={false} attribute="class">
        <div className=" bg-white from-gradient-two to-gradient-one text-secondary dark:bg-gradient-to-r dark:text-white ">
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
