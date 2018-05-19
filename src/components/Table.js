import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Gesture from 'material-ui/svg-icons/content/move-to-inbox';
import {
  pick,
  find,
  capitalize,
  map,
  size,
  omit,
  identity,
  reduce
} from 'lodash';
import InitializeFromStateForm from './InitializeFromStateForm';

const { keys, assign } = Object;

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleCreateItem = this.handleCreateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  componentWillMount() {
    const { invoice, actions } = this.props;
    actions.setInvoice(invoice);
  }

  openModal(mainField, item, onSubmit, handleDeleteItem = identity) {
    const { actions, forms } = this.props;
    actions.setEditFields(item);
    actions.setModal(InitializeFromStateForm, {
      componentProps: {
        fields: find(forms, ['name', mainField]).fields,
        onSubmit: onSubmit(mainField),
        actions,
        deleteItem: handleDeleteItem(mainField)
      },
      modalProps: {
        isOpen: true
      }
    });
  }

  handleEditItem(type) {
    const { actions } = this.props;
    return ({ _id, ...body }) =>
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}`,
        data: body
      });
  }

  handleCreateItem(type) {
    const { actions, invoice: { _id } } = this.props;
    return data =>
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}&kind=new`,
        data
      });
  }

  handleDeleteItem(type) {
    const { actions, invoice: { _id } } = this.props;
    return ({ _id: deleteUid }) =>
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}&deleteUid=${deleteUid}`
      });
  }

  render() {
    const { mainFields, forms, invoice, actions: { push} } = this.props;
    return (
      <div>
        {map(pick(invoice, mainFields), (items, mainField) => {
          const finalTotals = items.reduce(
            (totals, item) =>
              assign(
                totals,
                reduce(
                  omit(item, ['_id']),
                  (subTotals, v, k) =>
                    assign(subTotals, {
                      [k]: (typeof v !== 'string' && totals[k] + v) || v
                    }),
                  totals
                )
              ),
            {}
          );
          const totalDue = reduce(
            finalTotals,
            (total, v, k) => {
              if (typeof v === 'string' || k === 'old_post_fee') {
                return total;
              }
              return total + v;
            },
            0
          );
          return (
            <div key={mainField}>
              <Table
                height="300px"
                fixedHeader
                onCellClick={row =>
                  this.openModal(
                    mainField,
                    items[row],
                    this.handleEditItem,
                    this.handleDeleteItem
                  )
                }
              >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn
                      colSpan={size(finalTotals)}
                      tooltip={mainField}
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      {`Total ${capitalize(mainField)}: ${totalDue}`}
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    {keys(finalTotals).map(k => (
                      <TableHeaderColumn key={k} tooltip={k}>
                        {k}
                      </TableHeaderColumn>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  deselectOnClickaway
                  showRowHover
                  stripedRows
                >
                  {items.map(({ _id: id, ...item }) => (
                    <TableRow key={id}>
                      {keys(finalTotals).map(key => (
                        <TableRowColumn key={key}> {item[key]} </TableRowColumn>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableRowColumn
                      colSpan={size(finalTotals)}
                    >
                      <FloatingActionButton
                        type="button"
                        onClick={() => this.openModal(mainField, {}, this.handleCreateItem)} 
                      >
                        <ContentAdd />
                      </FloatingActionButton>
                      <FloatingActionButton
                        type="button"
                        onClick={() =>  push(`/invoice/${invoice._id}/reciept`)} 
                      >
                        <Gesture />
                      </FloatingActionButton>

                    </TableRowColumn>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          );
        })}
      </div>
    );
  }
}
