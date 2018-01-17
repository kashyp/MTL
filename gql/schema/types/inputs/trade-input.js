const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
  } = require('graphql');

  const SideType = require('../enums/trade-side');
  const GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLInputObjectType({
    name: 'TradeInput',
  
    fields: {
        // side: { type: new GraphQLNonNull(SideType) },
        // qty: { type: new GraphQLNonNull(GraphQLFloat) },
        // price: { type: new GraphQLNonNull(GraphQLFloat) },
        // tradeDt: { type: new GraphQLNonNull(GraphQLDate) },
        // cmdty: { type: new GraphQLNonNull(GraphQLString) },
        // loc: { type: new GraphQLNonNull(GraphQLString) },
        // cp: { type: new GraphQLNonNull(GraphQLString) }
        side: { type: GraphQLString },
        qty: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        tradeDt: { type: GraphQLDate },
        cmdty: { type: GraphQLString },
        loc: { type: GraphQLString },
        cp: { type: GraphQLString }
    }
  });
  