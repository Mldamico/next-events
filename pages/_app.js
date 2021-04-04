import '../styles/globals.css';
import { Layout } from '../components/layout/Layout';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/notification-context';
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta
            name='description'
            content='Find a lot of great events that alow you to evolve...'
          />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
        <Notification title='Test' message='This is a test' status='pending' />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
