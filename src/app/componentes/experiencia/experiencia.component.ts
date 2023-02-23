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

  // inicio 20230210
  exper: Experiencia = null;
  experi: Experiencia = new Experiencia("--", "--", "--", "--");
  // FIN 20230210

  miPorfolio:any;
  nombreE: string = '';
  descripcionE: string = '';
  img: string = '';
  periodoE: string = '';


  // inicio 20230210
  nombreEM: string = '';
  descripcionEM: string = '';
  imgM: string = '';
  periodoEM: string = '';
  // FIN 20230210

  constructor(private datosPorfolio:PorfolioService, private sExperiencia: SExperienciaService, private tokenService: TokenService, private router: Router) { }
  haycontenido = false;
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

        // INICIO 20230210
        this.nombreE = "";
        this.descripcionE = "";
        this.periodoE = "";
        this.img = "";
        this.cargarExperiencia();
        // FIN 20230210
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateForm(form: string, id?: number): void {
    this.sExperiencia.detail(id).subscribe(
      data =>{
        this.exper = data;
        this.nombreEM = data.nombreE;
        this.descripcionEM = data.descripcionE;
        this.periodoEM = data.periodoE;
        this.imgM = data.img;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(id?: number): void{
   this.experi = new Experiencia(this.nombreEM, this.descripcionEM, this.imgM ,this.periodoEM);
   this.sExperiencia.update(id, this.experi ).subscribe(
    data => {
      alert(`Experiencia actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarExperiencia();

    }, err => {
      alert(`Error al modificar la experiencia`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210

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
