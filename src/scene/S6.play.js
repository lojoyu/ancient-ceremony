import bgPath from '../assets/s6/手腳畫面/6-手腳畫面.png';
import fgPath from '../assets/s6/手腳畫面/6-右手大拇指.png';
import ballPath from '../assets/s6/手腳畫面/巫珠.png';
import stickPath from '../assets/s6/手腳畫面/竹管.png'
const countdownPath = import.meta.glob("./assets/s6/倒數畫面/*");

export default class S6 {
    constructor(p) {
        this.p = p;
    }

    preload = () => {
        let p = this.p;

        for (let i=0; i<countdownPath.length; i++){
            this.countDowns.push(p.loadImage(countdownPath[i]));
            this.countDowns[i].resize(p.width, p.height);
        }
        
        this.bg = p.loadImage(bgPath);
        this.fg = p.loadImage(fgPath);
        this.ball = p.loadImage(ballPath);
        this.stick = p.loadImage(stickPath);
        
    }

    setup = () => {
        let p = this.p;
        p.noSmooth();
        this.bg.loadPixels();
        this.fg.loadPixels();
        this.ball.loadPixels();
        this.stick.loadPixels();

        this.resizeImgs();

        this.ballSprite = new p.createSprite(0, 0);
        this.ballSprite.addImg(this.ball);

        this.stickSprite = new p.createSprite(0, 0);
        this.stickSprite.addImg(this.stick);

        this.s = new p.Sprite(0, 0, p.width, p.height);
        this.s.static = true;
        this.resizeSprites();
        
    }

    draw = () => {
        let p = this.p;
        p.clear();
        //this.resizeSprites();
        p.camera.off();
        //this.drawBg(this.bg);

        p.camera.on();
        p.background(255);
        this.ballSprite.x = 0;
        //this.ballSprite.y = -this.bgSize.h/5;
        this.ballSprite.y -= 1;
        this.s.y -= 1.;
        this.s.draw();
        //this.stickSprite.draw();
        this.ballSprite.draw();

        p.camera.off();
        //this.drawBg(this.fg);
    }

    drawBg(bg) {
        let p = this.p;
        let x = -this.p.width/2 + (p.width - this.bgSize.w)/2;
        let y = -this.p.height/2 + (p.height - this.bgSize.h)/2;
        p.image(bg, x, y, this.bgSize.w, this.bgSize.h);
    }


    resizeImgs = () => {
        let p = this.p;
        this.bgSize = p.calculateImgScale(this.bg, p.width, p.height);
        console.log(p.width, p.height);
        this.stickSize = p.calculateImgScale(this.stick, this.bgSize.w/1.5, this.bgSize.h/1.5);
        this.ballSize = p.calculateImgScale(this.ball, this.bgSize.w/10, this.bgSize.h/10);

        this.resizeSprites();
        // console.log(p.camera.x, p.camera.y);
        // p.camera.x = -p.width/2.;
        // p.camera.y = -p.height/2.;
        // console.log('--', p.camera.x, p.camera.y);
    }

    resizeSprites = () => {
        let p = this.p;
        if (this.ballSprite) {
            this.ballSprite.scale = this.ballSize.r;
        }
        if (this.stickSprite) {
            this.stickSprite.scale = this.stickSize.r;
        }
    }


    
}