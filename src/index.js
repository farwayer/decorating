import * as is from './is'


export const propertyDecorator = wrappedDecorate(isPropertyDecorator)
export const classDecorator = wrappedDecorate(isClassDecorator)

export function isPropertyDecorator(args) {
  return (
    args.length === 3 &&
    is.obj(args[0]) &&
    is.str(args[1]) &&
    (is.obj(args[2]) || !is.def(args[2])) // undefined in TS
  )
}

export function isClassDecorator(args) {
  return (
    args.length === 1 &&
    is.fn(args[0])
  )
}


function wrappedDecorate(isWithNoArgs) {
  return decorator => {
    return function () {
      const args = arguments

      if (isWithNoArgs(args)) {
        return decorator.apply(undefined, args)
      }

      return function () {
        const extraArgs = Array.prototype.slice.call(args)
        const allArgs = [].concat(...arguments, extraArgs)
        return decorator.apply(undefined, allArgs)
      }
    }
  }
}
