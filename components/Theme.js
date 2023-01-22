import { MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

const ControlThemeButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // console.log(resolvedTheme);
  // useEffect(() => {
  //   !theme.length && setTheme('dark');
  // }, []);

  const handleMode = () => {
    console.log('first');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button
        className="text-white"
        onClick={() => {
          handleMode();
        }}
      >
        <span>
          Dark Mode
          {/* <MoonIcon /> */}
        </span>
      </button>
    </>
  );
};

export default ControlThemeButton;
