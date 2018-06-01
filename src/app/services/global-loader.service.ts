import { Injectable } from '@angular/core';

@Injectable()
export class GlobalLoaderService {
  globalLoader= { isLoading: true };

  constructor() { }

}
