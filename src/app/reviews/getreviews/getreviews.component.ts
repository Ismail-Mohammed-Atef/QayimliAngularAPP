import { Component, DestroyRef, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { SpinnerService } from '../../services/spinner.service';
import { PrimengtoolsModule } from '../../primengtools/primengtools.module';
import { GetAllReviewsResonse, IReviewResponse } from '../../interfaces/ireview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShowreviewdetailsComponent } from '../showreviewdetails/showreviewdetails.component';
import { TranslateService } from '@ngx-translate/core';
import { ReviewcategoryService } from '../../services/reviewcategory.service';
import { GetAllReviewCategoriesResonse } from '../../interfaces/ireviewcategory';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-getreviews',
  standalone: true,
  imports: [PrimengtoolsModule],
  templateUrl: './getreviews.component.html',
  styleUrl: './getreviews.component.css',
  providers: [DialogService]
})
export class GetreviewsComponent implements OnInit {
  reviewCategories?: GetAllReviewCategoriesResonse;
  selectedReviewCategoryId: number = 0;
  numOfOnePage: number = 5; // Default page size
  allTotalItemsCount: number = 0;
  pageNum: number = 1;
  rowsPerPageOptions: any[] = [5, 8, 10];
  SearchReviewTitle: string = '';
  AllReviews?: GetAllReviewsResonse;
  sortField: string = 'PostDate';
  sortOrder: number = -1;
  sortReview: string = 'PostDateDesc'; // Default to descending

  constructor(private _ReviewcategoryService: ReviewcategoryService, private _ReviewService: ReviewService, private _SpinnerService: SpinnerService, private _DialogService: DialogService, private _TranslateService: TranslateService) { }

  ngOnInit(): void {
    this.sortOrder = -1;
    this.getAllReviewCategories();
    this.getAllReviews();
  }
  getAllReviewCategories() {
    this._SpinnerService.show();
    this._ReviewcategoryService.getAllReviewCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.reviewCategories = response;
        const allOption: { id: number | null; name: string } = {
          id: null,
          name: this._TranslateService.instant('MoCommon.AllCategories')
        };
        this.reviewCategories = {
          ...response,
          data: [allOption, ...response.data]
        };
        console.log(this.reviewCategories);
        this._SpinnerService.hide();

      },
      error: (error) => {
        console.log(error);
        this._SpinnerService.hide();
      }
    });
  }
  loadReviews(event: any) {
    console.log(event);
    const sortType = event.sortOrder === -1 ? "Desc" : "Asc";
    this.sortReview = `${event.sortField}${sortType}`;
    this.pageNum = Math.floor(event.first / event.rows) + 1;
    this.numOfOnePage = event.rows;
    this.getAllReviews();
  }
  onPageSizeChange(event: any) {
    this.numOfOnePage = event.value;
    this.loadReviews({ first: 0, rows: this.numOfOnePage });
  }
  ApplySearch() {
    this.pageNum = 1;
    this.getAllReviews();
  }
  changePage(newPageNum: number): void {
    if (newPageNum > 0) {
      this.pageNum = newPageNum;
      this.getAllReviews();
    }
  }
  private getAllReviews(): void {
    this._SpinnerService.show();
    this._ReviewService.getAllReviews(this.numOfOnePage, this.pageNum, this.SearchReviewTitle, this.selectedReviewCategoryId, this.sortReview)
      .subscribe({
        next: (response) => {
          this.AllReviews = response;
          this.allTotalItemsCount = response.count;
          this._SpinnerService.hide();
        },
        error: (error) => {
          console.error(error);
          this._SpinnerService.hide();
        }
      });
  }
  openReviewDetails(review: IReviewResponse) {
    const ref: DynamicDialogRef = this._DialogService.open(ShowreviewdetailsComponent, {
      data: review,  // Pass the review details to the dialog
      header: this._TranslateService.instant("MoCommon.ReviewDetails"),
      width: '85%',
      closable: true,
      closeOnEscape: true,
      rtl: this._TranslateService.instant("dir") == "rtl" ? true : false
    });
    console.log(ref);

    ref.onClose.subscribe((result) => {
      // Handle dialog close event if needed
    });
  }
}