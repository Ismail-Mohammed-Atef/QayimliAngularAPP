import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LayoutService } from '../services/layout.service';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { LoginUser } from '../interfaces/user';
import { TranslateService } from '@ngx-translate/core';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PrimengtoolsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(
    public _AuthService: AuthService,
    public layoutService: LayoutService,
    public _AppComponent: AppComponent,
    private _Router: Router,
    private _translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.initMenuItems();

    this._translateService.onLangChange.subscribe(() => {
      this.initMenuItems();
    });
    this.isInAdminModule();
  }

  initMenuItems() {
    this.items = [
      {
        label: this._translateService.instant('MoCommon.Home'),
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: this._translateService.instant('MoCommon.AddNewReview'),
        icon: 'pi pi-fw pi-th-large',
        routerLink: '/addnewreview',
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: this._translateService.instant('MoCommon.AboutUS'),
        icon: 'pi pi-fw pi-face-smile',
        routerLink: '/aboutus',
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: this._translateService.instant('MoCommon.ContactUS'),
        icon: 'pi pi-fw pi-envelope',
        routerLink: '/contactus',
        routerLinkActiveOptions: {
          exact: true
        }
      }
    ];
  }

  isInAdminModule(): boolean {
    return this._Router.url.includes('adminpanel');
  }

  logOut(): void {
    this._AuthService.logout();
  }
}
