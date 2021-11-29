function getRandomName(context, ee, next) {
  context.vars['randomName'] = Math.random().toString(36).substr(2, 11);
  return next();
}

module.exports = { getRandomName };
