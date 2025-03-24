import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IVoteRequest } from '../interfaces/ivote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

    voteURL: string = `${environment.apiUrl}/Votes`;
  
    constructor(private _HttpClient: HttpClient) {
  
    }
    addNewVote(voteData: IVoteRequest): Observable<any> {
      return this._HttpClient.post(this.voteURL, voteData)
    }
    getAllReviewCategories(numOfPage?: number, pageNum?: number, reviewTitle?: string, sortBy?: string): Observable<any> {
      let queryString = `${this.voteURL}?`;
  
      if (numOfPage != null) {
        queryString += `PageSize=${numOfPage}&`;
      }
  
      if (pageNum != null) {
        queryString += `PageIndex=${pageNum}&`;
      }
  
      if (sortBy) {
        queryString += `sort=${sortBy}&`;  // PostDateAsc - PostDateDesc - TitleAsc - TitleDesc
      }
  
      if (reviewTitle) {
        queryString += `Search=${reviewTitle}&`;
      }
  
      // Remove any trailing '&' or '?' from the query string
      queryString = queryString.replace(/[&?]$/, '');
  
      console.log(queryString);
  
      return this._HttpClient.get(queryString);
    }
  
    getVoteById(id: number): Observable<any> {
      return this._HttpClient.get(`${this.voteURL}/${id}`);
    }
  }
  