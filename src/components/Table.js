import React, { Component } from 'react';
import {
  Table,
  TableBody,
  // TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { find, capitalize, map, maxBy, size, omit, identity } from 'lodash';
import InitializeFromStateForm from './InitializeFromStateForm';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0'
  },
  propToggleHeader: {
    margin: '20px auto 10px'
  }
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleCreateItem = this.handleCreateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
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
      modalProps: { isOpen: true }
    });
  }

  handleEditItem(type) {
    const { actions } = this.props;
    return ({ _id, ...body }) => {
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}`,
        data: body
      });
    };
  }

  handleCreateItem(type) {
    const { actions, invoice: { _id } } = this.props;
    return data => {
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}&kind=new`,
        data
      });
    };
  }

  handleDeleteItem(type) {
    const { actions, invoice: { _id } } = this.props;
    console.log('delete item');
    return ({ _id: deleteUid }) => {
      console.log(deleteUid, 'this is data');
      actions.apiRequest({
        method: 'put',
        url: `/v1/invoice/${_id}?type=${type}&deleteUid=${deleteUid}`
      });
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled
    });
  }

  handleChange(event) {
    this.setState({ height: event.target.value });
  }

  render() {
    const { mainFields, forms, invoice } = this.props;
    return (
      <div>
        {map(mainFields, (items, mainField) => {
          const largestItem = maxBy(items, Item => size(Item));
          return (
            <div key={mainField}>
              <Table
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                onCellClick={row =>
                  this.openModal(
                    mainField,
                    items[row],
                    this.handleEditItem,
                    this.handleDeleteItem
                  )
                }
              >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan={size(omit(largestItem, ['_id']))}
                      tooltip="Super Header"
                      style={{ textAlign: 'center' }}
                    >
                      {capitalize(mainField)}
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    {map(omit(largestItem, ['_id']), (_, k) => (
                      <TableHeaderColumn key={k} tooltip={k}>
                        {k}
                      </TableHeaderColumn>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                >
                  {items.map(item => {
                    return (
                      <TableRow key={item['_id']}>
                        {map(omit(item, ['_id']), (v, k) => (
                          <TableRowColumn key={k}>{v}</TableRowColumn>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
                {/* Add a footer here if we want <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
                <TableRow>
                  {map(largestItem, (_, k) => (
                    <TableRowColumn key={k}>{k}</TableRowColumn>
                  ))}
                </TableRow>
                <TableRow>
                  <TableRowColumn
                    colSpan={size(largestItem)}
                    style={{ textAlign: 'center' }}
                  >
                    {capitalize(mainField)}
                  </TableRowColumn>
                </TableRow>
                </TableFooter> */}
              </Table>
              <FloatingActionButton
                type="button"
                onClick={() =>
                  this.openModal(mainField, {}, this.handleCreateItem)
                }
              >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          );
        })}

        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>
      </div>
    );
  }
}
