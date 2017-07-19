const utils = require('../utils');

const isReselectImported = utils.isReselectImported;
const getSelectors = utils.getSelectors;

module.exports = (context) => {
  const paramName = utils.getStateParamName(context, context.options[0]);
  const condition = ` .params:first-child[name!=${paramName}]`;

  function test(node) {
    if (!isReselectImported(context)) {
      return;
    }

    context.report(node, `First parameter must be named '${paramName}'`);
  }

  return getSelectors(condition, test, context);
};

module.schema = [
  {
    type: 'string',
  },
];
