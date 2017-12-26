import {Injectable} from '@angular/core';

import {Subject} from 'rxjs/Subject';

@Injectable()
export class DashboardService {

  private searchKey = new Subject<string>();

  constructor() {
  }

  setSearchKey(key) {
    this.searchKey.next(key);
  }

  getSearchKey() {
    return this.searchKey;
  }

}
