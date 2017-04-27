eslint-plugin-reselect [![Build Status](https://travis-ci.org/popul/eslint-plugin-reselect.svg?branch=master)](https://travis-ci.org/popul/eslint-plugin-reselect) [![Dependency Status](https://david-dm.org/popul/eslint-plugin-reselect.svg)](https://david-dm.org/popul/eslint-plugin-reselect) [![devDependency Status](https://david-dm.org/popul/eslint-plugin-reselect/dev-status.svg)](https://david-dm.org/popul/eslint-plugin-reselect#info=devDependencies)
========================

Enforce best practices in selectors written with [Reselect](https://github.com/reactjs/reselect)

# Installation

```sh
$ npm i eslint-plugin-reselect
```

# Configuration

Add `plugins` section and specify eslint-plugin-reselect as a plugin.

Add rules below in rules section.

```json
{
  "plugins": [
    "reselect"
  ],
  "rules": {
    "reselect/first-param-name": "error",
    "reselect/maximum-arity": "error",
    "reselect/second-param-destructured": "error",
    "reselect/call": "error",
    "reselect/prefer-create-selector": "warn"
  }
}
```

# List of supported rules

* reselect/first-param-name: First param must be named `state`. Name can be configured. Here is an example with `fullState`: 
```js
"rules": {
	...
    "reselect/first-param-name": ["error", "fullState"],
    ...
```
* reselect/maximum-arity: Maximum arity of 2. Arity can be modified like this :
```js
"rules": {
	...
    "reselect/maximum-arity": ["error", 3],
    ...
```
* reselect/second-param-destructured: Second argument must be a destructuring object. 
* reselect/call: When calling a selector function, second argument must be an object declaration. Selector call is identified like this:
  * Called function  begins with `get`
  * Function called with 2 parameters
  * First parameter must be `state`
* reselect/prefer-create-selector: Instead of use selector in selector, prefer use of createSelector function. 

All rules except `reselect/call` are triggered when :
 * `reselect` is imported
 * function name begins with `get`
 * function at root level (exported or not)
 * functions in createSelector calls (not the latest)

If you don't use [Reselect](https://github.com/reactjs/reselect) in your selector file, you can just import [Reselect](https://github.com/reactjs/reselect) like this to enable rules

```js 
import 'reselect';
```

## All

This plugin also exports an `all` configuration that includes every available rule.

```js
{
  "plugins": [
    "reselect"
  ],
  "extends": ["plugin:reselect/all"]
}
```

## Recommended

This plugin exports a `recommended` configuration that enforce React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "extends": ["plugin:reselect/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

* reselect/first-param-name
* reselect/maximum-arity
* reselect/prefer-create-selector

# License

eslint-plugin-reselect is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
