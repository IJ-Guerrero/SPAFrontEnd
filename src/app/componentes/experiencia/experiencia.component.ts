import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/servicios/s-experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
  expe: Experiencia[] = [];
  miPorfolio:any;
  nombreE: string = '';
  descripcionE: string = '';
  img: string = '';
  periodoE: string = '';
  constructor(private datosPorfolio:PorfolioService, private sExperiencia: SExperienciaService, private tokenService: TokenService, private router: Router) { }

  isLogged = false;

  ngOnInit(): void {

    this.cargarExperiencia();
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
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.img, this.periodoE);
    this.sExperiencia.save(expe).subscribe(
      data => {
        alert("Experiencia añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe(data => { this.expe = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

}
