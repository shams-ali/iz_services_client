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
      { name: 'zip', type: 'tel', maxLength: 5 }
    ]
  },
  {
    name: 'vehicle',
    fields: [
      { name: 'vin' },
      { name: 'plate' },
      { name: 'make' },
      { name: 'model_year', type: 'tel', maxLength: 4 },
      { name: 'exp_date', options: 'date' },
      { name: 'engine' },
      { name: 'case_type' },
      { name: 'case_status' },
      { name: 'comments' }
    ]
  },
  {
    name: 'fee',
    fields: [
      { name: 'dmv_fee', type: 'number' },
      { name: 'service_fee', type: 'number' },
      { name: 'other_fee', type: 'number' },
      { name: 'extra_discount', type: 'number' },
      { name: 'old_post_fee', type: 'number' },
      { name: 'ros_bos' },
      { name: 'ros_num' },
      { name: 'tax', type: 'number' },
      { name: 'vehicle_tax', type: 'number' }
    ]
  },
  {
    name: 'payment',
    fields: [
      { name: 'type', select: ['cash', 'credit', 'check'] },
      { name: 'amount', type: 'number' }
    ]
  }
];

export default forms;
