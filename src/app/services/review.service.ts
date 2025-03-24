import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewURL: string = `${environment.apiUrl}/Reviews`;

  constructor(private _HttpClient: HttpClient) {

  }
  addNewReview(reviewData: IReview): Observable<any> {
    return this._HttpClient.post(this.reviewURL, reviewData)
  }
  getAllReviews(numOfPage?: number, pageNum?: number, reviewTitle?: string, reviewCategoryId?: number, sortBy?: string): Observable<any> {
    let queryString = `${this.reviewURL}?`;

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

    if (reviewCategoryId) {
      queryString += `ReviewCategoryId=${reviewCategoryId}&`;
    }
    queryString = queryString.replace(/[&?]$/, '');
    console.log(queryString);
    return this._HttpClient.get(queryString);
  }
  getReviewById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.reviewURL}/${id}`);
  }
}
