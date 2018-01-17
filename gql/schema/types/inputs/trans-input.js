const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql');

  const GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLInputObjectType({
    name: 'TransInput',
  
    fields: {
        orig: { type: GraphQLString },
        dst: { type:GraphQLString },
        loadDt: { type: GraphQLDate },
        unloadDt: { type: GraphQLDate },
        type: { type: GraphQLString }
    }
  });
  