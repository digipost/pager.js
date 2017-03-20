# Pager.js

Pager.js runs JavaScript functions based on the current path name. This is useful if you have a traditional website
and you want to run specific JS on each page, but still include all JS files on all pages.

While this is a quite narrow use case, I've found it useful on a number of projects which need a little JS applied to certain pages. Paths are matched by the following rules:

* Leading and trailing slashes are removed.
* Any file extension (like .html) is removed.
* Handler must match the entire path name to run.
* If there's no path, any handler named "index" gets called.

## Example

```javascript
// Add a default handler for the index page:
pager.on('index', function() {
    console.log('Hello from index!');
});

// Add a handler for the 'foo' path
pager.on('foo', function() {
    console.log('Hello from foo!');
});

// Add a handler for for the 'foo/bar' path
pager.on('foo/bar', function() {
    console.log('Hello from bar!');
});

// Run page handler on page load (or at any other time):
$(function() { pager.run(); });

// When the user navigates to a page, a handler is run.
window.location = '/'; // => "Hello from index!"
window.location = '/foo'; // => "Hello from foo!"
window.location = '/foo/bar'; // => "Hello from bar!"

// Get the current page name:
pager.get(); // => 'foo/bar'

// Remove one handler:
pager.off('foo/bar');

// Remove all handlers:
pager.off();
```
