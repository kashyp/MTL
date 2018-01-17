import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_TRADES_QUERY = gql`
query AllTradesQuery {
  allTrades {
    tradeId
    side
    qty
    price
    tradeDt
    status
    cmdty
    cp
    loc
    transportId
  }
}
`;

export const UPDATE_TRADE_MUTATION = gql`
mutation UpdateTradeMutation(
  $tradeId: Int!,
  $side: String,
  $qty: Float,
  $price: Float,
  $tradeDt: Date,
  $commodity: String,
  $loc: String,
  $cp: String,
  $status: String) {
  updateTrade( input: {
    _id: $tradeId,
    side: $side,
    qty: $qty,
    price: $price,
    tradeDt: $tradeDt,
    cmdty: $commodity,
    loc: $loc,
    cp: $cp,
    status: $status
  }
  ) {
    tradeId
  }
}
`;

export const ADD_TRADE_MUTATION = gql`
mutation AddTradeMutation(
  $side: String,
  $qty: Float,
  $price: Float,
  $tradeDt: Date,
  $commodity: String,
  $loc: String,
  $cp: String) {
  addTrade( input: {
    side: $side,
    qty: $qty,
    price: $price,
    tradeDt: $tradeDt,
    cmdty: $commodity,
    loc: $loc,
    cp: $cp
  }
  ) {
    tradeId
  }
}
`;

export const SEARCH_TRADES_QUERY = gql`
query SearchTradesQuery(
    $buySide: String,
    $sellSide: String,
    $commodity: String,
    $counterparty: String,
    $locations: [String],
    $startTd: Date,
    $endTd: Date,
    $transFlg: Boolean
    ){
    searchTrades(
      buySide: $buySide,
      sellSide: $sellSide,
      commodity: $commodity,
      counterparty: $counterparty,
      locations: $locations,
      startTd: $startTd,
      endTd: $endTd,
      transFlg: $transFlg
    ){
    tradeId
    side
    qty
    price
    tradeDt
    status
    cmdty
    cp
    loc
    status
    transportId
  }
}
`;
