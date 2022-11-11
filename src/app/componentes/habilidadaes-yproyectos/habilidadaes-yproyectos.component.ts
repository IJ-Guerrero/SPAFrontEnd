import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-habilidadaes-yproyectos',
  templateUrl: './habilidadaes-yproyectos.component.html',
  styleUrls: ['./habilidadaes-yproyectos.component.css']
})
export class HabilidadaesYproyectosComponent implements OnInit {
  miPorfolio:any;
  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.miPorfolio=data;
    })
  }

}
