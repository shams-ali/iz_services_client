import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sum } from 'lodash';
import './index.css';

const { assign } = Object;

const Receipt = ({ invoice, getFinalTotals }) => {
  console.log(invoice);
  const {
    _id: id,
    name = '',
    dealer = '(Walkin Customer)',
    address = '',
    city = '',
    state = '',
    zip = '',
    fees = [],
    payments = [],
    make = '',
    model_year: modelYear = '',
    case_type: caseType = '',
    case_status: caseStatus = '',
    vin = '',
    plate = ''
  } = invoice;

  const {
    dmv_fee: dmvFee = 0,
    service_fee: serviceFee = 0,
    tax = 0,
    vehicle_tax: vehicleTax = 0,
    extra_discount: extraDiscount = 0,
    other_fee: otherFee = 0,
    ros_bos: rosBos = 0,
    ros_num: rosNum = 0,
    old_post_fee: oldPostFee = 0
  } = getFinalTotals(fees);

  const customerTotalFees =
    sum([dmvFee, serviceFee, otherFee, vehicleTax, tax]) - extraDiscount;

  const adminTotalFees =
    sum([dmvFee, serviceFee, otherFee, vehicleTax, tax, rosBos, rosNum]) -
    extraDiscount;

  const { debit = 0, cash = 0, check = 0, credit = 0 } = payments.reduce(
    (total, { type, amount }) => assign(total, { [type]: amount }),
    {}
  );

  const customerTotalPayments = sum([cash, check, credit, oldPostFee]);

  return (
    <div className="receipt container">
      <table>
        {/* <caption>A complex table</caption> */}
        <thead>
          <tr>
            <th colSpan={4}>{`Invoice #${id}`} Prepared by Nadeem</th>
            <th>{moment().format('MMMM Do YYYY')}</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <h4>Billed From: IZ Services</h4>
              <p>
                3592 Redondo Beach Blvd. <br />Torrance, CA 90504
              </p>
              <p>
                Phone: (310) 527-2345 <br /> Fax: (310) 527-2347 <br /> Email:
                izservices2012@gmail.com
              </p>
            </td>
            <td colSpan={3}>
              <h4>{`Name: ${name} ${dealer}`}</h4>
              <p>
                {`${address}`} <br /> {`${city}, ${state} ${zip}`}
              </p>
              <p>
                {`Vin: ${vin}`} <br />
                {`Plate: ${plate}`} <br />
                {`Model/Year: ${make} ${modelYear}`} <br />
                {`Case Type: ${caseType}`} <br />
              </p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={5}>Fees: ${customerTotalFees}</th>
          </tr>
          <tr>
            <th>DMV FEE</th>
            <th>Service Fee</th>
            <th>Other Fee</th>
            <th>Sales Tax</th>
            <th>Discount</th>
          </tr>
          <tr>
            <td>${dmvFee}</td>
            <td>${serviceFee}</td>
            <td>${otherFee}</td>
            <td>${vehicleTax + tax}</td>
            <td>${extraDiscount}</td>
          </tr>
          <tr>
            <th colSpan={5}>Payments: ${customerTotalPayments}</th>
          </tr>
          <tr>
            <th>Cash</th>
            <th>Check</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Old Post Fee</th>
          </tr>
          <tr>
            <td>${cash}</td>
            <td>${check}</td>
            <td>${debit}</td>
            <td>${credit}</td>
            <td>${oldPostFee}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              Outstanding Balance ${customerTotalFees - customerTotalPayments}
            </th>
          </tr>
        </tfoot>
      </table>
      <br />
      <table>
        {/* ADMIN VIEW */}
        <thead>
          <tr>
            <th colSpan={4}>{`Invoice #${id}`} Prepared by Nadeem</th>
            <th>{moment().format('MMMM Do YYYY')}</th>
          </tr>
          <tr>
            <td colSpan={3}>
              <h4>{`Name: ${name} ${dealer}`}</h4>
              {`Case Type: ${caseType}`} <br />
              {`Case Status: ${caseType}`} <br />
            </td>
            <td colSpan={2}>
              <h4>{`Vin: ${vin}`}</h4>
              <p>
                {`Plate: ${plate}`} <br />
                {`Model/Year: ${make} ${modelYear}`} <br />
              </p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={5}>Fees: ${adminTotalFees}</th>
          </tr>
          <tr>
            <th>DMV FEE</th>
            <th>Service Fee</th>
            <th>Other Fee</th>
            <th>ROS + Sales Tax</th>
            <th>Discount</th>
          </tr>
          <tr>
            <td>${dmvFee}</td>
            <td>${serviceFee}</td>
            <td>${otherFee}</td>
            <td>${vehicleTax + tax + rosBos + rosNum}</td>
            <td>${extraDiscount}</td>
          </tr>
          <tr>
            <th colSpan={5}>Payments: ${customerTotalPayments}</th>
          </tr>
          <tr>
            <th>Cash</th>
            <th>Check</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Old Post Fee</th>
          </tr>
          <tr>
            <td>${cash}</td>
            <td>${check}</td>
            <td>${credit}</td>
            <td>${debit}</td>
            <td>${oldPostFee}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              Outstanding Balance ${customerTotalFees - customerTotalPayments}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

Receipt.defaultProps = {
  invoice: {}
};

Receipt.propTypes = {
  invoice: PropTypes.objectOf(PropTypes.any),
  getFinalTotals: PropTypes.func.isRequired
};

export default Receipt;
