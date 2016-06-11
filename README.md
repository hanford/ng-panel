## ng-panel

ng-panel is an angular directive, that watches a binded value and re-compiles the child template when the binded value changes. This is especially handy when wrapping jquery plugins. Once the binded value changes, a new scope is created and the child elements are replaced with the new values.

### Usage
```html
<div ng-panel="blockImg">
  <div class="jq-iviewer" jquery-iviewer="{ src: blockImg }"></div>
</div>
```
