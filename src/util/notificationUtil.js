import { ActionType } from '../reducers/notificationReducer.js'

export const updateNotification = (content, dispatchNotification) => {
  dispatchNotification({ type: ActionType.SET, payload: content})
  setTimeout(() => dispatchNotification({ type: ActionType.CLEAR }), 5_000)
}