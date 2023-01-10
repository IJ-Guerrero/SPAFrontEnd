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
  // miPorfolio:any;
  // constructor(private datosPorfolio:PorfolioService, private tokenService: TokenService) { }
  // isLogged = false;

  // ngOnInit(): void {
  //   this.datosPorfolio.obtenerDatos().subscribe(data =>{

  //     this.miPorfolio=data;
  //   })

  //     if (this.tokenService.getToken()) {
  //       this.isLogged = true;
  //     } else {
  //       this.isLogged = false;
  //     }
  // }


  acer: Acercade[] = [];
  descripcionE: string = '';
  curri: Curriculum[] = [];
  nombreE: string = '';
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
      console.log(data);
      this.miPorfolio=data;
    });


  }

  onCreate(): void {
    const acer = new Acercade(this.descripcionE);
    this.sAcercade.save(acer).subscribe(
      data => {
        alert("Información añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

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
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

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

