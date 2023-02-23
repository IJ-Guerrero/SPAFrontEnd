import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Habilidades } from 'src/app/model/habilidades';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

declare var Chart: any;
@Component({
  selector: 'app-habilidadaes',
  templateUrl: './habilidadaes-yproyectos.component.html',
  styleUrls: ['./habilidadaes-yproyectos.component.css']
})

export class HabilidadaesYproyectosComponent implements OnInit {

  habil: Habilidades[] = [];

  // inicio 20230210
  habili: Habilidades = null;
  habilid: Habilidades = new Habilidades("--");
  // FIN 20230210

  nombreE: string = '';

  // inicio 20230210
  nombreEM: string = '';
  // inicio 20230210



  ski: Skill[] = [];

  // inicio 20230210
  skii: Skill = null;
  skiil: Skill = new Skill("--", 0);
  // FIN 20230210

  nombre: string = '';

    // inicio 20230210
    nombreM: string = '';
    // inicio 20230210


  porcentaje: number = 0;
  chart: any;
  miPorfolio:any;




  constructor(private datosPorfolio:PorfolioService, private sHabilidades: HabilidadesService,private sSkill: SkillService, private tokenService: TokenService, private router: Router) { }
isLogged = false;
  ngOnInit(): void {


    this.cargarHabilidades()
    this.cargarSkill()
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.miPorfolio=data;
    })


    this.chart = new Chart('radarChartCompetenciasLaborales', {
      type: 'radar',
      data: {
        labels: [
          'Responsabilidad',
          'Autogestión',
          'Liderazgo',
          'Motivación',
          'Inteligencia Social',
          'Autonomía',
          'Arbitraje',
          'Cooperación'
        ],
        datasets: [{
          label: 'Soft skills',
          data:  [86, 71, 89, 61, 75, 75, 54, 71],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    })




  }


  onCreate(): void {
    const habil = new Habilidades(this.nombreE);
    this.sHabilidades.save(habil).subscribe(
      data => {
        alert("Habilidad añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreE = "";
        this.cargarHabilidades();
        // FIN 20230210

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateFormH(form: string, id?: number): void {
    this.sHabilidades.detail(id).subscribe(
      data =>{
        this.habili = data;
        this.nombreEM = data.nombreE;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdateH(id?: number): void{
   this.habilid = new Habilidades(this.nombreEM);
   this.sHabilidades.update(id, this.habilid ).subscribe(
    data => {
      alert(`Habilidad actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarHabilidades();

    }, err => {
      alert(`Error al modificar la habilidad`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210

  cargarHabilidades(): void {
    this.sHabilidades.lista().subscribe(data => { this.habil = data; })
  }

  delete(id?: number){
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

  onCreateS(): void {
    const ski = new Skill(this.nombre, this.porcentaje);
    this.sSkill.save(ski).subscribe(
      data => {
        alert("Información añadida. Los cambios se veran reflejados al recargar la página.");
        this.router.navigate(['']);

        // INICIO 20230210
        this.nombreM = "";
        this.cargarSkill();
        // FIN 20230210

      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // INICIO 20230210
  openUpdateFormS(form: string, id?: number): void {
    this.sSkill.detail(id).subscribe(
      data =>{
        this.skii = data;
        this.nombreM = data.nombre;
        document.getElementById(form).scrollIntoView({behavior: 'smooth'});
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdateS(id?: number): void{
   this.skiil = new Skill(this.nombreM, 0);
   this.sSkill.update(id, this.skiil ).subscribe(
    data => {
      alert(`Habilidad suave actualizada. Dar click en "Aceptar" para que se reflejen los cambios`);
      this.router.navigate(['']);
      this.cargarSkill();

    }, err => {
      alert(`Error al modificar la habilidad suave`);
      this.router.navigate(['']);
    }

  )

  }
  // FIN 20230210

  cargarSkill(): void {
    this.sSkill.lista().subscribe(data => { this.ski = data; })
  }



  deleteS(id?: number){
    if(id != undefined){
      this.sSkill.delete(id).subscribe(
        data => {
          this.cargarSkill();
        }, err => {
          alert("No se pudo borrar la información");
        }
      )
    }
  }
}
