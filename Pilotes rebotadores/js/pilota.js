export class Pilota {
    constructor(x, y, velX, velY, color, mida) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }

    dibuixa(ctx) {
        ctx.beginPath(); // Per començar a dibuixar formes al canvas
        ctx.fillStyle = this.color; //Color amb que dibuixarem
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); //Dibuix d’un arc
        ctx.fill(); // Finalitza el dibuix i l’omple amb el color ja esmenat
    }
    

    mou(ampleCanvas, altCanvas) {
        // Verifica las colisiones con los bordes del canvas
        if (this.x + this.mida >= ampleCanvas || this.x - this.mida <= 0) {
            this.velX = -this.velX; // Invierte la dirección en el eje X
        }
    
        if (this.y + this.mida >= altCanvas || this.y - this.mida <= 0) {
            this.velY = -this.velY; // Invierte la dirección en el eje Y
        }
    
        // Mueve la pelota
        this.x += this.velX;
        this.y += this.velY;
    }    
}