import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-encabezado',
    templateUrl: './encabezado.component.html',
     styleUrls: ['./encabezado.component.css']
   })
export class EncabezadoComponent implements OnInit {
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
      console.log(data);
      this.miPorfolio=data;
    })
  }

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/iniciar-sesion'])
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { PorfolioService } from 'src/app/servicios/porfolio.service';

// @Component({
//   selector: 'app-encabezado',
//   templateUrl: './encabezado.component.html',
//   styleUrls: ['./encabezado.component.css']
// })
// export class EncabezadoComponent implements OnInit {
//   miPorfolio:any;
//   constructor(private datosPorfolio:PorfolioService,
//               private router:Router) { };

//   ngOnInit(): void {
//     this.datosPorfolio.obtenerDatos().subscribe(data =>{
//       console.log(data);
//       this.miPorfolio=data;
//     })
//   };

//   login(){
//     this.router.navigate(['/iniciar-sesion'])
//   }

// }
