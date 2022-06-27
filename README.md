# reactive demo

Example of a minimal reactive page using Andrea Giammarchi's uHTML

See: [Andrea's library](https://github.com/WebReflection/uhtml).

## Demo

* Host the `index.html` page somewhere, then view it and open the dev tools.
* Noting the rapidly changing slider, click through Elements in the inspector to verify that DOM updates are indeed only happening for that element (ie, the whole innerHTML is not resetting).
* In a console, type `S.print()` to see the current state.
* Modify the GUI by changing form elements. Check that the `S.print()` has updated reactively.
* Now modify the state in the console and verify that the GUI updates reactively. Eg: `S.line = 'hello'`

The rapidly moving slider demonstrates how, even when updating at the maximum framerate, the GUI should not suffer a noticeable drop in performance due to the use of [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

## How uHTML works

In JavaScript, [template literal strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) can be handled by [custom rendering functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). Each function takes two arrays as input that we'll call `statics` and `dynamics`. The size of the statics array is always dynamics + 1.

```javascript
function custom_handler(statics=[''], dynamics=[]) {
  //do stuff
  return '';
}
```

Statics refers to the parts of a string that do not change (hard-coded text). Dynamics are those that are computed by string interpolation using `${...}` syntax.

Andrea figured out that the `statics`, in V8, do not get readdressed between subsequent custom parser calls. Therefore, if what is being parsed is an HTML string, the static parts of the template literal string will point to a static segment of the DOM. When building a reactive page, these are therefore the parts of the page that do not need to be modified.

This eliminates the need for complex DOM diffing. Only the parts of the HTML string, covered by the `dynamics` array need to be recomputed. The trick then becomes to checkpoint nodes of the DOM around the dynamics components, which Andrea's library does by injecting an HTML comment node containing a GUID; a process referred to as `keying`.

Non-keying can also be achieved using [DOM ranges](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html), but it is more complicated and error prone.

There are many libs that exploit this mechanism for powering reactivity (such as [lit-html](https://lit.dev/)) but Andrea deserved kudos for being the first to figure it out and publish the first package to exploit it: [hyperHTML](https://github.com/WebReflection/hyperHTML). His uHTML library is a stripped down evolution of hyperHTML.
