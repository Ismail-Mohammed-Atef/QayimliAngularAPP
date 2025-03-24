import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/ireview';


@Injectable({
  providedIn: 'root'
})
export class ReviewcategoryService {
  reviewCategoryURL: string = `${environment.apiUrl}/ReviewCategory`;

  constructor(private _HttpClient: HttpClient) {

  }
  addNewReviewCategory(reviewCategoryData: IReview): Observable<any> {
    return this._HttpClient.post(this.reviewCategoryURL, reviewCategoryData)
  }
  getAllReviewCategories(numOfPage?: number, pageNum?: number, reviewTitle?: string, sortBy?: string): Observable<any> {
    let queryString = `${this.reviewCategoryURL}?`;

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

  getReviewCategoryById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.reviewCategoryURL}/${id}`);
  }
}
