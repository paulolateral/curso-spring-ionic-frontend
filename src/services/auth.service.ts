import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/model/credenciais.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post("http://localhost:8080/login",
         creds,
         {
             observe : 'response',
             responseType: 'text'
         }
         )
    }
}