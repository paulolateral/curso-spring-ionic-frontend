import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/model/categoria.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';

export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode'
  }

@Injectable({
    providedIn: 'root'
  })

@Injectable()
export class CategoriaService {

    url = 'http://www.omdbapi.com/';
    apiKey = ''

    constructor(private http: HttpClient, private storage: StorageService) {

    }

    searchData(title: string, type: SearchType): Observable<any> {
        return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
        .pipe(map(results => results['Search'])
        );
    }

    findAll() : Observable<CategoriaDTO[]> {
  
      let token = this.storage.getLocalUser().token;
      let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`,
            {'headers' : authHeader});
    }

    login() {
        return new Promise((resolve, reject) => {
          var data = {
            email: 'paulolateral2@gmail.com',
            senha: '123'
          };
     
          this.http.post(`${API_CONFIG.bucketBaseUrl}/` + 'login', data)
            .subscribe((result: any) => {
              resolve(result.json());
            },
            (error) => {
              reject(error.json());
            });
        });
      }
}