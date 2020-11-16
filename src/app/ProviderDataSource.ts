import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Provider } from './Provider';

export class ProviderDataSource extends DataSource<any> {
  constructor(private searchService: SearchService) {
    super();
  }
  connect(): Observable<Provider[]> {
    return this.searchService.getProviders();
  }
  disconnect() {}
}
