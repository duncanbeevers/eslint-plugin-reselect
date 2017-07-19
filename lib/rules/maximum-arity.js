const utils = require('../utils');

const isReselectImported = utils.isReselectImported;
const getSelectors = utils.getSelectors;

module.exports = (context) => {
  const arity = context.options[0] || 2;
  const condition = `[params.length>${arity}]`;

  function test(node) {
    if (!isReselectImported(context)) {
      return;
    }

    context.report(node, `Maximum arity in selector must be ${arity}`);
  }

  return getSelectors(condition, test, context);
};

module.schema = [
  {
    type: 'integer',
  },
];
