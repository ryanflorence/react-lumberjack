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
  var setState = React.Component.prototype.setState
  React.Component.prototype.setState = function(nextState) {
    console.group(this.constructor.name)
    console.trace()
    if (this.shouldComponentUpdate) {
      console.log('shouldComponentUpdate', (
        this.shouldComponentUpdate(this.props, nextState)
      ))
    }
    console.log('props', this.props)
    console.log('state', this.state)
    console.log('nextState', typeof nextState === 'function' ? (
      nextState(this.state)
    ) : nextState)
    console.groupEnd(this.constructor.name)
    return setState.apply(this, arguments)
  }
}));;;;;;;;;;;;;;;;;
