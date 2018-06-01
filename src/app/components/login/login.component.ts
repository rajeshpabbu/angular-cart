import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, GlobalLoaderService, AuthenticationService } from '../../services/index';
import { User } from 'app/_models';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private als: AlertService,
        private gls: GlobalLoaderService
    ) { }

    ngOnInit() {
        // reset login status
        console.log('init called');
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.gls.globalLoader.isLoading = false;    

    }

    login() {
        this.gls.globalLoader.isLoading = true;    
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.gls.globalLoader.isLoading = false;    
                    if (data) {
                        this.als.clearQueue();
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.als.updateAlertQueue({message:"<strong>Sorry. We were unable to find your account with the information you provided</strong>", type:"danger"});
                    }
                },
                error => {
                    console.log(error)
                    this.gls.globalLoader.isLoading = false;    
                });
    }
}
