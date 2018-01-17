const {
    GraphQLEnumType
  } = require('graphql');
  
  module.exports = new GraphQLEnumType({
    name: 'TradeSideType',
  
    values: {
      BUY: { value: 'BUY' },
      SELL: { value: 'SELL' }
    }
  });
  