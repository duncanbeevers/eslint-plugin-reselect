// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/first-param-name');
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
ruleTester.run('first-param-name', rule, {
  valid: []
    .concat([
      {
        code:
`import { createSelector } from 'reselect';
const getView = (state, { id }) => state;`,
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
const getView = (st, { id }) => state;`,
        parserOptions,
        options: ['st'],
      },
      {
        code:
'const getView = (one, two, three) => one;',
        parserOptions,
      },
      {
        code:
'const selectView = (one, two, three) => one;',
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        parserOptions,
      },
      {
        code:
'const getView = (appState) => one;',
        settings: { 'reselect/stateParamName': 'appState' },
        parserOptions,
      },
      {
        code:
'const getView = (st) => one;',
        options: ['st'],
        settings: { 'reselect/stateParamName': 'appState' },
        parserOptions,
      },
    ]),
  invalid: []
    .concat([
      {
        code:
`import 'reselect';
const getFoo = function(hey, id) { return true; }`,
        errors: [{
          message: 'First parameter must be named \'state\'',
          line: 2,
          column: 25,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
`import 'reselect';
function getFoo(hey, id) { return true; }`,
        errors: [{
          message: 'First parameter must be named \'state\'',
          line: 2,
          column: 17,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
`import 'reselect';
export const getFoo = (hey, id) => { return true; }`,
        errors: [{
          message: 'First parameter must be named \'state\'',
          line: 2,
          column: 24,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
export function getTest(hey, id) { return true; }`,
        errors: [{
          message: 'First parameter must be named \'state\'',
          line: 2,
          column: 25,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = createSelector(
  (st, id) => state,
  s => s
)`,
        errors: [
          {
            message: 'First parameter must be named \'state\'',
            line: 3,
            column: 4,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import { createSelector } from 'reselect';
const getFoo = createSelector(
  (state, id) => state,
  s => s
)`,
        options: ['st'],
        errors: [
          {
            message: 'First parameter must be named \'st\'',
            line: 3,
            column: 4,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const selectView = (one, two, three) => one;`,
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        errors: [
          {
            message: 'First parameter must be named \'state\'',
            line: 2,
            column: 21,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const selectView = (one, two, three) => one;`,
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        errors: [
          {
            message: 'First parameter must be named \'state\'',
            line: 2,
            column: 21,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const getView = (state) => one;`,
        settings: { 'reselect/stateParamName': 'appState' },
        errors: [
          {
            message: 'First parameter must be named \'appState\'',
            line: 2,
            column: 18,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const selectView = (state) => one;`,
        settings: {
          'reselect/selectorMethodPrefix': 'select',
          'reselect/stateParamName': 'appState',
        },
        errors: [
          {
            message: 'First parameter must be named \'appState\'',
            line: 2,
            column: 21,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
      {
        code:
`import 'reselect';
const getView = (appState) => one;`,
        options: ['st'],
        settings: { 'reselect/stateParamName': 'appState' },
        errors: [
          {
            message: 'First parameter must be named \'st\'',
            line: 2,
            column: 18,
            type: 'Identifier',
          },
        ],
        parserOptions,
      },
    ]),
});
