function isType(type) {
  return val => typeof val === type;
}

export default {
  object: isType('object'),
  string: isType('string'),
  function: isType('function'),
}
