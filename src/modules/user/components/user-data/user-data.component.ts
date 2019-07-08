import { Component, Input, OnInit, Optional } from '@angular/core';
import { UserInterface } from '../../../../interfaces';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() user: UserInterface;
  style: {[key: string]: string};

  constructor(@Optional() private parent: UserComponent) { }

  ngOnInit() {
    this.style = {
      'background-image': `url(${this.user.avatar})`
    }
  }

}
