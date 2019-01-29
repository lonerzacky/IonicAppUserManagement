import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public sysuser_nama = '';

    constructor(private storage: Storage, private navCtrl: NavController) {
        storage.get('loginInfo').then((val) => {
            this.sysuser_nama = val[0].sysuser_nama;
        }).catch(function () {
            return navCtrl.navigateBack('/login');
        });
    }

    logout() {
        this.storage.remove('loginInfo').then(() => {
            return this.navCtrl.navigateBack('/login');
        });
    }


}
