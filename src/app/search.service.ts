import { Injectable } from '@angular/core';
import { Provider } from './Provider';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //here is the endpoint to query for data
  private searchUrl = 'https://data.medicare.gov/resource/4pq5-n9py.json?$select=federal_provider_number,provider_name,provider_address,provider_city,provider_state,provider_zip_code,provider_phone_number';

  //provider search object
  provider: Provider;
  //our current page number for result set
  pagenum = "0";
  //our page size for result set
  pagesize = "100";
  //default sort by
  sortby = "federal_provider_number";
  //default sort order
  sortorder = "asc";

  //constructor
  constructor(private http: HttpClient) { }


  getProviders(): Observable<Provider[]> {

    console.log("calling search.service getProviders()...");

    let params = new HttpParams();
    try {
      //the api allows us to limit the result set size and specify a pagenumber, but I commented these for now.
      //params = params.append('$limit', this.pagesize);
      //params = params.append('$offset', this.pagenum);

      params = params.append('$order', this.sortby + " " + this.sortorder);
    } catch (error) {
      //console.error("issue assigning limit,offset,order params:", error)
    }
    try {
      if (this.provider.provider_zip_code.length > 0) {
        params = params.append('provider_zip_code', this.provider.provider_zip_code.trim());
      }
    } catch (error) {
      //console.error("issue reading provider_zip_code:", error);
    }
    try {
      if (this.provider.federal_provider_number.length > 0) {
        params = params.append('federal_provider_number', this.provider.federal_provider_number.trim());
      }
    } catch (error) {
      //console.error("error assigning federal_provider_number params in getProviders in search.service:", error);
    }

    try {
      if (this.provider.provider_name.length > 0) {
        //wildcard search on the name
        params = params.append('$where', "provider_name like \"%" + this.provider.provider_name.trim().toUpperCase() + "%\"");
      }
    } catch (error) { //console.error("error assigning provider_name params:", error);
    }


    console.log("getProviders() finished executing:" + params);


    return this.http.get<Provider[]>(this.searchUrl, { params: params })
      .pipe(
        catchError(this.handleError<Provider[]>('getProviders', []))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
