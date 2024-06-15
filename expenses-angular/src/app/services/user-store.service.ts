import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserStoreService {

    private fullName$ = new BehaviorSubject<string>("");
    private role$ = new BehaviorSubject<string>("");
    private userId$ = new BehaviorSubject<string>("");

    // Getter and setter for ID
    public getUserIdFromStore() {
        return this.userId$.asObservable();
    }
    public setUserIdForStore(userId: string) {
        this.userId$.next(userId);
    }

    // Getter and setter for role
    public getRoleFromStore() {
        return this.role$.asObservable();
    }
    public setRoleForStore(role: string) {
        this.role$.next(role);
    }

    // Getter and setter for full name
    public getFullNameFromStore() {
        return this.fullName$.asObservable();
    }
    public setFullNameForStore(fullName: string) {
        this.fullName$.next(fullName);
    }
}