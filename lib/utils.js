const isReselectImported = (context) => {
  const imports = context.getSourceCode().ast.body
    .filter(n => n.type === 'ImportDeclaration');

  return imports.some(n => n.source.value === 'reselect');
};

const getSelectors = (condition, test, options) => {
  const opt = Object.assign(
    {
      createSelectorPattern: '^create.*Selector',
    },
    options // eslint-disable-line comma-dangle
  );

  return {
    [`:matches(Program, Program > ExportNamedDeclaration) > :function[id.name=/^get/]${condition}`]:
      test,
    [`:matches(Program, Program > ExportNamedDeclaration) > :declaration > [id.name=/^get/] > :function${condition}`]:
      test,
    [`[key.name=/^get/] > :function${condition}`]:
      test,
    [`CallExpression[callee.name=/${opt.createSelectorPattern}/] > :function:not(:last-child)${condition}`]:
      test,
    [`ExportDefaultDeclaration :function[params.0.name=/state/]${condition}`]: test,
  };
};

module.exports = {
  isReselectImported,
  getSelectors,
};
