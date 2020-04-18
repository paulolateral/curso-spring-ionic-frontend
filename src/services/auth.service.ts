import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/model/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { LocalUser } from 'src/model/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient, private storage : StorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post("http://localhost:8080/login",
         creds,
         {
             observe : 'response',
             responseType: 'text'
         }
         )
    }

    successfullLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok
        };

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}