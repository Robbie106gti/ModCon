import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse2',
  pure: false
})

export class ReversePipe2 implements PipeTransform {
  transform (values: any) {
    if (values) {
      return values.reverse();
    }
  }
}
