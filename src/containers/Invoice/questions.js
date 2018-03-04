const forms = [
  {
    name: 'client',
    fields: [
      { name: 'dealer' },
      { name: 'name' },
      { name: 'phone', type: 'tel', maxLength: 10 },
      { name: 'email' },
      { name: 'dl' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state', maxLength: 2 },
      { name: 'zip', type: 'zip', maxLength: 5 }
    ]
  },
  {
    name: 'vehicle',
    fields: [
      { name: 'vin' },
      { name: 'plate' },
      { name: 'make' },
      { name: 'model_year', type: 'year' },
      { name: 'exp_date', type: 'date' },
      { name: 'engine' },
      { name: 'case_type' },
      { name: 'case_status' },
      { name: 'comments' }
    ]
  },
  {
    name: 'fees',
    fields: [
      { name: 'dmv_fee', type: 'number' },
      { name: 'service_fee', type: 'number' },
      { name: 'other_fee', type: 'number' },
      { name: 'extra_discount', type: 'number' },
      { name: 'old_post_fee', type: 'number' },
      { name: 'ros_bos', type: 'number' },
      { name: 'ros_num', type: 'number' },
      { name: 'tax', type: 'number' },
      { name: 'vehicle_tax', type: 'number' }
    ]
  },
  {
    name: 'payments',
    fields: [
      { name: 'type', select: ['cash', 'credit', 'check'] },
      { name: 'amount', type: 'number' }
    ]
  }
];

export default forms;
