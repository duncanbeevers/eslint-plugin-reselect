const utils = require('../utils');

const isReselectImported = utils.isReselectImported;
const getSelectors = utils.getSelectors;

module.exports = (context) => {
  const selectorMethodPrefix = utils.getSelectorMethodPrefix(context);

  const condition = ` :matches(CallExpression[callee.name=/^${selectorMethodPrefix}.+/][parent.type=/Function/], :not(Property) > CallExpression[callee.name=/^${selectorMethodPrefix}.+/][arguments.length=1][arguments.0.name=/state/])`;

  function test(node) {
    if (!isReselectImported(context)) {
      return;
    }

    context.report(node, 'Prefer use of createSelector function');
  }

  return getSelectors(condition, test, context);
};

module.schema = [
  {
    type: 'string',
  },
];
