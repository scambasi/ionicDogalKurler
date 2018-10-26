import { Icindekiler } from "../modals/icindekiler";
import { Injectable } from "@angular/core";

@Injectable()
export class AlisVerisListService {
  private icindekiler: Icindekiler[] = [];
  constructor() {
  }

  addItem(name: string, amount: string) {
    console.log('AlisVerisListService:addItem')
    this.icindekiler.push(new Icindekiler('1',name, amount));
  }

  addItems(items: Icindekiler[]) {
    console.log('AlisVerisListService:addItems')
    this.icindekiler.push(...items);
  }

  getItems() {
    console.log('AlisVerisListService:getItems')
    return this.icindekiler.slice();
  }

  removeItem(index: number) {
    console.log('AlisVerisListService:removeItem')
    this.icindekiler.splice(index, 1);
  }
 

}
 