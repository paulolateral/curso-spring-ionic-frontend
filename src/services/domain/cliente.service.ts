import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/model/cliente.dto';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient, private storage : StorageService){}

    findByEmail(email: string) : Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?email=${email}`,
            {'headers' : authHeader});
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.png`;
        return this.http.get(url, {responseType: 'blob'});
    }
}