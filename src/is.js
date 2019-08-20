function isType(type) {
  return val => typeof val === type;
}

export const fn = isType('function')
export const str = isType('string')
export const obj = isType('object')
export const def = val => val !== undefined
