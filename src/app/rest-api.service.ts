import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {reject} from 'q';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    apiUrl = 'http://localhost:5000/';

    constructor(public http: HttpClient) {
        console.log('RestServiceProvider Provider');
    }

    verifyLogin(data) {
        return new Promise(resolve => {
            this.http.post(this.apiUrl + '/verifyLogin', JSON.stringify(data), {
                params: new HttpParams()
                    .set('sysuser_nama', 'zackwolf')
                    .set('sysuser_passw', 'ddc0f70da69b7e17c3b2d52a942bd72f0914d55b')
                ,
            })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
}
