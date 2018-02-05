const { assign } = Object;
const required = ['name', 'vin', 'model_year'];

const validate = values => {
  const { email, zip, year } = values;

  const errors = {};
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (zip && zip.length !== 5) {
    errors.zip = 'Must be five digits';
  }
  if (year && year.length !== 4) {
    errors.year = 'Must be four digits';
  }

  return Object.assign(
    errors,
    required.reduce(
      (requiredErrors, field) =>
        assign(requiredErrors, !values[field] ? { [field]: 'Required' } : {}),
      {}
    )
  );
};

export default validate;
