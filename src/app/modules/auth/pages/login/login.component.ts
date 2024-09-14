import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../auth.service";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  // styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    form !: FormGroup;
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly builder: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.buildForm();
    }

    buildForm(): FormGroup {
        return this.builder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login(){
        if(!this.form.valid){
            this.form.markAllAsTouched();
            return;
        }
        this.authService.login(this.form.value).pipe(
            catchError(error => {
                console.error('Login error', error);
                return of(error);
            })
        ).subscribe(response => {
            console.log('Logged in successfully', response);
            // console.log(localStorage.getItem('access_token'));
            this.router.navigate(['/dashboard']);
        });

        // this.authService.getCsrfToken().subscribe(()=>{
        //
        //
        // })



    }
}
