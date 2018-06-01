import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fakeBackendProvider } from './_helpers/index';
import { routing } from './app.routing';

import { MyFilterPipe } from './filters/filter-todos';
import { ToDoService, GlobalLoaderService, UserService, AlertService, AuthenticationService } from './services/index';

import { AppComponent, TodoListComponent, TodoInputComponent, TodoAlertComponent, TodoLoaderComponent, RegisterComponent, LoginComponent, UsersComponent, NavBarComponent} from './components/index';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    MyFilterPipe,
    TodoInputComponent,
    TodoAlertComponent,
    TodoLoaderComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [
    MyFilterPipe, 
    ToDoService,
    GlobalLoaderService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }