import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DockModule } from 'primeng/dock';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        CardModule,
        DividerModule,
        PasswordModule,
        DockModule,
        ProgressSpinnerModule,
        MessageModule,
        ToastModule,
        TranslateModule,
        MenubarModule,
        AvatarModule,
        RadioButtonModule,
        InputTextareaModule,
        PaginatorModule,
        TableModule,
        FileUploadModule,
        DynamicDialogModule,
        ConfirmDialogModule,
        RatingModule,
        ScrollPanelModule
    ],
    exports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        CardModule,
        DividerModule,
        PasswordModule,
        DockModule,
        ProgressSpinnerModule,
        MessageModule,
        ToastModule,
        TranslateModule,
        MenubarModule,
        AvatarModule,
        RadioButtonModule,
        InputTextareaModule,
        PaginatorModule,
        TableModule,
        FileUploadModule,
        DynamicDialogModule,
        ConfirmDialogModule,
        RatingModule,
        ScrollPanelModule,

    ], providers: [MessageService, DialogService, ConfirmationService, DynamicDialogRef,DynamicDialogConfig ],
})
export class PrimengtoolsModule { }
