// Import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull
} = require('graphql');

const Trade = require('./types/trade');
const Transfer = require('./types/transfer');
const Transport = require('./types/transport');
const Stock = require('./types/stock');
const SideType = require('./types/enums/trade-side');
const GraphQLDate = require('graphql-date');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',

  fields: () => ({
    allTrades: { 
      type: new GraphQLList(Trade),
      description: 'All Trades in the system.', 
      resolve: (obj, args, { loaders }) => {
        return loaders.getAllTrades();
      }
    },
    searchTrades: {
      type: new GraphQLList(Trade),
      description: 'Search trades based on criteria.',
      args: {
        buySide: { type: GraphQLString },
        sellSide: { type: GraphQLString },
        commodity: { type: GraphQLString },
        counterparty: { type: GraphQLString },
        locations: { type: new GraphQLList(GraphQLString) },
        startTd: { type: GraphQLDate },
        endTd: { type: GraphQLDate },
        transFlg: { type: GraphQLBoolean}
      },
      resolve: (obj, args, { loaders }) => {
        //TODO add batching through DataLoader
        //return loaders.searchTrades.loadMany([args.buySide, args.sellSide]);
        return loaders.searchTrades(args.buySide, args.sellSide, args.commodity, args.counterparty, args.locations, args.startTd, args.endTd, args.transFlg);
      }
    },
    allTransfers: { 
      type: new GraphQLList(Transfer)
    },
    allTransports: { 
      type: new GraphQLList(Transport),
      description: 'All Transports in the system.', 
      resolve: (obj, args, { loaders }) => {
        return loaders.getAllTransports;
      }
    },
    searchTransports: {
      type: new GraphQLList(Transport),
      description: 'Search transports based on criteria.',
      args: {
        orig: { type: GraphQLString },
        dst: { type: GraphQLString },
        loadSdt: { type: GraphQLDate },
        loadEdt: { type: GraphQLDate },
        unloadSdt: { type: GraphQLDate },
        unloadEdt: { type: GraphQLDate },
        type: { type: GraphQLString },
      },
      resolve: (obj, args, { loaders }) => {
        //TODO add batching through DataLoader
        //return loaders.searchTrades.loadMany([args.buySide, args.sellSide]);
        return loaders.searchTransports(args.orig, args.dst, args.loadSdt, args.loadEdt, args.unloadSdt, args.unloadEdt, args.type);
      }
    },
    findTrades: {
      type: new GraphQLList(Trade),
      description: 'Find trades on ids.',
      args: {
        ids: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: (obj, args, { loaders }) => {
        //TODO add batching through DataLoader
        //return loaders.searchTrades.loadMany([args.buySide, args.sellSide]);
        return loaders.findTrades(args.ids);
      }
    },
    findTransCat: {
      type: new GraphQLList(Transport),
      args: {
        cat: { type: GraphQLString }
      },
      resolve: (obj, args, { loaders }) => {
        return loaders.findTransCat(args.cat);
      }
    },
    findTrans: {
      type: new GraphQLList(Transport),
      description: 'Find transport on ids.',
      args: {
        ids: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: (obj, args, { loaders }) => {
        return loaders.findTrans(args.ids);
      }
    },
  })
});

const AddTradeMutation = require('./mutations/add-trade');
const UpdateTradeMutation = require('./mutations/update-trade');
const AddTransMutation = require('./mutations/add-transport');
const UpdateTransMutation = require('./mutations/update-transport');
const NominateMutation = require('./mutations/nominate-trade');

const RootMutationType = new GraphQLObjectType({
   name: 'RootMutation',

   fields: () => ({
     addTrade: AddTradeMutation,
     updateTrade: UpdateTradeMutation,
     addTrans: AddTransMutation,
     updateTrans: UpdateTransMutation,
     nominateTrade: NominateMutation
   })
 });

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = ncSchema;
