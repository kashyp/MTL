import React from 'react';
import  moment from 'moment';
import { Icon } from 'antd';
import { Select, Radio } from 'antd';
const Option = Select.Option;

export const tradeColumns = [{
  title: 'Trade Date',
  dataIndex: 'tradeDt',
  key: 'tradeDt',
  render: (text, record) => {
    return moment(record.tradeDt).format('DD/MM/YY');
  }
}, {
  title: 'Commodity',
  dataIndex: 'commodity',
  key: 'commodity'
}, {
  title: 'Side',
  dataIndex: 'side',
  key: 'side'
}, {
  title: 'Qty (MT)',
  dataIndex: 'qty',
  key: 'qty'
},
{
  title: 'Price (/ MT)',
  dataIndex: 'price',
  key: 'price',
  render: (text, record) => {
    return `$${record.price}`;
  }
},
{
  title: 'Counterparty',
  dataIndex: 'cp',
  key: 'counterparty'
}, {
  title: 'Location',
  dataIndex: 'loc',
  key: 'location'
}, {
  title: '',
  key: 'editable',
  render: (text, record) => {
    if(record.editable){
      return <span><Icon type="delete" /></span>;
    } else {
      return <span></span>;
    }
  }
}];

export const buySellOptions = [
  { key:"1", label: 'Buy', value: 'BUY' },
  { key:"2", label: 'Sell', value: 'SELL' }
];

export const buySellRadios = [
  <Radio key="1" value={'BUY'}>Buy</Radio>,
  <Radio value="2" value={'SELL'}>Sell</Radio>
];

export const commodityOptions = [
  <Option key="1" value="AL">AL</Option>,
  <Option key="2" value="ZN">ZN</Option>,
  <Option key="3" value="CU">CU</Option>,
  <Option key="4" value="PB">PB</Option>
];

export const counterPartyOptions = [
  <Option key="1" value="Codelco">Codelco</Option>,
  <Option key="2" value="Glencore">Glencore</Option>,
  <Option key="3" value="Vale">Vale</Option>,
  <Option key="4" value="Rio Tinto Group">Rio Tinto Group</Option>,
  <Option key="5" value="FreePort-McMoRan">FreePort-McMoRan</Option>
];

export const locationOptions = [
  <Option key="1" value="PER">Peru</Option>,
  <Option key="2" value="CHI">Chile</Option>,
  <Option key="3" value="GHA">Ghana</Option>,
  <Option key="4" value="BA">Brazil</Option>,
  <Option key="5" value="SA">South Africa</Option>,
  <Option key="6" value="RS">Russia</Option>,
  <Option key="7" value="LON">London</Option>
];

export const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

//move to TransUtils.js
export const transTypeOptions = [
  <Option key="1" value="SHIP">Ship</Option>,
  <Option key="2" value="TRUCK">Truck</Option>,
  <Option key="3" value="RAIL">Rail</Option>
];

export const transColumns = [{
  title: 'Origin',
  dataIndex: 'orig',
  key: 'orig'
}, {
  title: 'Destination',
  dataIndex: 'dst',
  key: 'dst'
}, {
  title: 'Loading Date',
  dataIndex: 'loadDt',
  key: 'loadDt',
  render: (text, record) => {
    return moment(record.loadDt).format('DD/MM/YY');
  }
}, {
  title: 'Unloading Date',
  dataIndex: 'unloadDt',
  key: 'unloadDt',
  render: (text, record) => {
    return moment(record.unloadDt).format('DD/MM/YY');
  }
},
{
  title: 'Type',
  dataIndex: 'type',
  key: 'type'
},{
  title: '',
  key: 'editable',
  render: (text, record) => {
    if(record.editable){
      return <span><Icon type="delete" /></span>;
    } else {
      return <span></span>;
    }
  }
}];

const transferPurchaseSaleColumns = [{
  title: 'Trade Date',
  dataIndex: 'tradeDt',
  key: 'tradeDt',
  render: (text, record) => {
    return moment(record.tradeDt).format('DD/MM/YY');
  }
}, {
  title: 'Commodity',
  dataIndex: 'commodity',
  key: 'commodity'
}, {
  title: 'Qty (MT)',
  dataIndex: 'qty',
  key: 'qty'
}, {
  title: 'Location',
  dataIndex: 'loc',
  key: 'loc'
},
{
  title: 'Transport ID',
  dataIndex: 'transportId',
  key: 'transportId'
}];

const transportPurchaseSaleColumns = [{
  title: 'Trade Date',
  dataIndex: 'tradeDt',
  key: 'tradeDt',
  render: (text, record) => {
    return moment(record.tradeDt).format('DD/MM/YY');
  }
}, {
  title: 'Commodity',
  dataIndex: 'commodity',
  key: 'commodity'
}, {
  title: 'Qty (MT)',
  dataIndex: 'qty',
  key: 'qty'
}, {
  title: 'Price (/MT)',
  dataIndex: 'price',
  key: 'price'
},
{
  title: 'Location',
  dataIndex: 'loc',
  key: 'loc'
}];

export const purchaseSaleConfig = {
  transport: {
    topDivClass: 'trans-purch-sale-div',
    rowClass: 'trans-purch-sale-row',
    spanClass: 'trans-purch-sale-span',
    heading: {
      purchase: 'Purchases',
      sales: 'Sales'
    },
    columns: transportPurchaseSaleColumns,
    tableSize: 'medium',
    tablePagination: false
  },
  transfer: {
    topDivClass: 'transfer-purch-sale-div',
    rowClass: 'transfer-purch-sale-row',
    spanClass: 'transfer-purch-sale-span',
    heading: {
      purchase: 'Purchases',
      sales: 'Sales'
    },
    columns: transferPurchaseSaleColumns,
    tableSize: 'medium',
    tablePagination: true
  }
};

