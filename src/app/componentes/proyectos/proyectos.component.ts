import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { Habilidades } from 'src/app/model/habilidades';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  proy: Proyectos[] = [];
  habil: Habilidades[] = [];
  yolo: any[]= [
  {
    "nombreE": "oyout"
  }
  ];
  miPorfolio:any;
  nombreE: string = '';
  descripcionE: string = '';

  constructor(private datosPorfolio:PorfolioService,private sHabilidades: HabilidadesService,private sProyectos: ProyectosService, private tokenService: TokenService, private router: Router) { }
  isLogged = false;

  ngOnInit(): void {

    this.cargarProyectos()
    this.cargarHabilidades()
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
    const proy = new Proyectos(this.nombreE, this.descripcionE);
    this.sProyectos.save(proy).subscribe(
      data => {
        alert("Proyecto añadido. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  cargarProyectos(): void {
    this.sProyectos.lista().subscribe(data => { this.proy = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sProyectos.delete(id).subscribe(
        data => {
          this.cargarProyectos();
        }, err => {
          alert("No se pudo borrar el proyecto");
        }
      )
    }
  }

  onCreateH(): void {
    const habil = new Habilidades(this.nombreE);
    this.sHabilidades.save(habil).subscribe(
      data => {
        alert("Habilidad añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  cargarHabilidades(): void {
    this.sHabilidades.lista().subscribe(data => { this.habil = data; })
  }

  deleteH(id?: number){
    if(id != undefined){
      this.sHabilidades.delete(id).subscribe(
        data => {
          this.cargarHabilidades();
        }, err => {
          alert("No se pudo borrar la habilidad");
        }
      )
    }
  }

}
