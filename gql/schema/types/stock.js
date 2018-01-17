const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql');
  
  module.exports = new GraphQLObjectType({
    name: 'Stock',
    fields: () => {
      return {
        stockId: { type: GraphQLID },
        buy: { type: new GraphQLNonNull(GraphQLInt) },
        sell: { type: new GraphQLNonNull(GraphQLInt) }
      };
    }
  });
  