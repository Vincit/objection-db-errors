'use strict';

const dbErrors = require('db-errors');

const DBErrors = Model => {
  return class extends Model {
    static query() {
      return super.query.apply(this, arguments).onError(err => {
        return Promise.reject(dbErrors.wrapError(err));
      });
    }
  };
};

Object.keys(dbErrors).forEach(key => {
  module.exports[key] = dbErrors[key];
});

module.exports.DBErrors = DBErrors;
// DEPRECATED: Use DBErrors instead
module.exports.DbErrors = DBErrors;
