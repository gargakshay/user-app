import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';

import { UserDetail } from './user-details';

import { UserData } from './user-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  /** Store users data list */
  userDataList: UserDetail[];

  userDetail: UserDetail;

  /** Stores the selected User detail */
  selectedUserDetail: UserDetail;

  /**For display dialog */
  isUserDisplay: boolean;

  /**Flag for check add or edit mode */
  isNewUser: boolean;

  isReadOnly: boolean = false;

  /**User display dialog mode */
  mode: string;

  /**For showing message */
  msgs: Message[];

  /**Create dropdown for user type */
  userTypeSelectItem: SelectItem[];

  /**Create dropdown for user status */
  userStatusSelectItem: SelectItem[];

  /**Inject userdata service */
  constructor(private userDataService: UserData) {
  }

  ngOnInit() {
    /**Getting user data from services */
    this.userDataList = this.userDataService.userDataList;

    /**Initialize varibables */
    this.msgs = [];

    this.userTypeSelectItem = [];
    this.userTypeSelectItem.push({ label: '--Select User Type--', value: '' });
    this.userTypeSelectItem.push({ label: 'Super Admin', value: 'SuperAdmin' });
    this.userTypeSelectItem.push({ label: 'City Admin', value: 'CityAdmin' });
    this.userTypeSelectItem.push({ label: 'Customer', value: 'Customer' });

    this.userStatusSelectItem = [];
    this.userStatusSelectItem.push({ label: '--Select User Status--', value: '' });
    this.userStatusSelectItem.push({ label: 'Active', value: 'Active' });
    this.userStatusSelectItem.push({ label: 'Inactive', value: 'Inactive' });
    this.userStatusSelectItem.push({ label: 'Archive', value: 'Archive' });
  }

  /**This method is used to open dialog for add user */
  addUser() {
    this.isNewUser = true;
    this.isUserDisplay = true;
    this.userDetail = new UserDetail();
    this.mode = "Add";
  }
 
  /**This method is used to open dialog for edit user */
  editUser(rowData) {
    this.isNewUser = false;
    this.isUserDisplay = true;
    this.selectedUserDetail = rowData;
    this.userDetail = Object.assign({}, rowData);
    this.mode = "Edit";
  }

  /**This method is used to open dialog for show user */
  showUser(rowData) {
    this.isReadOnly = true;
    this.isUserDisplay = true;
    this.userDetail = rowData;
    this.mode = "View";
  }


  /**This method is used to add and edit user data save*/
  addEditUser() {
    if(!this.userDetail.userStatus){
      this.msgs = [{ severity: 'error', detail: 'Please select user status' }];
      return;
    }
    if(!this.userDetail.userType){
      this.msgs = [{ severity: 'error', detail: 'Please select user type' }];
      return;
    }

    if (this.isNewUser) {
      this.userDataList.push(this.userDetail);
      this.userDataList = this.userDataList.slice();
      this.msgs = [{ severity: 'info', summary: 'Success', detail: 'User data has been added successfully' }];
    }
    else {
      let selectedIndex = this.userDataList.indexOf(this.selectedUserDetail);
      if (selectedIndex != -1) {
        this.userDataList[selectedIndex] = this.userDetail;
        this.userDataList = this.userDataList.slice();
        this.msgs = [{ severity: 'info', summary: 'Success', detail: 'User data has been edited successfully' }];
      }
    }

    //Update stored userDataList
    this.userDataService.userDataList = this.userDataList;
    this.closeDialog();
  }


  /**This method is used to delete user */
  deleteUser(rowData) {
    let index = this.userDataList.indexOf(rowData);

    if (index != -1) {
      this.userDataList.splice(index, 1);
      this.userDataList = this.userDataList.slice();
      this.msgs = [{ severity: 'info', summary: 'Success', detail: 'User has been deleted successfully' }];
    }
    //Update stored userDataList
    this.userDataService.userDataList = this.userDataList;
  }

  /**This method is used to close dialog */
  closeDialog() {
    this.isUserDisplay = false;
    this.isReadOnly = false;
    this.mode = "";
  }
}
