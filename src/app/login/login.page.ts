import {Component} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {
    constructor(public http: HttpClient) {
    }

    sysuser_nama = '';
    sysuser_passw = '';

    verifyLogin() {
        const body = new HttpParams()
            .set('sysuser_nama', this.sysuser_nama)
            .set('sysuser_passw', this.sysuser_passw);

        return this.http.post('http://localhost:5000/verifyLogin',
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        ).subscribe(
            (res) => {
                console.log(res);
            },
            err => console.log(err)
        );
    }
}
