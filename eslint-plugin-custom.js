module.exports = {
  rules: {
    'ignore-router-push': {
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object.name === 'router' &&
              node.callee.property.name === 'push'
            ) {
              return
            }

            context.report({
              message: 'Unhandled promise returned from router.push',
              node,
            })
          },
        }
      },
    },
  },
}
