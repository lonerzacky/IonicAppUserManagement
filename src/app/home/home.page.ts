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
            if (val == null) {
                return this.navCtrl.navigateBack('/login', {skipLocationChange: true});
            } else {
                this.sysuser_nama = val[0].sysuser_nama;
            }
        });
    }

    logout() {
        this.storage.remove('loginInfo').then(() => {
            return this.navCtrl.navigateBack('/login', {skipLocationChange: true});
        });
    }


}
