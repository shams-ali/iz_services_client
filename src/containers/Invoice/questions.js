const forms = [
  {
    name: 'client',
    fields: [
      { name: 'dealer' },
      { name: 'name' },
      { name: 'phone' },
      { name: 'email' },
      { name: 'dl' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state' },
      { name: 'zip' }
    ]
  },
  {
    name: 'vehicle',
    fields: [
      { name: 'vin' },
      { name: 'plate' },
      { name: 'make' },
      { name: 'model_year' },
      { name: 'exp_date', options: 'date', onFocus: true },
      { name: 'engine' },
      { name: 'case_type' },
      { name: 'case_status' },
      { name: 'comments' }
    ]
  },
  {
    name: 'fee',
    fields: [
      { name: 'dmv_fee' },
      { name: 'dmv_fee2' },
      { name: 'service_fee' },
      { name: 'other_fee' },
      { name: 'extra_discount' },
      { name: 'old_post_fee' },
      { name: 'ros_bos' },
      { name: 'ros_num' },
      { name: 'tax' },
      { name: 'vehicle_tax' },
      { name: 'type' },
      { name: 'comments' },
      { name: 'status' }
    ]
  },
  {
    name: 'payment',
    fields: [{ name: 'type' }, { name: 'amount' }]
  }
];

export default forms;
