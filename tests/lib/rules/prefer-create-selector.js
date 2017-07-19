// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/prefer-create-selector');
const RuleTester = require('eslint').RuleTester;

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
ruleTester.run('prefer-create-selector', rule, {
  valid: []
    .concat([
      {
        code:
`import 'reselect';
function getFoo(state, { id }) {
  return _.get(state, ['obj', id, 'prop']);
}`,
        parserOptions,
      },
      {
        code:
`import 'reselect';
const getFoo = (state, { id }) => {
  return _.filter(Object.keys(getC(state, { id })), id => state.obj[id].isOk);
}`,
        parserOptions,
      },
      {
        code:
`import 'reselect';
export const test = getFoo(state);`,
        parserOptions,
      },
      {
        code:
`import 'reselect';
const getFoo = (state) => ({
  a: getA(state),
  b: getB(state)
})`,
        parserOptions,
      },
      {
        code:
`import 'reselect';
const selectFoo = (state) => ({
  a: selectA(state),
  b: selectB(state)
})`,
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        parserOptions,
      },
    ]),
  invalid: []
    .concat([
      {
        code:
`import 'reselect';
function getFoo(state, { id }) {
  return _.filter(Object.keys(getC(state)), id => state.obj[id].isOk);
}`,
        errors: [{
          message: 'Prefer use of createSelector function',
          line: 3,
          column: 31,
          type: 'CallExpression',
        }],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const getFoo = (state, { id }) => {
  return _.filter(Object.keys(getC(state)), id => state.obj[id].isOk);
}`,
        errors: [{
          message: 'Prefer use of createSelector function',
          line: 3,
          column: 31,
          type: 'CallExpression',
        }],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = createSelector(
  (state, id) => getFoo(state),
  s => s
)`,
        errors: [
          {
            message: 'Prefer use of createSelector function',
            line: 3,
            column: 18,
            type: 'CallExpression',
          },
        ],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
export const getTest = (state) => getFoo(state);`,
        errors: [
          {
            message: 'Prefer use of createSelector function',
            line: 2,
            column: 35,
            type: 'CallExpression',
          },
        ],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
export const selectTest = (state) => selectFoo(state);`,
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        errors: [
          {
            message: 'Prefer use of createSelector function',
            line: 2,
            column: 38,
            type: 'CallExpression',
          },
        ],
        parserOptions,
      },
    ]),
});
