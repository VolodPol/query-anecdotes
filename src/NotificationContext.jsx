import { createContext, useReducer } from 'react'
import notificationReducer from './reducers/notificationReducer.js'

const NotificationContext = createContext(null)

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, '')

  return <NotificationContext.Provider value={{ notification, dispatchNotification }}>
    { children }
  </NotificationContext.Provider>
}

export default NotificationContext