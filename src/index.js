const { next, hookStart, call } = require('appache/effects')
const PrettyError = require('pretty-error')


let prettyError = new PrettyError()
  .skipNodeFiles()
  .skipPackage('corrie', 'hooter')
  .skipPath(null)

function prettifyError(err) {
  let newErr = new Error()
  newErr.stack = `\n${prettyError.render(err)}`
  return newErr
}

function* errorStartHandler(...args) {
  try {
    return yield next(...args)
  } catch (err) {
    throw yield call(prettifyError, err)
  }
}

module.exports = function* prettyErrorsPlugin() {
  yield hookStart('error', errorStartHandler)
}
