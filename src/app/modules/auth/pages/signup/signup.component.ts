import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form !: FormGroup;

  constructor(
      private readonly authService: AuthService,
      private readonly router: Router,
      private readonly builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  signup(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.register(this.form.value).subscribe(response => {
      console.log(response.status);
      if(response.status === 200) {
        console.log('Registered successfully', response);
        this.router.navigate(['/dashboard']);
      }

    });
  }

}
