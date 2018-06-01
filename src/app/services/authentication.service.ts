import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: HttpClient,
        private us: UserService,
        private router: Router
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                if (user) {
                    const currentUser = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    }
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.us.updateCurrentUer(currentUser);
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.us.updateCurrentUer({});
        this.router.navigate(['/login']);
    }
}