import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorBottomComponent } from '../calculator-bottom/calculator-bottom.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CalculatorBottomComponent
  ],
  styleUrl: './calculator.component.css',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorBottomComponent);
  public resultText = computed(() => this.calculatorService.resultText());
  public subResulText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());
  handleClick(key: string) {
    console.log({ key });
  }
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    }
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);
    this.calculatorButtons().forEach((button) => {
      if (button.contentValue()?.nativeElement.innerText === event.key) {
        button.keyBoardPressedStyle(keyValue);
      }
    })
  }
}
