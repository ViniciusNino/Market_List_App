import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { API } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpProvider {
  retries = 2;

  constructor(readonly http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `${error["error"].response}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  get<T>(url: string, params: any = {}): Observable<T> {
    const fullURL = `${API}${url}`;

    return this.http
      .get<T>(fullURL, { params })
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  post<T>(url: string, params: any): Observable<T> {
    const fullURL = `${API}${url}`;

    return this.http
      .post<T>(fullURL, params)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    const fullURL = `${API}${url}`;

    return this.http
      .delete<T>(fullURL)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  deleteAll<T>(url: string, params: any): Observable<T> {
    const fullURL = `${API}${url}`;

    const result = this.http
      .request<T>("DELETE", fullURL, { body: params })
      .pipe(retry(this.retries), catchError(this.handleError));

    return result;
  }
}
