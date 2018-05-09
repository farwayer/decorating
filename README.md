```js
import {propertyDecorator, classDecorator} from 'decorating'

const alwaysZero = propertyDecorator((target, property, desc) => {
  return {get: () => 0, set: () => {}};
});

const always = propertyDecorator((target, property, desc, value) => {
  return {get: () => value, set: () => {}};
});

const alwaysTwo = always(1);

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

@banana() class TestClass {}
@whaaat class TestClass2 {}
@whaaat() class TestClass3 {}
@whaaat('BANANA!') class TestClass4 {}
```
