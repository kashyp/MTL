export default class TransNomModel {

  constructor(minDate, maxDate, commodity, src, dst){
    this._minDate = minDate;
    this._maxDate = maxDate;
    this._commodity = commodity;
    this._src = src;
    this._dst = dst;
  }

  get minDate(){
    return this._minDate;
  }

  set minDate(date){
    this._minDate = date;
  }

  get maxDate(){
    return this._maxDate;
  }

  set maxDate(date){
    this._maxDate = date;
  }

  get commodity(){
    return this._commodity;
  }

  set setCommodity(com){
    this._commodity = com;
  }

  get src() { return this._src }
  get dst() { return this._dst }

  set src(loc){ this._src = loc }
  set dst(loc){ this._dst = loc }

  toString(){
    return `TransNomModel : minDate - ${this.minDate}, maxDate - ${this.maxDate}, commodity - ${this.commodity}, src - ${this.src}, dst - ${this.dst}`;
  }
}
