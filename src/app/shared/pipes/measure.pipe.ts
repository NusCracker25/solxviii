import { Pipe, PipeTransform } from '@angular/core';
/*
 * converts the unit from SI to a different one specified by parameter
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/

@Pipe({
  name: 'measure'
})
export class MeasurePipe implements PipeTransform {

  transform(value: any, domain: string , system: string): any {
    console.log('value: ' + value + ' is in domain: ' + domain + ' to be converted to system ' + system);
    return 'something shall be done on ' + value;
  }

}
