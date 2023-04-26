import { Component } from '@angular/core';

import { NavItem } from '../common/models/nav-item.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  navItems: NavItem[] = [
    { name: 'examples.$TITLE', route: ['/examples'] }
  ];

  constructor(private _authService: AuthService) { }

  logOut() {
    this._authService.logOut();
  }
}
