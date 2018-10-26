import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], terms: string): any[] {
    console.log('SearchPipe'+terms);
    if(!items) return [];
    if(!terms) return items;
    return items.filter( it => {
      console.log('items'+it);
      return it.adi.includes(terms); // only filter country name
    });
  }
}
