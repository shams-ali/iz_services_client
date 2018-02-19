export const selectInvoiceContainer = state => state.containers.invoiceReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectApiRequestSuccess = state =>
  selectInvoiceContainer(state).get('apiRequestSuccess');

export const selectApiRequestError = state =>
  selectInvoiceContainer(state).get('apiRequestError');

export const selectApiRequestLoading = state =>
  selectInvoiceContainer(state).get('apiRequestLoading');
