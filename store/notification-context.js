import { createContext } from 'react';

export const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }) {
  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
}
