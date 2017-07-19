// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/maximum-arity');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('maximum-arity', rule, {
  valid: []
    .concat([
      {
        code:
`import { createSelector } from 'reselect';
const getView = (state) => state;`,
        parserOptions,
      },
      {
        code:
'const getView = (one, two, three) => one;',
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
const getView = (state, one, two) => state;`,
        parserOptions,
        options: [3],
      },
    ]),
  invalid: []
    .concat([
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = function(state, id, foo) { return true; }`,
        errors: [{
          message: 'Maximum arity in selector must be 2',
          line: 2,
          column: 16,
          type: 'FunctionExpression',
        }],
        parserOptions,
      },
      {
        code:
`import 'reselect';
export default (state, foo, bar) => state;`,
        errors: [{
          message: 'Maximum arity in selector must be 2',
          line: 2,
          column: 16,
          type: 'ArrowFunctionExpression',
        }],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const selectFoo = function(state, id, foo) { return true; }`,
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        errors: [{
          message: 'Maximum arity in selector must be 2',
          line: 2,
          column: 19,
          type: 'FunctionExpression',
        }],
        parserOptions,
      },
    ]),
});
