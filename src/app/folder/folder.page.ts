import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredenciaisDTO } from 'src/model/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  login() {
    console.log(this.creds);
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));     
    },
    error => {});

    this.router.navigate(['categorias']);
  }
}
