/**
 * Originally created by Matias Niemelä, @matsko
 * He later deleted the Github repo that had this in it, so I re-created it.
 */

module.exports = require('angular')
  .module('angular-panel', [])
  .directive('ngPanel', ['$animate', ngPanel])
  .name

function ngPanel ($animate) {
  return {
    restrict: 'EA',
    transclude: 'element',
    terminal: true,
    compile: function (element, attrs) {
      var attrExp = attrs.ngPanel || attrs['for']
      var regex = /^(\S+)(?:\s+track by (.+?))?$/
      var match = regex.exec(attrExp)

      var watchCollection = true
      var trackExp = match[2]
      if (trackExp) {
        watchCollection = false
      } else {
        trackExp = match[1]
      }

      return function (scope, $element, attrs, ctrl, $transclude) {
        var previousElement, previousScope
        scope[watchCollection ? '$watchCollection' : '$watch'](trackExp, function (value) {
          if (previousElement) {
            $animate.leave(previousElement)
          }
          if (previousScope) {
            previousScope.$destroy()
            previousScope = null
          }
          previousScope = scope.$new()
          $transclude(previousScope, function (element) {
            previousElement = element
            $animate.enter(element, null, $element)
          })
        })
      }
    }
  }
}
