export const PRICE_UNIT = '\$';
export const WEIGHT_UNIT = 'Oz';
export const SHIPPING_RATE = 0.5;

export function getLabel(){
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
 return text;
}

export function validateAddress(add, party) {
  if (add) {
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `Please enter ${party} address`
  };
}
