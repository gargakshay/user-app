import { Injectable } from '@angular/core';

import { UserDetail } from './user-details';

@Injectable()
export class UserData {

    /**It is used to store userDataList */
    private _userDataList: UserDetail[];

    /**Getter and Setter */

    public get userDataList(): UserDetail[] {

        if (!this._userDataList) {
            //getting user data from session variable
            let userData = sessionStorage.getItem('userDataList');
            if (userData != null)
                return JSON.parse(userData);
            return [];
        }
        return this._userDataList;
    }

    public set userDataList(value: UserDetail[]) {
        //Setting user data in session variable
        sessionStorage.setItem('userDataList', JSON.stringify(value));
        this._userDataList = value;
    }
}