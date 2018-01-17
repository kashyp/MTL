import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_TRANS_QUERY = gql`
query AllTransQuery {
  allTransports {
    transId
    orig
    dst
    loadDt
    unloadDt
    type
    stocks{
      stockId
      buy
      sell
    }
  }
}
`;


export const SEARCH_TRANS_QUERY = gql`
query SearchTransQuery(
    $orig: String,
    $dst: String,
    $loadSdt: Date,
    $loadEdt: Date,
    $unloadSdt: Date,
    $unloadEdt: Date
    $type: String
    ){
    searchTransports(
      orig: $orig,
      dst: $dst,
      loadSdt: $loadSdt,
      loadEdt: $loadEdt,
      unloadSdt: $unloadSdt,
      unloadEdt: $unloadEdt,
      type: $type
    ){
    transId
    orig
    dst
    loadDt
    unloadDt
    type
  }
}
`;

export const UPDATE_TRANS_MUTATION = gql`
mutation UpdateTransMutation(
  $transId: Int!,
  $orig: String,
  $dst: String,
  $loadDt: Date,
  $unloadDt: Date,
  $type: String) {
  updateTrans( input: {
    _id: $transId,
    orig: $orig,
    dst: $dst,
    loadDt: $loadDt,
    unloadDt: $unloadDt,
    type: $type
  }
  ) {
    transId
  }
}
`;

export const ADD_TRANS_MUTATION = gql`
mutation AddTransMutation(
  $orig: String,
  $dst: String,
  $loadDt: Date,
  $unloadDt: Date,
  $type: String) {
  addTrans( input: {
    orig: $orig,
    dst: $dst,
    loadDt: $loadDt,
    unloadDt: $unloadDt,
    type: $type
  }
  ) {
    transId
  }
}
`;
