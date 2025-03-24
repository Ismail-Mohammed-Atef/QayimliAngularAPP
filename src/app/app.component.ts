import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { TranslateConfigModule } from './translate-config/translate-config.module';
import { PrimengtoolsModule } from './primengtools/primengtools.module';
import { DockerComponent } from "./docker/docker.component";
import { SpinnerService } from './services/spinner.service';
import { environment } from '../environments/environment';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [PrimengtoolsModule, DockerComponent, RouterOutlet, NavbarComponent, FooterComponent, CommonModule, TranslateConfigModule,],
    providers: [
        TranslateService,
        MessageService
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'Qayimli';
    isLoading: boolean = false;
    MainLanguage: string = 'ar';
    IsLoadingChangeLanguage: boolean = false;
    @Output() colorChanged: EventEmitter<void> = new EventEmitter<void>();
    constructor(private meta: Meta,
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService,
        private _translateService: TranslateService,
        private spinnerService: SpinnerService,
        private messageService: MessageService,
        @Inject(PLATFORM_ID) private platformId: any) {
        this.loadMainColor();
        this.loadLanguage();
    }

    ngOnInit(): void {
        this.meta.addTag({ name: 'description', content: 'Welcome to Qayimli.' });
        this.meta.addTag({ name: 'keywords', content: 'Qayimli, قيملى, قيم لى' });
    
        // Open Graph Meta Tags
        this.meta.addTag({ property: 'og:title', content: 'Qayimli - Home' });
        this.meta.addTag({ property: 'og:description', content: 'Welcome to Qayimli.' });
        const fullImageUrl = `${window.location.origin}/assets/images/Logo2.png`;
        this.meta.addTag({ property: 'og:image', content: fullImageUrl });
        console.log(environment.apiUrl);
        this.spinnerService.spinner$.subscribe(isLoading => {
            setTimeout(() => {
                this.isLoading = isLoading;
            })
        });
        if (isPlatformBrowser(this.platformId)) {
            this.primengConfig.ripple = true;
            document.documentElement.style.fontSize = '14px';

            this.layoutService.config = {
                ripple: false,
                inputStyle: 'outlined',
                menuMode: 'static',
                colorScheme: 'light',
                theme: 'mdc-light-deeppurple',
                scale: 14
            };
        }
    }


    loadLanguage() {
        let currentlang = localStorage.getItem('Language');
        this.MainLanguage = currentlang == null ? this.browserLang() : currentlang;
        localStorage.setItem('Language', this.MainLanguage);
        this._translateService.use(this.MainLanguage);

    }

    changeLanguage(selectedLang: string) {
        if (!this.IsLoadingChangeLanguage) {
            this.IsLoadingChangeLanguage = true;
            let currentLang = selectedLang || this.MainLanguage === 'en' ? 'ar' : 'en';
            localStorage.setItem('Language', currentLang);
            this._translateService.use(currentLang);
            this.loadLanguage();
            this.IsLoadingChangeLanguage = false;
            this.messageService.add({
                severity: 'success',
                summary: this._translateService.instant('MoToasterMessage.Success'),
                detail: this._translateService.instant('MoToasterMessage.UpdateLanguague')
            });
        }
    }

    browserLang(): string {
        const lang = window.navigator.language.toLowerCase().substr(0, 2);
        return lang === 'en' || lang === 'ar' ? lang : 'en';

        return 'en';
    }

    saveMainColor(event: MouseEvent) {
        const target = event.target as HTMLElement;
        let dataColor: any = target.getAttribute('data-color');
        let rgbMoColor = this.hexToRgb(dataColor);

        if (rgbMoColor) {
            this.saveCssVariableLocalStorage('--maincolor1', rgbMoColor);
        } else {
            this.saveCssVariableLocalStorage('--maincolor1', 'rgb(238, 183, 0)');
        }
        this.loadMainColor();
    }

    saveCssVariableLocalStorage(variableName: string, value: string) {

        localStorage.setItem(variableName, value);

    }

    getCssVariableLocalStorage(variableName: string): string | null {

        return localStorage.getItem(variableName);
        return null;
    }

    loadMainColor() {

        const maincolor1 = this.getCssVariableLocalStorage('--maincolor1');
        if (maincolor1) {
            document.documentElement.style.setProperty('--maincolor1', maincolor1);
        } else {
            document.documentElement.style.setProperty('--maincolor1', 'rgb(238, 183, 0)');
        }
        this.colorChanged.emit();

    }

    hexToRgb(hex: string) {
        hex = hex.replace('#', '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }
    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }
}
