import { Pipe, PipeTransform } from '@angular/core';

/**
 * A class for the FixedPipe
 */
@Pipe({
  name: 'fixed'
})
export class FixedPipe implements PipeTransform {
  /**
   * Takes a given number and shows a set number of decimal points
   * @param value Decimal number to reduce.
   * @param args Amount of decimal points to show.
   */
  transform(value: number, args: number = 1): string {
    return value.toFixed(args);
  }

}
