import { EventList } from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';
export default function Home({ featuredEvents }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that alow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
