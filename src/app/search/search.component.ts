import { Component, AfterViewInit,OnInit,ViewChild } from '@angular/core';
import { Provider } from '../Provider';
import { ProviderDataSource } from '../ProviderDataSource';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router';
import { Router } from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource} from '@angular/material/table';
import { catchError, map, tap } from 'rxjs/operators';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements AfterViewInit, OnInit {

  
  //our current page number for result set
  pagenum = "0";
  //our page size for result set
  pagesize = "100";
  //default sort by
  sortby = "federal_provider_number";
  //defaultl sort order
  sortorder = "asc";

  //default search object, prepopulated for debugging
  provider: Provider = { "federal_provider_number": "", "provider_name": "", "provider_address": "", "provider_city": "", "provider_state": "", "provider_zip_code": "", "provider_phone_number": "" };

  //our list of providers that will contain search results
  providers: Provider[];

  //column headers for our mat-table
  displayedColumns = ["federal_provider_number", "provider_name", "provider_address", "provider_city", "provider_state", "provider_zip_code", "provider_phone_number"];
  
  //execute search function when UI button clicked
  executeSearch() {

    console.log("executeSearch()");
    var queryString = "";
    var n = p = q = r = "";

    try {
      var n = encodeURIComponent(this.provider.provider_name.trim());
    } catch (error) {
      //console.error("error in executeSearch:" + error);
    }
    try {
      var p = encodeURIComponent(this.provider.federal_provider_number.trim());
    } catch (error) {
      //console.error("error in executeSearch:" + error);
    }
    try {
      var q = encodeURIComponent(this.provider.provider_zip_code.trim());
    } catch (error) {
     // console.error("error in executeSearch:" + error);
    }
    try {
      var r = encodeURIComponent("" + this.pagenum.trim());
    } catch (error) {
    //  console.error("error in executeSearch:" + error);
    }

    queryString = "?n=" + n + "&p=" + p + "&q=" + q + "&r=" + r;
    this.router.navigateByUrl("/" + queryString);

    this.getProviders();
    console.log("executeSearch() has completed." + queryString);

  }

  //get our list of providers from dataservice
  getProviders(): void {
    try {
      
      this.searchService.provider = this.provider;
      this.searchService.sortby = this.sortby;
      this.searchService.sortorder = this.sortorder;

    } catch (error) {
      console.error("error in getProviders():" + error);
    }

    console.log("provname:" + this.provider.provider_name);
    
    this.searchService.getProviders()
      .subscribe(providers => this.providers = providers);

  }


 //respond to column sort events
  sortChange(e) {
    this.sortorder = this.sort.direction;
    this.sortby = this.sort.active;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //inject our dependencies in constructor
  constructor(
    private location: Location,
    private router:Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  //clear our search object
  clearSearch(): void {
    this.provider.federal_provider_number = "";
    this.provider.provider_name = "";
    this.provider.provider_zip_code = "";
    this.pagenum = "0";
    this.providers = [];//clear our results
    this.router.navigateByUrl("/");

  }


  ngAfterViewInit() {

    //// reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sort.sortChange.pipe(
        tap(() => this.getProviders())
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.getProviders())
      )
      .subscribe();
         
  }

  ngOnInit(): void {
    try {
      //check for url parameters and refresh bookmark results
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.provider.provider_name = urlParams.get('n');
      this.provider.federal_provider_number = urlParams.get('p');
      this.provider.provider_zip_code = urlParams.get('q');
      this.pagenum = urlParams.get('r');

    } catch (error) {
      console.error("error loading query string:", error);
    }

    this.getProviders();

  }

}
