const utils = require('../utils');

module.exports = (context) => {
  const selectorMethodPrefix = utils.getSelectorMethodPrefix(context, context.options[0]);

  const paramName = utils.getStateParamName(context, context.options[1]);

  function test(node) {
    if (node.arguments[1].type !== 'ObjectExpression') {
      context.report(node.arguments[1], 'Second argument must be an object declaration');
    }
  }

  return {
    [`CallExpression[callee.name=/^${selectorMethodPrefix}.+/][arguments.length=2][arguments.0.name=${paramName}]`]: test,
  };
};

module.schema = [];
