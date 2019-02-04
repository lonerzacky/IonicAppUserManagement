import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonRouterOutlet, Platform, AlertController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

    constructor(
        private router: Router,
        private alertCtrl: AlertController,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
        this.platform.backButton.subscribe(() => {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.routerOutlet.pop().then(function () {
                });
            } else if (this.router.url === '/home') {
                navigator['app'].exitApp();
            } else {
                this.presentAlertConfirm().then(function () {
                    console.log('Present Alert');
                });
            }
        });
    }

    async presentAlertConfirm() {
        const alert = await this.alertCtrl.create({
            header: 'Kofirmasi!',
            message: 'Apakah Anda ingin keluar dari aplikasi?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        navigator['app'].exitApp();
                    }
                }
            ]
        });

        await alert.present();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
