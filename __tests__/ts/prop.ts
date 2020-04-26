import 'should'
import {isPropertyDecorator, propertyDecorator} from '../..'


describe('isPropertyDecorator', () => {
  it('should be true for non function', () => {
    function decorator(target, property) {
      isPropertyDecorator(arguments).should.be.true()
    }

    class User {
      @decorator value
    }
  })

  it('should be false for function', () => {
    function decorator() {
      isPropertyDecorator(arguments).should.be.false()
      return (target, property) => {}
    }

    class User {
      @decorator() value
    }
  })
})

describe('propertyDecorator', () => {
  it('should works as non function', () => {
    const alwaysZero = propertyDecorator(() => {
      return {get: () => 0, set: () => {}}
    })

    class User {
      @alwaysZero loginCount
    }

    const user = new User()
    user.loginCount.should.be.equal(0)
    user.loginCount = 1
    user.loginCount.should.be.equal(0)
  })

  it('should works as function with no params', () => {
    const alwaysZero = propertyDecorator(() => {
      return {get: () => 0, set: () => {}}
    })

    class User {
      @alwaysZero() loginCount
    }

    const user = new User()
    user.loginCount.should.be.equal(0)
    user.loginCount = 1
    user.loginCount.should.be.equal(0)
  })

  it('should works as function with params', () => {
    const always = propertyDecorator((target, property, desc, value) => {
      return {get: () => value, set: () => {}}
    })

    class User {
      @always(1) loginCount
    }

    const user = new User()
    user.loginCount.should.be.equal(1)
    user.loginCount = 0
    user.loginCount.should.be.equal(1)
  })
})
