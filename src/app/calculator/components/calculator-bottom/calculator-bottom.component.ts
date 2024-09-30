import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-bottom',
  standalone: true,
  imports: [  ],
  templateUrl: './calculator-bottom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:'./calculator-bottom.component.css',
  host: {
    'class':"w-1/4 border-r border-b border-indigo-400",
    '[class.w-2/4]':'isDoubleSize()',
    '[class.w-1/4]':'!isDoubleSize()'
  }
})
export class CalculatorBottomComponent implements OnInit {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isCommand = input(false,{
    transform:(value:boolean | string )=>{
      if (typeof value === 'string') {
        return value === '';
    } else {
        return value;
    }  
    }
  });
  public isDoubleSize = input(false,{ 
    transform:(value:boolean | string )=>{
      if (typeof value === 'string') {
        return value === '';
    } else {
        return value;
    }  
    }
  });
  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }
  ngOnInit(): void {
  } 
  handleClick(){
    if(!this.contentValue()?.nativeElement){
      return
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }
keyBoardPressedStyle(key:string){
  if(!this.contentValue()){
    return
  }
  const value = this.contentValue()!.nativeElement.innerText;

  if(value.trim() !== key){
    return
  }
  this.isPressed.set(true);
  setTimeout(() => {
  this.isPressed.set(false);
  }, 100);
}
}
