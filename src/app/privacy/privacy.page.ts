import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { QrcodeService } from '../services/qrcode.service';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  message:string;
  public subscription: any;
  constructor(private platform: Platform, private router: Router, private storage: Storage, private qrcodeService: QrcodeService, private routerOutlet: IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        if (window.confirm("do you want to exit app"))
        {
          App.exitApp();
        }
      }
    });
   }

  ngOnInit() {
    this.qrcodeService.currentMessage.subscribe(message => {this.message = message});
    this.getTodo().subscribe(
      res => 
      {
        if (!res) {

        }
        else {
          this.qrcodeService.changeMessage(res.toString());
          this.router.navigate(['/login'])
        }
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    )
  }

  agree() {
    this.router.navigate(['/login']);
  }
  getTodo() {
    return from(this.storage.get('codea744ea510e34v101'))
      .pipe(map(response => response));
  }
  exit() {
    this.router.navigate(['/manual'])
  }
}
