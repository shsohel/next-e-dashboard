import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/view/Home';

const Home = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log(theme);
    setTheme('light');
  }, []);

  return (
    <>
      <Layout title="Home">
        <Dashboard />
      </Layout>
    </>
  );
};

export default Home;
