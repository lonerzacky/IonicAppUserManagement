import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})

export class LoginPage implements OnInit {
    sysuser_nama = '';
    sysuser_passw = '';
    loginForm: FormGroup;

    constructor(
        public http: HttpClient,
        public toastr: ToastrManager,
        private storage: Storage,
        private navCtrl: NavController
    ) {
        storage.get('loginInfo').then((val) => {
            if (val) {
                return this.navCtrl.navigateForward('/home', {skipLocationChange: true});
            }
        });
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            sysuser_nama: new FormControl('', [Validators.required]),
            sysuser_passw: new FormControl('', [Validators.required])
        });
    }

    verifyLogin() {
        if (this.sysuser_nama && this.sysuser_passw) {
            const body = new HttpParams()
                .set('sysuser_nama', this.sysuser_nama)
                .set('sysuser_passw', this.sysuser_passw);
            return this.http.post('http://192.196.1.111:5000/verifyLogin',
                body,
                {
                    headers: new HttpHeaders()
                        .set('Content-Type', 'application/x-www-form-urlencoded')
                }
            ).subscribe(
                (res) => {
                    // @ts-ignore
                    if (res.response_code === '00') {
                        // @ts-ignore
                        this.storage.set('loginInfo', res.response_data).then(function () {
                            console.log('Successfully Create Login Storage');
                        });
                        // @ts-ignore
                        this.toastr.successToastr(res.response_message, 'Sukses!', {position: 'bottom-center'});
                        return this.navCtrl.navigateForward('/home', {skipLocationChange: true});
                    } else {
                        // @ts-ignore
                        this.toastr.errorToastr(res.response_message, 'Gagal!', {position: 'bottom-center'});
                    }
                },
                err => this.toastr.errorToastr(JSON.stringify(err.message), 'Gagal!', {position: 'bottom-center'})
            );
        } else {
            this.toastr.errorToastr('Harap Masukan Username dan Password', 'Gagal!', {position: 'bottom-center'});
        }
    }
}
