import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserStoreService {
    private userId$ = new BehaviorSubject<string>("");

    // Getter and setter for ID
    public getUserIdFromStore() {
        return this.userId$.asObservable();
    }
    public setUserIdForStore(userId: string) {
        this.userId$.next(userId);
    }
}