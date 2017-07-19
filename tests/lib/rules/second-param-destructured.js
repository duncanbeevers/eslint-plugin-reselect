// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/second-param-destructured')
var RuleTester = require('eslint').RuleTester

var parserOptions = {
  ecmaVersion: 6,
  sourceType: "module",
  ecmaFeatures: {
    experimentalObjectRestSpread: true
  }
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('second-param-destructured', rule, {
  valid: []
    .concat([
      {
        code:
`import { createSelector } from 'reselect';
const getView = (state, { id }) => state;`,
        parserOptions: parserOptions
      },
      {
        code:
`const getView = (one, two, three) => one;`,
        parserOptions: parserOptions
      },
    ]),
  invalid: []
    .concat([
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = function(state, id) { return true; }`,
        errors: [{
          message: 'Second argument must be destructured',
          line: 2,
          column: 32,
          type: 'Identifier'
        }],
        parserOptions: parserOptions
      },
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = (state, id) => true`,
        errors: [{
          message: 'Second argument must be destructured',
          line: 2,
          column: 24,
          type: 'Identifier'
        }],
        parserOptions: parserOptions
      },
      {
        code:
`import { createSelector } from 'reselect';
export const getFoo = (state, id) => true`,
        errors: [{
          message: 'Second argument must be destructured',
          line: 2,
          column: 31,
          type: 'Identifier'
        }],
        parserOptions: parserOptions
      },
      {
        code:
`import { createSelector } from 'reselect';
export function getFoo(state, id) { return true }`,
        errors: [{
          message: 'Second argument must be destructured',
          line: 2,
          column: 31,
          type: 'Identifier'
        }],
        parserOptions: parserOptions
      },
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = createSelector(
  (state, id) => state,
  (state, id) => state,
  s => s
)`,
        errors: [
          {
            message: 'Second argument must be destructured',
            line: 3,
            column: 11,
            type: 'Identifier'
          },
          {
            message: 'Second argument must be destructured',
            line: 4,
            column: 11,
            type: 'Identifier'
          }
        ],
        parserOptions: parserOptions
      }
    ])
})
