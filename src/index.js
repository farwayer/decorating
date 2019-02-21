import is from './is'


export const propertyDecorator = wrappedDecorate(isPropertyDecorator);
export const classDecorator = wrappedDecorate(isClassDecorator);

export function isPropertyDecorator(args) {
  return (
    args.length === 3 &&
    is.object(args[0]) &&
    is.string(args[1]) &&
    is.object(args[2])
  )
}

export function isClassDecorator(args) {
  return (
    args.length === 1 &&
    is.function(args[0])
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
