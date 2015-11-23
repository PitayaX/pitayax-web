export const isFunction = val => {
  return typeof val === 'function'
}

export const createChainedFunction = (...funcs) => {
  return funcs.filter((f) => {
    return f != null
  }).reduce((acc, f) => {
    if (acc === null) {
      return f
    }

    return (...args) => {
      acc.apply(null, args)
      f.apply(null, args)
    }
  }, null)
}

export const noop = () => {}
