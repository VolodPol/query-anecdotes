export const ActionType = Object.freeze({
  SET: 'set',
  CLEAR: 'clear'
})

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET: return action.payload
    case ActionType.CLEAR: return ''

    default: return state
  }
}

export default notificationReducer