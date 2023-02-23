import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  proy: Proyectos[] = [];

  // inicio 20230210
  proye: Proyectos = null;
  proyec: Proyectos = new Proyectos("--", "--");
  // FIN 20230210

  nombreE: string = '';
  descripcionE: string = '';

  // inicio 20230210
  nombreEM: string = '';
  descripcionEM: string = '';
  // FIN 20230210


  miPorfolio:any;
  constructor(private datosPorfolio:PorfolioService,private sProyectos: ProyectosService, private tokenService: TokenService, private router: Router) { }
  isLogged = false;

  ngOnInit(): void {

    this.cargarProyectos()

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

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.cargarProyectos();
        // FIN 20230210
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateForm(form: string, id?: number): void {
    this.sProyectos.detail(id).subscribe(
      data =>{
        this.proye = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(id?: number): void{
   this.proyec = new Proyectos(this.nombreEM, this.descripcionEM);
   this.sProyectos.update(id, this.proyec ).subscribe(
    data => {
      alert(`Proyecto actualizado. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarProyectos();

    }, err => {
      alert(`Error al modificar la educacion`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210

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



}
