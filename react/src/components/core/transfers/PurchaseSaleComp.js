import React from 'react';
import PurchaseSales from './../../shared/PurchaseSales';
import PurchaseSaleWrapper from './../../shared/PurchaseSaleWrapper';
import { observer, inject } from "mobx-react";
import { observable, action, toJS } from "mobx";

@inject("transferStore") @observer
class PurchaseSaleComp extends React.Component{

  componentDidMount(){
    this.props.transferStore.clearSelections();
  }

    // rowSelection object indicates the need for row selection
rowSelectionPurch = {
  onChange: (selectedRowKeys, selectedRows) => {
    this.props.transferStore.addSelectedBuys(selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.status === 'NOMINATED'
  })
};

rowSelectionSale = {
  onChange: (selectedRowKeys, selectedRows) => {
    this.props.transferStore.addSelectedSells(selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.status === 'NOMINATED'
  })
};

  render(){

    let PurchaseComp = PurchaseSaleWrapper(PurchaseSales, 'transfer', 'purchase');
    let SaleComp = PurchaseSaleWrapper(PurchaseSales, 'transfer', 'sales');
    let purchaseData = this.props.transferStore.searchTransfPurch.length>0 ? toJS(this.props.transferStore.searchTransfPurch) : this.props.transferStore.purchasesWOTransfers;
    let saleData = this.props.transferStore.searchTransfSale.length>0 ? toJS(this.props.transferStore.searchTransfSale) : this.props.transferStore.salesWOTransfers;

    return(
      <div>
        <div className="component-container">
          <PurchaseComp data={purchaseData} rowSelection={this.rowSelectionPurch}/>
        </div>
        <div className="component-container">
          <SaleComp data={saleData} rowSelection={this.rowSelectionSale}/>
        </div>
      </div>
    );
  }

}

export default PurchaseSaleComp;
