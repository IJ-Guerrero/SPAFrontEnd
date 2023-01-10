export class Educacion {
    id?: number;
    nombreE: string;
    descripcionE: string;
    periodoE: string;
    tituloE: string;

    constructor(nombreE: string, descripcionE: string, periodoE: string, tituloE: string){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.periodoE = periodoE;
        this.tituloE= tituloE;
    }
}
