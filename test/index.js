var context = require.context('../App', true, /.+\.test\.js?$/);
context.keys().forEach(context);
module.exports = context;
