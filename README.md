# Mutable

Mutable value interface

Create mutable value wrapper, or extend existing object into one.

To be used by mutable interfaces, so they produce objects that share same
characteristics.

Wrapper object keeps value at `value` property, and emits `change` events when
value is changed.

```javascript
var Mutable = require('mutable');
var obj = new Mutable();
var emitted;

obj.value = 'foo';
obj.on('change', function (value) {
  emitted = value;
});
obj.value = 'bar';
console.log(emitted); // 'bar';
```

### Additional utilities

#### is

Whether object is a mutable instance.

```javascript
var isMutable = require('mutable/is');

console.log(isMutable({})); // false
console.log(isMutable(new Mutable())); // true
```

#### eq

Create mutable out of two different values that may be mutable.
If values are not mutable, boolean value is returned

```javascript
var eq = require('mutable/eq');

console.log(isMutable(eq('foo', 'bar'))); // false
console.log(eq('foo', 'bar')); // false
console.log(eq('foo', 'foo')); // true

var m1 = new Mutable();

var em = eq(m1, 'foo');
console.log(isMutable(em)); // true
console.log(em.value); // false
em.on('change', function (value) {
  emitted = value;
});
m1.value = 'foo';
console.log(emitted); // true
console.log(em.value); // true
m1.value = 'bar';
console.log(emitted); // false
console.log(em.value); // false

emitted = null;
m1.value = 'other';
console.log(emitted); // null
console.log(em.value); // false

var m2 = new Mutable();
m2.value = 'other';
em = eq(m1, m2);
console.log(em.value); // true
m2.value = 'foo';
console.log(em.value); // false
m1.value = 'foo';
console.log(em.value); // true
```

## Installation
### NPM

In your project path:

	$ npm install mutable

### Browser

You can easily bundle Mutable for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://travis-ci.org/medikoo/mutable.png)](https://travis-ci.org/medikoo/microtime-x)

	$ npm test
