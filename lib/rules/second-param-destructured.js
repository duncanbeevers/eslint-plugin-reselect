const utils = require('../utils');

const isReselectImported = utils.isReselectImported;
const getSelectors = utils.getSelectors;

module.exports = (context) => {
  const condition = '[params.length=2]';

  function test(node) {
    if (!isReselectImported(context)) {
      return;
    }

    if (node.params[1].type !== 'ObjectPattern') {
      context.report(node.params[1], 'Second argument must be destructured');
    }
  }

  return getSelectors(condition, test, context);
};

module.schema = [];
