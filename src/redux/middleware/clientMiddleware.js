export default function clientMiddleware (client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const { promise, types, ...rest } = action
      if (!promise) {
        return next(action)
      }

      const [ REQUEST, SUCCESS, FAILURE ] = types
      next({ ...rest, type: REQUEST })
      return promise(client).then(
        (result) =>setTimeout(() => { next({ ...rest, result, type: SUCCESS })},60000),
        (error) => next({ ...rest, error, type: FAILURE })
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: FAILURE })
      })
    }
  }
}
