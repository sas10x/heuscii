import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { App } = Plugins;

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet, private router: Router) { 
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
  }

}
