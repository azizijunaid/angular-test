import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient) { }
  // getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
  //   const href = 'https://api.github.com/search/issues';
  //   const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1
  //     }`;

  //   return this._httpClient.get<GithubApi>(requestUrl);
  // }


  getUserData(pageNumber:number, pageSize: number){
    return this._httpClient.get(`https://reqres.in/api/users?page=${pageNumber}&per_page=${pageSize}`);
  }
}
