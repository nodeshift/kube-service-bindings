const { defaultOptions } = require('../options/defaultOptions');
const isString = function (x) {
  return !!(typeof x === 'string' || x instanceof String);
};

const getBindOptions = function (options) {
  if (isString(options)) {
    return Object.assign(
      {
        id: options
      },
      defaultOptions
    );
  } else {
    return Object.assign(options, defaultOptions);
  }
};

module.exports = {
  getBindOptions
};
