import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private toastr: ToastrService, private router: Router) {}

  showPassword: string = 'password';
  disableButton: boolean = false;
  @ViewChild('logInForm')
  form!: NgForm;

  togglePassword() {
    this.showPassword = this.showPassword === 'text' ? 'password' : 'text';
  }

  handleLogIn() {
    this.disableButton = true;
    if (
      this.form.value.loginEmail === 'admin@gmail.com' &&
      this.form.value.loginPassword === 'admin'
    ) {
      this.toastr.success('Login successful');
      localStorage.setItem('openSkyToken', this.form.value.loginEmail);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.toastr.error('Invalid username or password');
    }
    this.disableButton = false;
  }
}
