;;;;;;;;;;;;;;;!!!!!!!!(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], function (b) {
      factory(b)
    })
  } else if (typeof module === 'object' && module.exports) {
    factory(require('react'));
  } else {
    factory(window.React);
  }
}(function (React) {

  var calls = []
  var rollbacks = []
  var setState = React.Component.prototype.setState
  var rollingBack = false
  var rollingForward = false

  React.Component.prototype.setState = function(nextState) {
    console.group(this.constructor.name)
    if (rollingBack) {
      console.log('rollback')
      console.log('props', this.props)
      console.log('rollback state', nextState)
    } else if (rollingForward) {
      console.log('rollForward')
      console.log('props', this.props)
      console.log('rollback state', nextState)
    } else {
      calls.push({
        instance: this,
        nextState: nextState,
        prevState: this.state
      })
      console.trace()
      console.log('props', this.props)
      console.log('state', this.state)
      console.log('nextState', typeof nextState === 'function' ? (
        nextState(this.state)
      ) : nextState)
    }
    console.groupEnd(this.constructor.name)
    return setState.apply(this, arguments)
  }

  var back = function() {
    var call = calls.pop()
    rollbacks.push(call)
    rollingBack = true
    try {
      call.instance.setState(call.prevState, function() {
        rollingBack = false
      })
    } catch(e) {
      console.log('Could not roll back, sorry.')
      rollingBack = false
    }
  }

  var forward = function() {
    var call = rollbacks.pop()
    calls.push(call)
    rollingForward = true
    try {
      call.instance.setState(call.nextState, function() {
        rollingForward = false
      })
    } catch(e) {
      console.log('Could not roll forward, sorry.')
      rollingForward = false
    }
  }

  window.Lumberjack = { back: back, forward: forward }

}));;;;;;;;;;;;;;;;;


