function escapeRegExp(str) {
  return str && str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function getStateParamName(context, override) {
  const settings = context.settings || {};

  return (
    override ||
    escapeRegExp(settings['reselect/stateParamName']) ||
    'state'
  );
}

function getSelectorMethodPrefix(context, override) {
  const settings = context.settings || {};
  return (
    override ||
    escapeRegExp(settings['reselect/selectorMethodPrefix']) ||
    'get'
  );
}

const isReselectImported = (context) => {
  const imports = context.getSourceCode().ast.body
    .filter(n => n.type === 'ImportDeclaration');

  return imports.some(n => n.source.value === 'reselect');
};

const getSelectors = (condition, test, context, options) => {
  const selectorMethodPrefix = getSelectorMethodPrefix(context);

  const opt = Object.assign(
    {
      createSelectorPattern: '^create.*Selector',
    },
    options // eslint-disable-line comma-dangle
  );

  const paramName = getStateParamName(context);

  const rules = [
    `:matches(Program, Program > ExportNamedDeclaration) > :function[id.name=/^${selectorMethodPrefix}/]${condition}`,
    `:matches(Program, Program > ExportNamedDeclaration) > :declaration > [id.name=/^${selectorMethodPrefix}/] > :function${condition}`,
    `[key.name=/^${selectorMethodPrefix}/] > :function${condition}`,
    `CallExpression[callee.name=/${opt.createSelectorPattern}/] > :function:not(:last-child)${condition}`,
    `ExportDefaultDeclaration :function[params.0.name=/${paramName}/]${condition}`,
  ];

  return rules.reduce((acc, rule) => {
    acc[rule] = test;

    return acc;
  }, {});
};

module.exports = {
  escapeRegExp,
  getStateParamName,
  getSelectorMethodPrefix,
  isReselectImported,
  getSelectors,
};
