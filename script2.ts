class BouncingBall {
    private randomColor: string
    private x: number;
    private y: number;
    private gravity: number;
    private damping: number;
    private radius: number
    
    constructor(x:number, y: number) {
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.damping = 0.9;
        this.radius = 50;
        this.randomColor =  '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    update (deltaTime:number) {
       this.gravity += deltaTime;
       this.y += this.gravity;

       if(this.y + this.radius > canvas.height) {
          this.y = canvas.height - this.radius;
          this.gravity *= -this.damping 
       }
    }

    draw() {

        const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, '#ffcc00'); 
            gradient.addColorStop(1, this.randomColor); 
        
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 10);
            context.fillStyle = gradient;
            context.fill();
    }
}

const balls = [] as BouncingBall[];
const canvas = document.getElementById('bouncingBallCanvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');
let lastTime = 0;

const updating = (deltaTime:number) => {
   balls.forEach(ball => ball.update(deltaTime))
}

const drawing = () => {
   context.clearRect(0, 0, canvas.width, canvas.height); 
   balls.forEach(ball => ball.draw()) 
}

const spawnBall = (x: number, y: number) => {
    if(balls.length <= 10) balls.push(new BouncingBall(x, y))
}

const tick = (currentTime:number) => {
    const deltaTime = (currentTime-lastTime)/1000;
     
    lastTime = currentTime;
    updating(deltaTime);
    drawing()
    requestAnimationFrame(tick)
}

canvas.addEventListener('click', (event) => {
   const clientX = event.clientX;
   const clientY = event.clientY;

   spawnBall(clientX, clientY);
   requestAnimationFrame(tick) 
   myAudio.play()
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




//Snow
var myAudio = new Audio('Michael Buble - Holly Jolly Christmas.mp3');
const snowmax: any = 35;
const snowcolor: any = ["#AAAACC", "#DDDDFF", "#CCCCDD", "#F3F3F3", "#F0FFFF", "#FFFFFF", "#EFF5FF"];
const snowtype: any = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];
const snowletter: any = "*";
const sinkspeed: any = 0.6;
const snowmaxsize: any = 40;
const snowminsize: any = 8;
const snowingzone: any = 1;

const snow: any[] = [];
let marginbottom: any;
let marginright: any;
let i_snow: any = 0;
const x_mv: any[] = [];
const crds: any[] = [];
const lftrght: any[] = [];
const browserinfos: any = navigator.userAgent;
const ie5: any = document.all && document.getElementById && !browserinfos.match(/Opera/);
const ns6: any = document.getElementById && !document.all;
const opera: any = browserinfos.match(/Opera/);
const browserok: any = ie5 || ns6 || opera;

function randommaker(range: any): any {
    const rand: any = Math.floor(range * Math.random());
    return rand;
}

function initsnow(): void {
    if (ie5 || opera) {
        marginbottom = document.body.clientHeight;
        marginright = document.body.clientWidth;
    } else if (ns6) {
        marginbottom = window.innerHeight;
        marginright = window.innerWidth;
    }
    const snowsizerange: any = snowmaxsize - snowminsize;
    for (let i: any = 0; i <= snowmax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;
        snow[i] = document.getElementById(`s${i}`);
        snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
        snow[i].size = randommaker(snowsizerange) + snowminsize;
        snow[i].style.fontSize = snow[i].size + "px";
        snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
        snow[i].sink = sinkspeed * snow[i].size / 5;
        if (snowingzone === 1) { snow[i].posx = randommaker(marginright - snow[i].size); }
        if (snowingzone === 2) { snow[i].posx = randommaker(marginright / 2 - snow[i].size); }
        if (snowingzone === 3) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4; }
        if (snowingzone === 4) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2; }
        snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posx + "px";
        snow[i].style.top = snow[i].posy + "px";
    }
    movesnow();
}

function movesnow(): void {
    for (let i: any = 0; i <= snowmax; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink;
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
        snow[i].style.top = snow[i].posy + "px";
        if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
            if (snowingzone === 1) { snow[i].posx = randommaker(marginright - snow[i].size); }
            if (snowingzone === 2) { snow[i].posx = randommaker(marginright / 2 - snow[i].size); }
            if (snowingzone === 3) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4; }
            if (snowingzone === 4) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2; }
            snow[i].posy = 0;
        }
    }
    const timer: any = setTimeout(movesnow, 50);
}

for (let i: any = 0; i <= snowmax; i++) {
    document.write(`<span id='s${i}' style='position:absolute;top:-${snowmaxsize}px;'>${snowletter}</span>`);
}

if (browserok) {
    window.onload = initsnow;
}
