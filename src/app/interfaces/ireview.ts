import { ReviewType } from "../enums/reviewtype";
import { IReviewCategory, IReviewCategoryResponse } from "./ireviewcategory";
import { IVoteResponse } from "./ivote";
import { LoginUser } from "./user";

export interface IReview {
  id: number;
  title: string;
  reviewType: ReviewType;
  reviewDetails: IReviewDetail[];
  reviewOwner: LoginUser;
  reviewCategory: IReviewCategory;
}
export interface IReviewDetail {
  id: number;
  reviewContent: string;
  description: string;
  votes: IVoteResponse[];
  averageRate: number;
}
export interface IReviewRequest {
  title: string;
  reviewType: ReviewType;
  reviweCategoryId: number;
  reviewDetails: IReviewDetail[];
}
export interface IReviewResponse {
  id: string;
  title: string;
  reviewType: ReviewType;
  reviewDetails: IReviewDetail[];
  reviewOwner: LoginUser;
  reviewCategory: IReviewCategoryResponse;
}
export interface GetAllReviewsResonse {
  count: number;
  pageIndex: number;
  pageSize: number;
  data: IReviewResponse[];
}
