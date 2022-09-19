module.exports = {
  errors: {
    INVALID_ARGUMENTS: 'Invalid Arguments',
    NO_SERVICE_BINDING_ROOT: 'No SERVICE_BINDING_ROOT env variable Found',
    UNKNOWN_SERVICE_TYPE: 'Unknown service type',
    UNKNOWN_CLIENT: 'Unknown client',
    NO_BINDING_FOUND: 'No Binding Found'
  },
  warnings: {
    NO_CLIENT_SPECIFIED_DEPRECATION:
      'Warning: Not specifying client will be deprecated in future version.',
    PASSING_ONLY_ID_DEPRECATION:
      'Warning: Passing id without using bindingOptions object is deprecated.\nSet id as attribute of bindingOptions instead.'
  }
};
