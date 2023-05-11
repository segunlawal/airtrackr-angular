import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css'],
})
export class ErrorpageComponent {
  constructor(private router: Router) {}
  handleReturn() {
    this.router.navigateByUrl('/dashboard');
  }
}
