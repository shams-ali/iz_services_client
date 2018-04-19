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
      {
        name: 'case_type',
        select: [
          'Partial Year',
          'No Record',
          'Out Of State Salvaged',
          'Renewal',
          'Duplicate sticker',
          'Duplicate Plate',
          'Duplicate Registration Card ',
          'Registration Suspension Removal',
          'Duplicate Title',
          'Transfer with Title',
          'Transfer without Title',
          'Multiple Transfer',
          'Out of  State',
          'Lien Sale',
          'Liensale Transfer',
          'Salvage ',
          'Junk',
          'Salvage Certificate',
          'Nonrepairable Certificate',
          'Add Lien Holder',
          'Lien Holder Removal',
          'Vin Verification',
          'Vehicle Record Request',
          'Personalized Plate',
          'YOM Plate',
          'Legacy Plate',
          'Release of Liability'
        ]
      },
      {
        name: 'case_status',
        select: [
          'SEND TO DMV',
          'COMPLETED & HANDOVER',
          'COMPLETED/OFFICE',
          'RDF/OFFICE',
          'RDF/HANDOVER',
          'RDF FOR SMOG/HANDOVER',
          'RDF ROR TITLE/HANDOVER',
          'RDF FOR SMOG/ OFFICE',
          'RDF ROR TITLE/OFFICE',
          'DMV RDF FOR MORE MONEY',
          'DMV RDF FOR MISSING BOS'
        ]
      },
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
      { name: 'ros_num', type: 'number' }
    ]
  },
  {
    name: 'payments',
    fields: [
      { name: 'type', select: ['cash', 'credit', 'check', 'debit'] },
      { name: 'amount', type: 'number' }
    ]
  }
];

export default forms;
