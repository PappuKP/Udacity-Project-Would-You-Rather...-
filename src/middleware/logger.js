
const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('The action: ', action)
  next(action)
  console.log('The new state is: ', store.getState())
  console.groupEnd()
}

export default logger
