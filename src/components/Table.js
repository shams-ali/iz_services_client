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
import { find, capitalize, map, maxBy, size, isEqual } from 'lodash';
import Form from './Form';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';
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
      height: '300px',
      editCell: { row: null, m: { target: {} }, col: null }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    const { mainFields, forms } = this.props;
    const { editCell } = this.state;
    console.log(mainFields, 'this is mainFields');
    console.log('editcell', editCell);
    return (
      <div>
        {map(mainFields, (items, mainField) => {
          const largestItem = maxBy(items, Item => size(Item));
          console.log(largestItem, 'this is largets fiels');
          return (
            <div key={mainField}>
              <Table
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                onCellClick={(row, col, m) =>
                  this.setState({ editCell: { row, col, mainField } })
                }
              >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan={size(largestItem)}
                      tooltip="Super Header"
                      style={{ textAlign: 'center' }}
                    >
                      {capitalize(mainField)}
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    {map(largestItem, (_, k) => (
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
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      {Object.keys(item).map((k, col) => (
                        <TableRowColumn key={k}>
                          {isEqual(index, editCell.row) &&
                          isEqual(mainField, editCell.mainField) &&
                          isEqual(col, editCell.col) ? (
                            <form>
                              <FloatingActionButton mini type="button">
                                <ActionDone />
                              </FloatingActionButton>
                              <TextField
                                floatingLabelText={k}
                                defaultValue={item[k]}
                                onChange={this.handleChange}
                              />
                            </form>
                          ) : (
                            item[k]
                          )}
                        </TableRowColumn>
                      ))}
                    </TableRow>
                  ))}
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
              <Form
                onSubmit={() => console.log('hello world')}
                formName={mainField}
                fields={find(forms, ['name', mainField]).fields}
                lastPage={true}
                key={mainField}
              />
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
