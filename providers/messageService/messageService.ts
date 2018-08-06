import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable()
export class MessageServiceProvider {
    private subject = new Subject<any>();
    
    sendMessage(message: number) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
