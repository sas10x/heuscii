import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from, Observable} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { QrcodeService } from '../services/qrcode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  elementType = 'url';
  message:string;
  constructor(private storage: Storage, private router: Router, private qrcodeService: QrcodeService) { }

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
    return from(this.storage.get('codea744ea510e34'))
      .pipe(map(response => response));
  }
}
