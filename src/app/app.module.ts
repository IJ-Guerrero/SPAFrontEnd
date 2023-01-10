import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { IntroduccionComponent } from './componentes/introduccion/introduccion.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';
import { HabilidadaesYproyectosComponent } from './componentes/habilidadaes-yproyectos/habilidadaes-yproyectos.component';
import { PieDePaginaComponent } from './componentes/pie-de-pagina/pie-de-pagina.component';
import { HttpClientModule } from '@angular/common/http';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { interceptorProvider } from './servicios/interceptor-service';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    IntroduccionComponent,
    SobreMiComponent,
    HabilidadaesYproyectosComponent,
    PieDePaginaComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    IniciarSesionComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule

  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
