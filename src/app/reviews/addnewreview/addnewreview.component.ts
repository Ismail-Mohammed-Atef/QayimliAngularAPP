import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimengtoolsModule } from '../../primengtools/primengtools.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReviewType } from '../../enums/reviewtype';
import { ReviewService } from '../../services/review.service';
import { SpinnerService } from '../../services/spinner.service';
import { GetAllReviewCategoriesResonse } from '../../interfaces/ireviewcategory';
import { ReviewcategoryService } from '../../services/reviewcategory.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addnewreview',
  standalone: true,
  imports: [PrimengtoolsModule, ReactiveFormsModule],
  templateUrl: './addnewreview.component.html',
  styleUrls: ['./addnewreview.component.css']
})
export class AddnewreviewComponent implements OnInit {
  reviewTypes = Object.values(ReviewType);
  reviewCategories?: GetAllReviewCategoriesResonse;
  ReviewType = ReviewType;
  addNewReviewForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    reviewType: new FormControl(null, [Validators.required]),
    reviewCategoryId: new FormControl(null, [Validators.required]),
    reviewContent: new FormControl(null, [Validators.required]),
    description: new FormControl('')
  });
  reviewDetails: { ReviewContent: string; Description?: string }[] = [];
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private _ReviewService: ReviewService,
    private _ReviewcategoryService: ReviewcategoryService,
    private messageService: MessageService,
    private _SpinnerService: SpinnerService,
    private _ConfirmationService: ConfirmationService,
    private _TranslateService: TranslateService
  ) { }
  ngOnInit() {
    this.getAllReviewCategories();
  }
  getAllReviewCategories() {
    this._SpinnerService.show();
    this._ReviewcategoryService.getAllReviewCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.reviewCategories = response;
        console.log(this.reviewCategories);
        this._SpinnerService.hide();

      },
      error: (error) => {
        console.log(error);
        this._SpinnerService.hide();
      }
    });
  }
  IsLoading: boolean = false;
  RegisterError: string = "";
  jpegAndPngFileType: string = 'image/jpg, image/jpeg, image/png';

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  AddNewReview() {
    const reviewTypeControl = this.addNewReviewForm.get('reviewType');
    const reviewCategoryControl = this.addNewReviewForm.get('reviewCategory');
    const reviewContentControl = this.addNewReviewForm.get('reviewContent');
    const descriptionControl = this.addNewReviewForm.get('description');
    console.log(reviewTypeControl?.value);
    console.log(reviewCategoryControl?.value);
    console.log(reviewContentControl?.value);
    console.log(descriptionControl?.value);

    if (reviewTypeControl?.valid) {
      const reviewType = reviewTypeControl.value;
      if (reviewType === ReviewType.ImageFile && !this.imageSrc) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Image file is required' });
        return;
      } else if (reviewType === ReviewType.ImageLink) {
        const reviewContent = reviewContentControl?.value;
        if (!reviewContentControl?.valid) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Review content is required for Image Link' });
          return;
        }
        // Check if the URL is a valid image URL
        const urlPattern = /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i; // Regular expression to match image URLs
        if (!urlPattern.test(reviewContent)) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid image URL format. Please provide a valid image URL.' });
          return;
        }
      } else if (reviewType === ReviewType.Text && !reviewContentControl?.valid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Review content is required for Text' });
        return;
      }
      const description = descriptionControl?.value;

      // Handle Image File review
      if (reviewType === ReviewType.ImageFile && this.imageSrc) {
        this.reviewDetails.push({
          ReviewContent: this.imageSrc as string, // Use Base64 image data
          Description: description
        });
      } else if (reviewType === ReviewType.ImageLink && reviewContentControl?.valid) {
        // Handle Image Link review
        const reviewContent = reviewContentControl?.value;
        this.reviewDetails.push({
          ReviewContent: reviewContent, // URL of the image
          Description: description
        });
      } else if (reviewType === ReviewType.Text) {
        // Handle Text review
        const reviewContent = reviewContentControl?.value;
        this.reviewDetails.push({
          ReviewContent: reviewContent,
          Description: description
        });
      }

      // Reset form fields
      this.addNewReviewForm.get('reviewContent')?.reset();
      this.addNewReviewForm.get('description')?.reset();
      this.selectedFile = null; // Reset the selected file
      this.imageSrc = null;
    }
  }

  RemoveReview(index: number) {
    this.reviewDetails.splice(index, 1);
  }

  SubmitAllReviews() {
    if (this.reviewDetails.length > 0) {
      this.IsLoading = true;
      this._SpinnerService.show();
      this._ReviewService.addNewReview({
        ...this.addNewReviewForm.value,
        reviewDetails: this.reviewDetails
      }).subscribe({
        next: (response) => {
          this.IsLoading = false;
          this._SpinnerService.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this._TranslateService.instant("MoCommon.ReviewsSubmit") });
          this.reviewDetails = [];
        },
        error: (error) => {
          this.RegisterError = error.message;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this._TranslateService.instant("MoCommon.ReviewsSubmitError") });
          this.IsLoading = false;
          this._SpinnerService.hide();
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this._TranslateService.instant("MoCommon.NoReviewsToSubmit") });
    }
  }
  confirmReviewChange(newReviewType: any) {
    var oldReviewType = this.addNewReviewForm.get('reviewType')?.value;
    console.log(newReviewType);
    console.log(oldReviewType);
    if (this.reviewDetails.length > 0 && newReviewType !== oldReviewType) {
      this._ConfirmationService.confirm({
        message: 'Are you sure you want to Change Review Type after added Review Details ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reviewDetails = [];
          this.addNewReviewForm.get('reviewType')?.setValue(newReviewType);
          this.resetReviewSpecificFormFields(newReviewType);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have selected a review type and All old Details deleted.' });
        },
        reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled the selection.' });
        }
      });
    }
  }
  resetReviewSpecificFormFields(selectedReviewType: ReviewType) {
    switch (selectedReviewType) {
      case ReviewType.ImageFile:
        this.selectedFile = null;
        this.imageSrc = null;
        break;
      case ReviewType.ImageLink:
        this.addNewReviewForm.get('reviewContent')?.reset();
        break;
      case ReviewType.Text:
        this.addNewReviewForm.get('reviewContent')?.reset();
        break;
    }
  }
}
