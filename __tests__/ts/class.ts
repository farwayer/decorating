import 'should'
import {isClassDecorator, classDecorator} from '../..'


describe('isClassDecorator', () => {
  it('should be true for non function', () => {
    function decorator(Class) {
      isClassDecorator(arguments).should.be.true()
    }

    @decorator
    class User {}
  })

  it('should be false for function', () => {
    function decorator() {
      isClassDecorator(arguments).should.be.false()
      return Class => {}
    }

    @decorator()
    class User {}
  })
})

describe('classDecorator', () => {
  it('should works as non function', () => {
    const banana = classDecorator(Class => {
      Class.whaaat = 'BANANA!'
    })

    @banana
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!')
  })

  it('should works as function with no params', () => {
    const banana = classDecorator(Class => {
      Class.whaaat = 'BANANA!'
    })

    @banana()
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!')
  })

  it('should works as function with params', () => {
    const whaaat = classDecorator((Class, value) => {
      Class.whaaat = value
    })

    @whaaat('BANANA!')
    class User {}

    User.should.have.property('whaaat').which.is.equal('BANANA!')
  })
})
