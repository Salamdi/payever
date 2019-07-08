import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, filter, switchMap, take } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pagesCount: number;
  pageIndex: number;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('page')),
      take(1)
    )
      .subscribe(page => this.pageIndex = page ? parseInt(page, 10) - 1 : 0)
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('page')),
      switchMap(page => this.apiService.fetchUsers(page))
    )
      .subscribe(users => this.userList = users)
    this.activatedRoute.data.pipe(
      map(data => data.users)
    )
      .subscribe((users: UserInterface[]) => {
        this.userList = users;
      });

    this.activatedRoute.data.pipe(
      map(data => data.paginationInfo)
    )
      .subscribe(paginationInfo => {
        this.pagesCount = paginationInfo.total;
      })
  }

  pageChanged(event: PageEvent): void {
    let page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }
}
