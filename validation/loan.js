const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoanInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : '';


  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'amount field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
