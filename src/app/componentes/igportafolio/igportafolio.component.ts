import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-igportafolio',
  templateUrl: './igportafolio.component.html',
  styleUrls: ['./igportafolio.component.css']
})
export class IgportafolioComponent implements OnInit {
  miPorfolio:any;
  isLogged = false;

  constructor(private datosPorfolio:PorfolioService, private router:Router, private tokenService: TokenService) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    };

    this.datosPorfolio.obtenerDatos().subscribe(data =>{

      this.miPorfolio=data;
    })
  }

}
