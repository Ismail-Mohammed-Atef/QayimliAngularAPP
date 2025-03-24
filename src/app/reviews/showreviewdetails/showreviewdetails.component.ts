import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimengtoolsModule } from '../../primengtools/primengtools.module';
import { IReviewResponse } from '../../interfaces/ireview';
import { ReviewType } from '../../enums/reviewtype';
import { VoteService } from '../../services/vote.service';
import { SpinnerService } from '../../services/spinner.service';
import { MessageService } from 'primeng/api';
import { IVoteRequest } from '../../interfaces/ivote';
import { TranslateService } from '@ngx-translate/core';
import { ReviewService } from '../../services/review.service';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-showreviewdetails',
  standalone: true,
  imports: [PrimengtoolsModule, ClipboardModule],
  templateUrl: './showreviewdetails.component.html',
  styleUrls: ['./showreviewdetails.component.css']
})
export class ShowreviewdetailsComponent implements OnInit, OnDestroy {
  addingComment: { [key: string]: string } = {};
  addingVote: { [key: string]: number } = {};
  IsLoadingSavingVote: { [key: string]: boolean } = {};
  ReviewType = ReviewType;
  reviewDetails!: IReviewResponse;
  reviewLink: string = "www.tazkty.com/473847";

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private route: ActivatedRoute,
    private _VoteService: VoteService,
    private _ReviewService: ReviewService,
    private spinner: SpinnerService,
    private messageService: MessageService,
    private _TranslateService: TranslateService
  ) { }

  ngOnInit(): void {
    console.log(this.ref);
    console.log(this.config);
    console.log(this.config.data);
    // Check if the component is opened as a dialog or via a route
    if (this.config.data != null && this.config.data != undefined) {
      // Case: Dialog mode
      this.reviewDetails = this.config.data;
      this.reviewLink = `${window.location.origin}/review/${this.reviewDetails.id}`;
      this.sortReviewDetailsByAverageRate();
    } else {
      // Case: Route mode
      this.route.paramMap.subscribe(params => {
        const reviewId: number = +params.get('mostafa')!;
        if (reviewId) {
          this.loadReviewDetails(reviewId);
        }
      });
    }
  }

  loadReviewDetails(reviewId: number): void {
    // Fetch review details by ID (implement this in your VoteService or another relevant service)
    this._ReviewService.getReviewById(reviewId).subscribe({
      next: (data: IReviewResponse) => {
        this.reviewDetails = data;
        this.reviewLink = `${window.location.origin}/review/${this.reviewDetails.id}`;
        console.log(this.reviewDetails);
        this.sortReviewDetailsByAverageRate();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this._TranslateService.instant("MoCommon.ReviewNotFound") });
      }
    });
  }

  sortReviewDetailsByAverageRate(): void {
    if (this.reviewDetails && this.reviewDetails.reviewDetails) {
      this.reviewDetails.reviewDetails.sort((a, b) => b.averageRate - a.averageRate);
    }
  }

  close() {
    if (this.ref) {
      this.ref.close();
    }
  }

  addNewVote(detailId: number) {
    if (this.addingVote[detailId] != null && this.addingVote[detailId] > 0 && this.addingComment[detailId] != null && this.addingComment[detailId] !== '') {
      this.IsLoadingSavingVote[detailId] = true;
      this.spinner.show();
      const voteRequest: IVoteRequest = {
        rate: this.addingVote[detailId],
        comment: this.addingComment[detailId],
        reviewDetailId: detailId
      };

      // Call the VoteService to submit the vote
      this._VoteService.addNewVote(voteRequest).subscribe({
        next: (response) => {
          this.reviewDetails = response;
          this.sortReviewDetailsByAverageRate(); // Sort again if needed
          this.IsLoadingSavingVote[detailId] = false;
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this._TranslateService.instant("MoCommon.AddingVote") });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this._TranslateService.instant("MoCommon.AddingVoteError") });
          this.IsLoadingSavingVote[detailId] = false;
          this.spinner.hide();
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this._TranslateService.instant("MoCommon.NoStarChoosen") });
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  copylink() {
    this.messageService.add({ severity: 'success', summary: this._TranslateService.instant("MoCommon.CopyToClipboard"), detail: this._TranslateService.instant("MoCommon.SuccessfullyCopyToClipboard") });
  }
}
