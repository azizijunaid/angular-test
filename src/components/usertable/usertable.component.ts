import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, startWith, switchMap, of as observableOf, catchError, map } from 'rxjs';
import { UserService } from 'src/services/user.service';



type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})

export class UsertableComponent implements OnInit, AfterViewInit {

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;
  currentPage = 0;

    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];
  dataSource = new MatTableDataSource<User>([]);
  constructor(private userService: UserService) { }



  ngOnInit(): void {
  }

   ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.currentPage = this.paginator.pageIndex;
          return this.userService.getUserData(this.currentPage + 1, this.paginator.pageSize).pipe(catchError(() => observableOf(null)))
        }),
        map((res: any) => {

          this.isRateLimitReached = res === null;

          if (res === null) {
            return [];
          }
          this.resultsLength = res.total;
          return res.data;
        }),
      )
      .subscribe(data => (this.dataSource = new MatTableDataSource(data)));
  }

}
