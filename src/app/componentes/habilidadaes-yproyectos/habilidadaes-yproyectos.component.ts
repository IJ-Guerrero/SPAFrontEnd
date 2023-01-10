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

  ski: Skill[] = [];

  nombreE: string = '';
  nombre: string = '';
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
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

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
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

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
