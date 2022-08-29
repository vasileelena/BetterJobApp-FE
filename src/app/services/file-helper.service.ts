import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileHelperService {

  constructor(private http: HttpClient) { }

  downloadFile(route: string): Observable<HttpResponse<Blob>> {
    return this.http.get(route, {responseType: 'blob', observe: 'response'});
  }

  /**
   * Save a file from the blob
   * @param blob the blob received from the backend
   * @param filename the filename of the downloaded file
   */
  saveFile(blob: any, filename: string) : Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
      subscriber.complete();
    });
  }
}
