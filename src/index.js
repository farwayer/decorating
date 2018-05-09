import {isFunction, isObject, isString} from './is'


export const propertyDecorator = wrappedDecorate(isPropertyDecorator);
export const classDecorator = wrappedDecorate(isClassDecorator);

export function isPropertyDecorator(args) {
  return (
    args.length === 3 &&
    isObject(args[0]) &&
    isString(args[1]) &&
    isObject(args[2])
  )
}

export function isClassDecorator(args) {
  return (
    args.length === 1 &&
    isFunction(args[0])
  )
}


function wrappedDecorate(isWithNoArgs) {
  return decorator => {
    return function () {
      const withArgs = !isWithNoArgs(arguments);

      return decorate(withArgs, arguments, (...decArgs) => {
        const extraArgs = withArgs ? arguments : [];
        return decorator(...decArgs, ...extraArgs);
      });
    };
  }
}

function decorate(withArgs, args, decorator) {
  return withArgs ? decorator : decorator(...args);
}
