import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public sysuser_nama = '';
    public sysuser_email = '';

    constructor(
        private storage: Storage,
        private navCtrl: NavController,
        private alertController: AlertController
    ) {
        storage.get('loginInfo').then((val) => {
            if (val == null) {
                return this.navCtrl.navigateBack('/login', {skipLocationChange: true});
            } else {
                this.sysuser_nama = val[0].sysuser_nama;
                this.sysuser_email = val[0].sysuser_email;
            }
        });
    }

    async logoutConfirm() {
        const alert = await this.alertController.create({
            header: 'Konfirmasi',
            message: 'Apakah Anda Akan Logout?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Logout',
                    handler: () => {
                        this.storage.remove('loginInfo').then(() => {
                            return this.navCtrl.navigateBack('/login', {skipLocationChange: true});
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
