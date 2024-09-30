import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', 'C', '=', '%', '.', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    //Validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input');
      return;
    }
    if (value === '=') {
      console.log('Calculate result');
      return;
    }
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }
    if (value === 'Backspace') {
      if (this.resultText() === '0') {
        return;
      }
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update((prev) => prev.slice(0, -1));
    }
    if(operators.includes(value)){
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return
    }
    if(value === '.' && !this.resultText().includes('.')){
      if(this.resultText()==='0' || this.resultText()===''){
        this.resultText.update(prev => prev + '0.');
      }
      return;
    }
    this.resultText.update((prev) => prev +'.');
    return;
  }
}
