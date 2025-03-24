export interface IReviewCategory {
  nameEN: string;
  nameAR: string;
}
export interface IReviewCategoryResponse extends IReviewCategory {
  id: number;
  name:string;
}

export interface GetAllReviewCategoriesResonse {
  count: number;
  pageIndex: number;
  pageSize: number;
  data: IReviewCategoryResponse[];
}
