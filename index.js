import {isStr, isFn, isObj, isDef} from 'istp'


export const propertyDecorator = wrappedDecorate(isPropertyDecorator)
export const classDecorator = wrappedDecorate(isClassDecorator)

export function isPropertyDecorator(args) {
  return (
    args.length === 3 && // 2 in TS for target ES3 but we do not support it
    isObj(args[0]) &&
    isStr(args[1]) &&
    (isObj(args[2]) || !isDef(args[2])) // undefined in TS for target >= ES5
  )
}

export function isClassDecorator(args) {
  return (
    args.length === 1 &&
    isFn(args[0])
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
