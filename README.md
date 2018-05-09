# Decorating

_Helpers for decorating classes and properties_

[![Build Status](https://img.shields.io/travis/farwayer/decorating.svg)](https://travis-ci.org/farwayer/decorating)
[![Coverage Status](https://img.shields.io/coveralls/farwayer/decorating.svg)](https://coveralls.io/github/farwayer/decorating?branch=master)

```js
import {propertyDecorator, classDecorator} from 'decorating'

const alwaysZero = propertyDecorator((target, property, desc) => {
  return {get: () => 0, set: () => {}};
});

const always = propertyDecorator((target, property, desc, value) => {
  return {get: () => value, set: () => {}};
});

const alwaysTwo = always(2);

class TestProps {
  @alwaysZero a;
  @alwaysZero() b;
  @always(1) c;
  @alwaysTwo d;
}

const banana = classDecorator(Class => {
  Class.whaaat = 'BANANA!';
});

const whaaat = classDecorator((Class, value='DEFAULT') => {
  Class.whaaat = value;
});

@banana class TestClass {}
@banana() class TestClass2 {}
@whaaat class TestClass3 {}
@whaaat() class TestClass4 {}
@whaaat('BANANA!') class TestClass5 {}
```
