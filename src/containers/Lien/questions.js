const forms = [
  {
    name: 'lien',
    fields: [
      {
        name: 'PER DAY',
        type: 'number'
      },
      {
        name: 'TOWING',
        type: 'number'
      },
      {
        name: 'REPAIRS',
        type: 'number'
      },
      {
        name: 'PARKING VIOLATIONS',
        type: 'number'
      },
      {
        name: 'COST FOR LIEN SALE',
        type: 'number'
      },
      {
        name: 'BUREAU OF AUTO REPAIR #'
      },
      {
        name: 'P1-6-Storage 4000 or less'
      },
      {
        name: 'P1-1-Lic No'
      },
      {
        name: 'P1-1-States',
        type: 'state',
        maxLength: 2
      },
      {
        name: 'P1-1-Lic Exp Date',
        type: 'date'
      },
      {
        name: 'P1-1-VIN'
      },
      {
        name: 'P1-1-Make',
        type: 'letters'
      },
      {
        name: 'P1-1-Year',
        type: 'year'
      },
      {
        name: 'P1-1-Model'
      },
      {
        name: 'P1-1-Body type'
      },
      {
        name: 'P1-1-Eng No (M/C only)'
      },
      {
        name: 'P1-2-Date Veh into possession',
        type: 'date'
      },
      {
        name: 'P1-2-Date owner billed',
        type: 'date'
      },
      {
        name: 'P1-2-Date work-serv completed',
        type: 'date'
      },
      {
        name: 'P1-7-Lienholder Name'
      },
      {
        name: 'tel',
        type: 'phone'
      },
      {
        name: 'P1-7-Street Address-1'
      },
      {
        name: 'P1-7-City-1'
      },
      {
        name: 'P1-7-States-1',
        type: 'state',
        maxLength: 2
      },
      {
        name: 'P1-7-Zip Code-1',
        type: 'zip',
        maxLength: 5
      },
      {
        name: 'DATE NOTICE MAILED',
        type: 'date'
      },
      {
        name: 'DATE OF SALE',
        type: 'date'
      }
    ]
  },
  {
    name: 'REGISTERED OWNER',
    fields: [
      { name: 'name', type: 'name' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state', maxLength: 2, type: 'state' },
      { name: 'zip', type: 'zip', maxLength: 5 }
    ]
  },
  {
    name: 'LEGAL OWNER',
    fields: [
      { name: 'name', type: 'name' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state', maxLength: 2, type: 'state' },
      { name: 'zip', type: 'zip', maxLength: 5 }
    ]
  },
  {
    name: 'INTERESTED PARTIES',
    fields: [
      { name: 'name', type: 'name' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state', maxLength: 2, type: 'state' },
      { name: 'zip', type: 'zip', maxLength: 5 }
    ]
  }
];



export default forms;
