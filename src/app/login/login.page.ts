import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../global.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})

export class LoginPage implements OnInit {
    loginForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';

    constructor(
        public http: HttpClient,
        private storage: Storage,
        private navCtrl: NavController,
        private globalService: GlobalService
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

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    verifyLogin() {
        const formItem = this.loginForm.value;
        if (this.loginForm.valid) {
            this.globalService.presentLoading().then(function () {
                console.log('Show Loader');
            });
            const body = new HttpParams()
                .set('sysuser_nama', formItem.sysuser_nama)
                .set('sysuser_passw', formItem.sysuser_passw);
            return this.http.post('http://ec2-3-17-14-3.us-east-2.compute.amazonaws.com:5000/verifyLogin',
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
                        this.globalService.showMessage(res.response_message, 'success', 'Sukses!');
                        this.globalService.dismissLoading().then(function () {
                            console.log('Dismiss');
                        });
                        this.navCtrl.navigateForward('/home', {skipLocationChange: true}).then(function () {
                            console.log('Navigate to Home');
                        });
                        this.loginForm.reset();
                    } else {
                        this.globalService.dismissLoading().then(function () {
                            console.log('Dismiss');
                        });
                        // @ts-ignore
                        this.globalService.showMessage(res.response_message, 'error', 'Gagal!');
                    }
                },
                err => this.globalService.showMessage(JSON.stringify(err.message), 'error', 'Gagal!')
            );
        } else {
            this.globalService.showMessage('Harap Masukan Username dan Password', 'error', 'Gagal!');
        }
    }
}
