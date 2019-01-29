import {Component} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ToastrManager} from 'ng6-toastr-notifications';


@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {
    constructor(public http: HttpClient, public toastr: ToastrManager) {
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
                // @ts-ignore
                if (res.response_code === '00') {
                    // @ts-ignore
                    this.toastr.successToastr(res.response_message, 'Sukses!', {position: 'bottom-center'});
                } else {
                    // @ts-ignore
                    this.toastr.errorToastr(res.response_message, 'Gagal!', {position: 'bottom-center'});

                }
            },
            err => console.log(err)
        );
    }
}
