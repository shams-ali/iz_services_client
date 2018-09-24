const { assign } = Object;
const invoiceRequired = ['vin', 'model_year'];
const lienRequired = ['P1-1-Year']

const validate = values => {
  const { vin, email, zip, year, plate, make } = values;

  const errors = {};
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (zip && zip.length !== 5) {
    errors.zip = 'Must be five digits';
  }
  if (year && year.length !== 2) {
    errors.year = 'Must be two digits';
  }
  if (vin && vin.length > 17) {
    errors.vin = 'Must be less than 17 characters';
  }
  if (plate && plate.length > 7) {
    errors.plate = 'Must be less than 7 characters';
  }
  if (make && make.length > 5) {
    errors.make = 'Must be 5 characters or less';
  }

  



  return Object.assign(
    errors,
    [...invoiceRequired, ...lienRequired].reduce(
      (requiredErrors, field) =>
        assign(requiredErrors, !values[field] ? { [field]: 'Required' } : {}),
      {}
    )
  );
};

export default validate;
