export class Experiencia {
    id? : number;
    nombreE : string;
    descripcionE : string;
    img: string;
    periodoE: string;

    constructor(nombreE: string, descripcionE: string, img: string, periodoE: string){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.img = img;
        this.periodoE = periodoE;
    }
}
