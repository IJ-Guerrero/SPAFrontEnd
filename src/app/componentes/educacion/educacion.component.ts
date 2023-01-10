import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {

  educ: Educacion[] = [];
  miPorfolio:any;
  nombreE: string = '';
  descripcionE: string = '';
  periodoE: string = '';
  tituloE: string = '';
  constructor(private datosPorfolio:PorfolioService, private sEducacion: EducacionService, private tokenService: TokenService, private router: Router) { }

  isLogged = false;

  ngOnInit(): void {

    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.miPorfolio=data;
    });


  }

  onCreate(): void {
    const educ = new Educacion(this.nombreE, this.descripcionE, this.periodoE, this.tituloE);
    this.sEducacion.save(educ).subscribe(
      data => {
        alert("Estudio añadido. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  cargarEducacion(): void {
    this.sEducacion.lista().subscribe(data => { this.educ = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sEducacion.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo borrar el estudio");
        }
      )
    }
  }


}
