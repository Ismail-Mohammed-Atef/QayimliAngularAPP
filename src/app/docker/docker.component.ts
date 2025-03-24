import { Component, EventEmitter, Inject, OnInit, PLATFORM_ID, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem } from 'primeng/api';
import $ from 'jquery';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { AppComponent } from '../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-docker',
  standalone: true,
  imports: [PrimengtoolsModule],
  templateUrl: './docker.component.html',
  styleUrl: './docker.component.css'
})
export class DockerComponent implements OnInit {

  dockItems!: MenuItem[];

  constructor(public _TranslateService: TranslateService, public _AppComponent: AppComponent) {
  }

  ngOnInit() {
    this.setDockItems();

    // Reload dock items when the language changes
    this._TranslateService.onLangChange.subscribe(() => {
      this.setDockItems();
    });

  }
  setDockItems() {
    this.dockItems = [
      /*       {
              label: 'Whatsapp',
              tooltipOptions: {
                tooltipLabel: 'Whatsapp',
                tooltipPosition: 'bottom',
                positionTop: -15,
                positionLeft: 15,
                showDelay: 100
              },
              url: 'https://wa.me/+201008161832',
              icon: '/assets/images/whatsapp.png'
            }, */
      {
        label: 'Facebook',
        tooltipOptions: {
          tooltipLabel: 'Facebook',
          tooltipPosition: 'bottom',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 100
        },
        url: 'https://www.facebook.com/Qayimli',
        icon: '/assets/images/facebook.svg'
      },
      {
        label: this._TranslateService.instant('MoCommon.NewReview'),
        tooltipOptions: {
          tooltipLabel: this._TranslateService.instant('MoCommon.AddNewReview'),
          tooltipPosition: 'bottom',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 100
        },
        url: '/addnewreview',
        icon: 'pi pi-fw pi-th-large',
        target: "_parent"
      },
      {
        label: 'Colors',
        tooltipOptions: {
          tooltipLabel: 'Colors',
          tooltipPosition: 'bottom',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 100
        },
        command: (event) => {
          const settingsBox = $(".settings-box");
          if (settingsBox.css('width') === '200px') {
            settingsBox.fadeOut(500).css("width", "50px");
          } else {
            settingsBox.css("width", "200px").fadeIn(1000);
          }
        },
        icon: '/assets/images/palette.png'
      },
      /*   {
          label: 'GitHub',
          tooltipOptions: {
            tooltipLabel: 'GitHub',
            tooltipPosition: 'bottom',
            positionTop: -15,
            positionLeft: 15,
            showDelay: 100
          },
          url: 'https://github.com/MostafaPro0/',
          icon: '/assets/images/github.svg'
        },
        {
          label: 'LinkedIn',
          tooltipOptions: {
            tooltipLabel: 'LinkedIn',
            tooltipPosition: 'bottom',
            positionTop: -15,
            positionLeft: 15,
            showDelay: 100
          },
          url: 'https://www.linkedin.com/in/mostafapro/',
          icon: '/assets/images/linked.svg'
        } */
    ];
  }
}