# observable-value
## Object representation of mutable value

### Usage

```javascript
var ObservableValue = require('observable-value');

var observable = new ObservableValue('foo');
```

Current value is accessible at `value` property:

```javascript
observable.value; // 'foo'
```

`change` events are emitted on any change

```javascript
var emitted;
observable.on('change', function (event) { emitted = event; });
obj.value = 'bar';
console.log(emitted); // { newValue: 'bar', oldValue: 'foo' };
```

### Installation

	$ npm install observable-value

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)


### Additional utilities

#### isObservableValue _(observable-value/is-observable-value)_

Whether object shares _ObservableValue_ interface

```javascript
var isObservableValue = require('observable-value/is-observable-value');

console.log(isObservableValue({})); // false
console.log(isObservableValue(new ObservableValue())); // true
```

#### eq

Create observable value out of two different values that may share _ObservableValue_ but don't have to.
If both values do not represent _ObservableValue_, plain boolean value is returned

```javascript
var eq = require('observable-value/eq');

console.log(isObservableValue(eq('foo', 'bar'))); // false
console.log(eq('foo', 'bar')); // false
console.log(eq('foo', 'foo')); // true

var m1 = new ObservableValue();

var em = eq(m1, 'foo');
console.log(isObservableValue(em)); // true
console.log(em.value); // false
em.on('change', function (value) { emitted = value; });
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

var m2 = new ObservableValue();
m2.value = 'other';
em = eq(m1, m2);
console.log(em.value); // true
m2.value = 'foo';
console.log(em.value); // false
m1.value = 'foo';
console.log(em.value); // true
```

## Tests [![Build Status](https://travis-ci.org/medikoo/observable-value.png)](https://travis-ci.org/medikoo/observable-value)

	$ npm test
