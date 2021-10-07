import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MockHttpService {
  private users: User[] = [
    { id: 1, title: 'MR', firstName: 'John', lastName: 'Doe', email: 'john@doe.com' },
    { id: 2, title: 'MRS', firstName: 'Jane', lastName: 'Doe', email: 'jane@doe.com' },
    { id: 3, title: 'MR', firstName: 'Jimmy', lastName: 'Smith', email: 'jimmy@smith.com' },
    { id: 4, title: 'MR', firstName: 'Fred', lastName: 'Baker', email: 'fred@baker.com' },
    { id: 5, title: 'DR', firstName: 'Kevin', lastName: 'Doe', email: 'kevin@doe.com' },
    { id: 6, title: 'MR', firstName: 'Paul', lastName: 'Allan', email: 'paul@allan.com' },
    { id: 7, title: 'MISS', firstName: 'Sue', lastName: 'Ridge', email: 'sue@ridge.com' },
    { id: 8, title: 'MR', firstName: 'Bill', lastName: 'Gates', email: 'bill@gates.com' },
    { id: 9, title: 'MR', firstName: 'James', lastName: 'Doe', email: 'james@doe.com' },
    { id: 10, title: 'MR', firstName: 'Mason', lastName: 'Patterson', email: 'mason@patterson.com' },
    { id: 11, title: 'MR', firstName: 'John', lastName: 'Davis', email: 'john@davis.com' },
    { id: 12, title: 'MR', firstName: 'William', lastName: 'Adams', email: 'william@adams.com' },
    { id: 13, title: 'MISS', firstName: 'Emma', lastName: 'Howard', email: 'emma@howard.com' },
    { id: 14, title: 'MR', firstName: 'Liam', lastName: 'Wood', email: 'liam@Wood.com' },
    { id: 15, title: 'MR', firstName: 'John', lastName: 'Jenkins', email: 'john@jenkins.com' },
    { id: 16, title: 'MR', firstName: 'Ethan', lastName: 'Butler', email: 'ethan@butler.com' },
    { id: 17, title: 'MR', firstName: 'John', lastName: 'Foster', email: 'john@foster.com' },
    { id: 18, title: 'MISS', firstName: 'Olivia', lastName: 'Gray', email: 'olivia@gray.com' },
    { id: 19, title: 'MR', firstName: 'Benjamin', lastName: 'Cox', email: 'benjamin@cox.com' },
    { id: 20, title: 'MRS', firstName: 'Sophia', lastName: 'John', email: 'sophia@john.com' },
    { id: 21, title: 'DR', firstName: 'John', lastName: 'Sanders', email: 'john@sanders.com' },
    { id: 22, title: 'MR', firstName: 'Alexander', lastName: 'Collins', email: 'alexander@collins.com' },
    { id: 23, title: 'MISS', firstName: 'Isabella', lastName: 'White', email: 'isabella@white.com' },
    { id: 24, title: 'MR', firstName: 'Michael', lastName: 'Edwards', email: 'michael@edwards.com' },
    { id: 25, title: 'MR', firstName: 'William', lastName: 'Lee', email: 'william@lee.com' },
    { id: 26, title: 'MR', firstName: 'Mason', lastName: 'Evans', email: 'mason@evans.com' },
    { id: 27, title: 'MRS', firstName: 'Charlotte', lastName: 'Long', email: 'charlotte@long.com' },
    { id: 28, title: 'LORD', firstName: 'John', lastName: 'Nelson', email: 'john@nelson.com' },
    { id: 29, title: 'DR', firstName: 'Karen', lastName: 'Walters', email: 'karen@walters.com' }
  ];

  constructor() { }

  get<T>(url: string): Observable<any> {
    if (url === 'titles') {
      return of([
        { value: 'DR', label: 'Doctor' },
        { value: 'PROF', label: 'Professor' },
        { value: 'LORD', label: 'Lord' },
        { value: 'MR', label: 'Mr' },
        { value: 'MRS', label: 'Mrs' },
        { value: 'MISS', label: 'Miss' },
        { value: 'MS', label: 'Ms' }
      ]);
    }
    const urlArray = url.split('/');

    if (urlArray.length === 1) {
      return of(this.users).pipe(delay(1000));
    } else {
      const id = parseInt(urlArray[1]);
      return of(this.users.find(u => u.id === id)).pipe(delay(1000));
    }
  }

  post<T>(url: string, value: any): Observable<any> {
    if (!value.title) {
      return throwError('Title cannot be blank');
    }
    if (!value.firstName) {
      return throwError('First name cannot be blank');
    }
    if (!value.lastName) {
      return throwError('Last name cannot be blank');
    }
    if (!value.email) {
      return throwError('Email cannot be blank');
    }
    if (value.email.includes('banned')) {
      return throwError('Banned email');
    }
    const id = this.users.reduce((greatestId, user) => user.id > greatestId ? user.id : greatestId, 0) + 1
    this.users = [...this.users, { ...value, id: id }];
    return of(id).pipe(delay(1000));
  }

  put<T>(url: string, value: any): Observable<any> {
    if (!value.title) {
      return throwError('Title cannot be blank');
    }
    if (!value.firstName) {
      return throwError('First name cannot be blank');
    }
    if (!value.lastName) {
      return throwError('Last name cannot be blank');
    }
    if (!value.email) {
      return throwError('Email cannot be blank');
    }
    if (value.email.includes('banned')) {
      return throwError('Banned email');
    }
    this.users = this.users.map(u => u.id === value.id ? value : u);
    return of('OK').pipe(delay(1000));
  }

  delete(url: string): Observable<any> {
    const urlArray = url.split('/');
    const id = parseInt(urlArray[1]);
    this.users = this.users.filter(u => u.id !== id);
    return of('OK');
  }
}