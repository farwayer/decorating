import {
  isPropertyDecorator, isClassDecorator,
  classDecorator, propertyDecorator,
} from '../../src'


describe('isPropertyDecorator', () => {
  it('should be true for non function', done => {
    function decorator(target, property) {
      isPropertyDecorator(arguments).should.be.true();
      done();
    }

    class User {
      @decorator value;
    }
  });

  it('should be false for function', done => {
    function decorator() {
      isPropertyDecorator(arguments).should.be.false();
      done();
      return (target, property) => {}
    }

    class User {
      @decorator() value;
    }
  });
});

describe('isClassDecorator', () => {
  it('should be true for non function', done => {
    function decorator(Class) {
      isClassDecorator(arguments).should.be.true();
      done();
    }

    @decorator
    class User {}
  });

  it('should be false for function', done => {
    function decorator() {
      isClassDecorator(arguments).should.be.false();
      done();
      return Class => {}
    }

    @decorator()
    class User {}
  });
});

describe('propertyDecorator', () => {
  it('should works as non function', () => {
    const alwaysZero = propertyDecorator(() => {
      return {get: () => 0, set: () => {}};
    });

    class User {
      @alwaysZero loginCount;
    }

    const user = new User();
    user.loginCount.should.be.equal(0);
    user.loginCount = 1;
    user.loginCount.should.be.equal(0);
  });

  it('should works as function with no params', () => {
    const alwaysZero = propertyDecorator(() => {
      return {get: () => 0, set: () => {}};
    });

    class User {
      @alwaysZero() loginCount;
    }

    const user = new User();
    user.loginCount.should.be.equal(0);
    user.loginCount = 1;
    user.loginCount.should.be.equal(0);
  });

  it('should works as function with params', () => {
    const always = propertyDecorator((target, property, desc, value) => {
      return {get: () => value, set: () => {}};
    });

    class User {
      @always(1) loginCount;
    }

    const user = new User();
    user.loginCount.should.be.equal(1);
    user.loginCount = 0;
    user.loginCount.should.be.equal(1);
  });
});

describe('classDecorator', () => {
  it('should works as non function', () => {
    const banana = classDecorator(Class => {
      Class.whaaat = 'BANANA!';
    });

    @banana
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!');
  });

  it('should works as function with no params', () => {
    const banana = classDecorator(Class => {
      Class.whaaat = 'BANANA!';
    });

    @banana()
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!');
  });

  it('should works as function with params', () => {
    const whaaat = classDecorator((Class, value) => {
      Class.whaaat = value;
    });

    @whaaat('BANANA!')
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!');
  });
});
