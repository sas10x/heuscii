import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { QrcodeService } from '../services/qrcode.service';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  elementType = 'url';
  message:string;
  subscribe:any;
  constructor(private platform: Platform, private storage: Storage, private router: Router, private qrcodeService: QrcodeService, private routerOutlet: IonRouterOutlet) { 
    this.platform.backButton.subscribeWithPriority(-1, () => {
        if (window.confirm("do you want to exit app"))
        {
          App.exitApp();
        }
    });
  }

  ngOnInit() {
    this.qrcodeService.currentMessage.subscribe(message => {this.message = message});
    this.getTodo().subscribe(
      res => 
      {
        if (!res) {
          this.router.navigate(['/signup'])
        }
        else {
          this.qrcodeService.changeMessage(res.toString());
        }
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    )
  }

  getTodo() {
    return from(this.storage.get('codea744ea510e34v101'))
      .pipe(map(response => response));
  }
}
