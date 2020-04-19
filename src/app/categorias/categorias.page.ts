import { Component, OnInit } from '@angular/core';
import { CategoriaService, SearchType } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/model/categoria.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //debugger;
    //this.results = this.categoriaService.searchData(this.searchTerm, this.type);
   /*  this.categoriaService.login().then(data => {
      console.log(data);
      alert(data);
      
    }); */
    this.results = this.categoriaService.findAll();

   //let categorias = this.categoriaService.findAll();
    ///then((categorias: CategoriaDTO[]) => {
     // console.log(categorias.length);
      
    //});
  }
}
