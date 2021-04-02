import { EventList } from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';

export default function Home({ featuredEvents }) {
  return <EventList items={featuredEvents} />;
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
