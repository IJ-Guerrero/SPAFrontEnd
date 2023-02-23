import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Acercade } from 'src/app/model/acercade';
import { AcercadeService } from 'src/app/servicios/acercade.service';
import { Curriculum } from 'src/app/model/curriculum';
import { CurriculumService } from 'src/app/servicios/curriculum.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

    acer: Acercade[] = [];

    // inicio 20230210
    acerc: Acercade = null;
    acerca: Acercade = new Acercade("--");
    // FIN 20230210


    descripcionE: string = '';

      // inicio 20230210
    descripcionEM: string = '';
  // FIN 20230210


  curri: Curriculum[] = [];

  // inicio 20230210
  curric: Curriculum = null;
  curricu: Curriculum = new Curriculum("--");
  // FIN 20230210


  nombreE: string = '';

  // inicio 20230210
  nombreEM: string = '';
  // FIN 20230210



  miPorfolio:any;


  constructor(private datosPorfolio:PorfolioService, private sCurriculum: CurriculumService, private sAcercade: AcercadeService, private tokenService: TokenService, private router: Router) { }

  isLogged = false;

  ngOnInit(): void {

    this.cargarAcercade();
    this.cargarCurriculum();
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
    const acer = new Acercade(this.descripcionE);
    this.sAcercade.save(acer).subscribe(
      data => {
        alert("Información añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        this.descripcionE = "";
        this.cargarAcercade();

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateFormA(form: string, id?: number): void {
    this.sAcercade.detail(id).subscribe(
      data =>{
        this.acerc = data;
        this.descripcionEM = data.descripcionE;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdateA(id?: number): void{
   this.acerca = new Acercade(this.descripcionEM);
   this.sAcercade.update(id, this.acerca ).subscribe(
    data => {
      alert(`Información actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarAcercade();

    }, err => {
      alert(`Error al modificar la información Sobre mi`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210

  cargarAcercade(): void {
    this.sAcercade.lista().subscribe(data => { this.acer = data; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sAcercade.delete(id).subscribe(
        data => {
          this.cargarAcercade();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }

  onCreateC(): void {
    const curri = new Curriculum(this.nombreE);
    this.sCurriculum.save(curri).subscribe(
      data => {
        alert("Foto añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        this.nombreE = "";
        this.cargarCurriculum();
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

    // INICIO 20230210
    openUpdateFormC(form: string, id?: number): void {
      this.sCurriculum.detail(id).subscribe(
        data =>{
          this.curric = data;
          this.nombreEM = data.nombreE;
          document.getElementById(form).scrollIntoView({behavior: 'smooth'});
        }, err =>{
          alert("Error al modificar");
          this.router.navigate(['']);
        }
      )
    }

    onUpdateC(id?: number): void{
     this.curricu = new Curriculum(this.nombreEM);
     this.sCurriculum.update(id, this.curricu ).subscribe(
      data => {
        alert(`Foto actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
        this.router.navigate(['']);
        this.cargarCurriculum();

      }, err => {
        alert(`Error al modificar la imagen`);
        this.router.navigate(['']);
      }

    )

    }
    // FIN 20230210

  cargarCurriculum(): void {
    this.sCurriculum.lista().subscribe(data => { this.curri = data; })
  }

  deleteC(id?: number){
    if(id != undefined){
      this.sCurriculum.delete(id).subscribe(
        data => {
          this.cargarCurriculum();
        }, err => {
          alert("No se pudo borrar la foto");
        }
      )
    }
  }


}

