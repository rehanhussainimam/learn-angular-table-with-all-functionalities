import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$ = this.usersService.users$;

  loading$ = this.usersService.loading$;

  constructor(private usersService: UsersService) {
    usersService.load();
  }

  delete(user: User) {
    this.usersService.delete(user);
  }
}