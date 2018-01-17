import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const SEARCH_TRADES_QUERY = gql`
query SearchTradesQuery(
    $buySide: String,
    $sellSide: String,
    $commodity: String,
    $counterparty: String,
    $location: String,
    $startTd: Date,
    $endTd: Date
    ){
    searchTrades(
      buySide: $buySide,
      sellSide: $sellSide,
      commodity: $commodity,
      counterparty: $counterparty,
      location: $location,
      startTd: $startTd,
      endTd: $endTd
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

export const NOMINATE_TRADES_MUTATION = gql`
mutation NominateTradesMutation(
  $transId: Int!,
  $buys: [Int]!,
  $sells: [Int]!) {
    nominateTrade( input: {
    transId: $transId,
    buys: $buys,
    sells: $sells
  }
  ) {
    stockId
  }
}
`;
