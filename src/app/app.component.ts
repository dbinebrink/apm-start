import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): string {
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    })
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null}}]);
    this.messageService.isDisplayed = false;
  }

  checkRouterEvent(routerEvent: Event): void {
    if(routerEvent instanceof NavigationStart) {  
      this.loading = true;  // spinner appears when routing begins
    }

    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationEnd) {
      this.loading = false;  // spinner goes away when routing begins
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    console.log('Log out');
  }
}
