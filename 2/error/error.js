const asyncCatch = (fn) => (req, res, next) => fn(req, res).catch(next)

module.exports = asyncCatch