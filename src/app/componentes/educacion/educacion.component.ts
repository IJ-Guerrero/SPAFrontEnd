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

  // inicio 20230210
  educa: Educacion = null;
  educac: Educacion = new Educacion("--", "--", "--", "--");
  // FIN 20230210


  miPorfolio:any;
  nombreE: string = '';
  descripcionE: string = '';
  periodoE: string = '';
  tituloE: string = '';


  // inicio 20230210
  nombreEM: string = '';
  descripcionEM: string = '';
  periodoEM: string = '';
  tituloEM: string = '';
  // FIN 20230210


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

      this.miPorfolio=data;
    });


  }

  onCreate(): void {
    const educ = new Educacion(this.nombreE, this.descripcionE, this.periodoE, this.tituloE);
    this.sEducacion.save(educ).subscribe(
      data => {
        alert("Estudio añadido. Hacer click en aceptar para ver los cambios");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.periodoE = "";
        this.tituloE = "";
        this.cargarEducacion();
        // FIN 20230210

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }


  // INICIO 20230210
  openUpdateForm(form: string, id: number): void {
    this.sEducacion.detail(id).subscribe(
      data =>{
        this.educa = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;
        this.periodoEM = data.periodoE;
        this.tituloEM = data.tituloE;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(id?: number): void{
   this.educac = new Educacion(this.nombreEM, this.descripcionEM, this.periodoEM, this.tituloEM);
   this.sEducacion.update(id, this.educac ).subscribe(
    data => {
      alert(`Educación actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarEducacion();

    }, err => {
      alert(`Error al modificar la educacion`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210


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
