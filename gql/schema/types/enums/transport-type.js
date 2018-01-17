const {
    GraphQLEnumType
  } = require('graphql');
  
  module.exports = new GraphQLEnumType({
    name: 'TransportType',
  
    values: {
      SHIP: { value: 'SHIP' },
      RAIL: { value: 'RAIL' },
      TRUCK: { value: 'TRUCK' }
    }
  });
  