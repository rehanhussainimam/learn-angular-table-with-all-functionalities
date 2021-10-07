import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { MockHttpService } from './mock-http.service';
import { EzArrayCache } from 'ez-state';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userCache = new EzArrayCache<User, number>(
    'id',
    {
      id: null,
      title: null,
      firstName: '',
      lastName: '',
      email: ''
    }
  );

  users$ = this.userCache.items$;

  user$ = this.userCache.item$;

  loading$ = this.userCache.loading$;

  saving$ = this.userCache.savingOrUpdating$;

  saved$ = this.userCache.savedOrUpdated$;

  error$ = this.userCache.error$;

  constructor(private http: MockHttpService) {}

  select(id: number) {
    this.userCache.select(id);
  }

  load() {
    if (!this.userCache.value) {
      this.userCache.load(this.http.get<User[]>('user'));
    } else {
      this.userCache.setState();
    }
  }

  save(user: User) {
    if (user.id) {
      this.userCache.update(
        this.http.put<User>(`user/${user.id}`, user).pipe(
          map(_ => user)
        )
      );
    } else {
      this.userCache.save(
        this.http.post<User>('user', user).pipe(
          map(id => ({ ...user, id: id }))
        )
      );
    }
  }

  delete(user: User) {
    this.userCache.delete(
      this.http.delete(`user/${user.id}`).pipe(
        map(_ => user)
      )
    );
  }
}