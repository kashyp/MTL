const {
    GraphQLEnumType
  } = require('graphql');
  
  module.exports = new GraphQLEnumType({
    name: 'TransferStatusType',
  
    values: {
      NOMINATED: { value: 'NOMINATED' },
      TRANSFERRED: { value: 'TRANSFERRED' }
    }
  });
  