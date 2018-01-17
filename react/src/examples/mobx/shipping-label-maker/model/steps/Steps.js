class Step {
  key;
  title;
  next;
  previous;

  constructor(key, title, next, previous){
    this.key = key;
    this.title = title;
    this.next = next;
    this.previous = previous;
  }
}

const step1 = new Step('step1', 'Sender\'s Address', 'step2','none');
const step2 = new Step('step2', 'Receiver\'s Address', 'step3', 'step1');
const step3 = new Step('step3', 'Package Weight', 'none', 'step2');

const stepData = [step1, step2, step3];

export default stepData;
