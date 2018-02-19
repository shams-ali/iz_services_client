export const selectInvoiceContainer = state => state.containers.invoiceReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectInvoiceSuccess = state =>
  selectInvoiceContainer(state).get('createInvoiceSuccess');

export const selectInvoiceError = state =>
  selectInvoiceContainer(state).get('createInvoiceError');
