import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-util';
import { EventList } from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { Button } from '../../components/ui/Button';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
export default function FilteredEventsPage({ hasError, events, dateProps }) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;
  const { data, error } = useSWR(
    'https://react-hook-prueba.firebaseio.com/events.json'
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);
  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter. Adjust Your Values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events Founds</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }
  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const filterData = params.slug;
//   const filteredYear = +filterData[0];
//   const filteredMonth = +filterData[1];
//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       dateProps: { year: filteredYear, month: filteredMonth },
//     },
//   };
// }
