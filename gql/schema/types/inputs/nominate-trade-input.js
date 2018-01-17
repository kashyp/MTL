const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
  } = require('graphql');

  module.exports = new GraphQLInputObjectType({
    name: 'NominateTradeInput',
  
    fields: {
        transId: { type: new GraphQLNonNull(GraphQLInt) },
        buys: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
        sells: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    }
  });
  