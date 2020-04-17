import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/model/categoria.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

    constructor(private http: HttpClient) {

    }

    searchData(title: string, type: SearchType): Observable<any> {
        return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
        .pipe(map(results => results['Search'])
        );
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>("http://curso-spring-ionic-paulolatera.herokuapp.com/categorias")
        .pipe(
            map(res => res )
        );
    }

    login() {
        return new Promise((resolve, reject) => {
          var data = {
            email: 'paulolateral2@gmail.com',
            senha: '123'
          };
     
          this.http.post('http://localhost:8080/' + 'login', data)
            .subscribe((result: any) => {
              resolve(result.json());
            },
            (error) => {
              reject(error.json());
            });
        });
      }
}