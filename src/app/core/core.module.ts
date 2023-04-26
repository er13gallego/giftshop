import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

import { throwIfAlreadyLoaded } from './throwIfAlreadyLoaded';
import { ErrorHandlerService } from './services/error-handler.service';
import { AuthService, AuthState } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { RedirectService } from './services/redirect.service';
import { API_URL } from './api-url.token';
import { ASSETS_URL } from './assets-url.token';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MessageBoxService, ModalMessageComponent, ModalConfirmComponent } from './services/message-box.service';
import { DownloadService } from './services/download.service';
import { ConfigService } from './services/config.service';
import { LoadingService } from './services/loading.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appInitializerFn = (configService: ConfigService) => {
  return () => {
    return configService.load();
  };
};

const apiUrlFactory = (configService: ConfigService) => {
  return configService.apiUrl;
};

const assetsUrlFactory = (configService: ConfigService) => {
  return configService.assetsUrl;
};

const entryComponents: any[] = [
  // Add entry components here
  ModalConfirmComponent,
  ModalMessageComponent
];

@NgModule({
  declarations: [...entryComponents],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
  ],
  entryComponents: [...entryComponents],
  providers: [
    ErrorHandlerService,
    NotificationService,
    RedirectService,
    AuthService,
    AuthState,
    AuthGuard,
    MessageBoxService,
    DownloadService,
    ConfigService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: API_URL,
      // useValue: environment.apiUrl,
      useFactory: apiUrlFactory,
      deps: [ConfigService]
    },
    {
      provide: ASSETS_URL,
      // useValue: environment.apiUrl,
      useFactory: assetsUrlFactory,
      deps: [ConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
