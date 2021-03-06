const utils = require('../utils');

const isReselectImported = utils.isReselectImported;
const getSelectors = utils.getSelectors;

function test(context, node) {
  if (!isReselectImported(context)) {
    return;
  }

  context.report(node, 'Prefer use of createSelector function');
}

module.exports = (context) => {
  const condition = ' :matches(CallExpression[callee.name=/^get.+/][parent.type=/Function/], :not(Property) > CallExpression[callee.name=/^get.+/][arguments.length=1][arguments.0.name=/state/])';

  return getSelectors(condition, test.bind(null, context));
};

module.schema = [
  {
    type: 'string',
  },
];
