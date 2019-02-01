import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor(
        public loadingController: LoadingController,
        public toastr: ToastrManager
    ) {
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please Wait',
            duration: 2000
        });
        return await loading.present();
    }

    async dismissLoading() {
        return await this.loadingController.dismiss();
    }

    showMessage(message: string, type: string, header: string) {
        if (type === 'success') {
            this.toastr.successToastr(message, header, {position: 'bottom-center'});
        } else if (type === 'error') {
            this.toastr.errorToastr(message, header, {position: 'bottom-center'});
        }
    }


}
