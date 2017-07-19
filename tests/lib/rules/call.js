// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/call');
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
ruleTester.run('call', rule, {
  valid: []
    .concat([
      {
        code:
'const foo = getFoo(state, { id: 1 });',
        parserOptions,
      },
      {
        code:
'const foo = geFoo(state, id);',
        parserOptions,
      },
      {
        code:
'const foo = getFoo(stat, id);',
        parserOptions,
      },
      {
        code:
'const foo = getFoo(state);',
        parserOptions,
      },
      {
        code:
'const foo = selectFoo(state);',
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        parserOptions,
      },
      {
        code:
'const foo = getFoo(appState);',
        settings: { 'reselect/stateParamName': 'appState' },
        parserOptions,
      },
      {
        code:
'const foo = selectFoo(appState);',
        settings: {
          'reselect/selectorMethodPrefix': 'select',
          'reselect/stateParamName': 'appState',
        },
        parserOptions,
      },
    ]),
  invalid: []
    .concat([
      {
        code:
'const foo = getFoo(state, id);',
        errors: [{
          message: 'Second argument must be an object declaration',
          line: 1,
          column: 27,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
'const foo = heyFoo(etat, id);',
        options: ['hey', 'etat'],
        errors: [{
          message: 'Second argument must be an object declaration',
          line: 1,
          column: 26,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
'const foo = selectFoo(state, id);',
        settings: { 'reselect/selectorMethodPrefix': 'select' },
        errors: [{
          message: 'Second argument must be an object declaration',
          line: 1,
          column: 30,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
'const foo = getFoo(appState, id);',
        settings: { 'reselect/stateParamName': 'appState' },
        errors: [{
          message: 'Second argument must be an object declaration',
          line: 1,
          column: 30,
          type: 'Identifier',
        }],
        parserOptions,
      },
      {
        code:
'const foo = selectFoo(appState, id);',
        settings: {
          'reselect/selectorMethodPrefix': 'select',
          'reselect/stateParamName': 'appState',
        },
        errors: [{
          message: 'Second argument must be an object declaration',
          line: 1,
          column: 33,
          type: 'Identifier',
        }],
        parserOptions,
      },
    ]),
});
