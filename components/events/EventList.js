import { EventItem } from './EventItem';
import classes from './EventList.module.css';
export const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};
