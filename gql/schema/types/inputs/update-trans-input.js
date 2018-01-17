const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
  } = require('graphql');

  const GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLInputObjectType({
    name: 'TransUpdateInput',
    //TODO make the types enums
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLInt)},
        orig: { type: GraphQLString },
        dst: { type: GraphQLString },
        loadDt: { type: GraphQLDate },
        unloadDt: { type: GraphQLDate },
        type: { type: GraphQLString }
    }
  });
  