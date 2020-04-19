import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/model/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { error } from 'util';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  cliente : ClienteDTO;
  constructor(private storage: StorageService,
    private clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.token) {
      let email = 'paulolateral2@gmail.com';
      this.clienteService.findByEmail(email)
      .subscribe(response => {
        this.cliente = response;
        this.getImageIfExists();
      },
      error => {});
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.png`
    },
      error =>{});
  }

}
