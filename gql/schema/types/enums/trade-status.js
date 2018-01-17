const {
    GraphQLEnumType
  } = require('graphql');
  
  module.exports = new GraphQLEnumType({
    name: 'TradeStatusType',
  
    values: {
      OPEN: { value: 'OPEN' },
      NOMINATED: { value: 'NOMINATED' }
    }
  });
  