/* eslint-disable global-require */

const allRules = {
  'second-param-destructured': require('./lib/rules/second-param-destructured'),
  'first-param-name': require('./lib/rules/first-param-name'),
  'maximum-arity': require('./lib/rules/maximum-arity'),
  call: require('./lib/rules/call'),
};

module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: {
        'reselect/first-param-name': 2,
        'reselect/maximum-arity': 2,
        'reselect/second-param-destructured': 2,
        'reselect/call': 2,
      },
    },
    recommended: {
      rules: {
        'reselect/first-param-name': 2,
        'reselect/maximum-arity': 2,
      },
    },
  },
};
