import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private toastr: ToastrService, private router: Router) {}

  showPassword: string = 'password';
  disableButton: boolean = false;
  @ViewChild('logInForm')
  form!: NgForm;

  ngOnInit() {
    // Check for authentication
    const token = localStorage.getItem('openSkyToken');
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  togglePassword() {
    // Password visibility
    this.showPassword = this.showPassword === 'text' ? 'password' : 'text';
  }

  handleLogIn() {
    // On log in button click
    this.disableButton = true;
    if (
      this.form.value.loginEmail === 'admin@gmail.com' &&
      this.form.value.loginPassword === 'admin'
    ) {
      localStorage.setItem('openSkyToken', this.form.value.loginEmail);
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard');
        this.toastr.success('Login successful');
        this.disableButton = false;
      }, 1000);
    } else {
      this.toastr.error('Invalid username or password');
      this.disableButton = false;
    }
  }
}
