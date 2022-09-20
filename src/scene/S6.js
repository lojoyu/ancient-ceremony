import Matter from "matter-js";

import bgPath from '../assets/s6/手腳畫面/6-手腳畫面.png';
import fgPath from '../assets/s6/手腳畫面/6-右手大拇指.png';
import ballPath from '../assets/s6/手腳畫面/巫珠.png';
import stickPath from '../assets/s6/手腳畫面/竹管.png'
const countdownPath = import.meta.glob("./assets/s6/倒數畫面/*");

export default class S6 {
    

    constructor(p) {
        this.p = p;
        this.boxes = [];
    }

    preload = () => {
        let p = this.p;

        // for (let i=0; i<countdownPath.length; i++){
        //     this.countDowns.push(p.loadImage(countdownPath[i]));
        //     this.countDowns[i].resize(p.width, p.height);
        // }
        
        this.bg = p.loadImage(bgPath);
        this.fg = p.loadImage(fgPath);
        this.ball = p.loadImage(ballPath);
        this.stick = p.loadImage(stickPath);
        
        
    }

    setup = () => {

        const Engine = Matter.Engine
        const Bodies = Matter.Bodies
        const World = Matter.World
        const Runner = Matter.Runner

        let p = this.p;
        this.bg.loadPixels();
        this.fg.loadPixels();
        this.ball.loadPixels();
        this.stick.loadPixels();

        this.stickSize = {w: this.stick.width, h: this.stick.height};
        this.ballSize = {w: this.ball.width, h: this.ball.height};

        this.resizeImgs();


        this.engine = Engine.create();
        this.world = this.engine.world

        Runner.run(this.engine)
        this.setupWall();
        this.stickBody = this.newRectImgBody(this.stick, 0, 0, this.stickSize.w, this.stickSize.h);
        this.ballBody = this.newRectImgBody(this.ball, 0, -this.bgSize.h/5, this.ballSize.w, this.ballSize.h, false);
        console.log(this.ballBody.id);
        console.log(this.ground.id);

        Matter.Events.on(this.engine, 'collisionStart', this.collideDetect)
    }

    collideDetect = (event) => {
        for(let pair of event.pairs){
            console.log(pair.bodyA.id, pair.bodyB.id);
            let toGround = (pair.bodyA.id == this.ballBody.id && pair.bodyB.id == this.ground.id);
            toGround |= (pair.bodyB.id == this.ballBody.id && pair.bodyA.id == this.ground.id);
            if (toGround) {
                console.log('to Ground!');
                break;
            }
        }
    }

    draw = () => {
        let p = this.p;

        p.drawBg(this.bg, this.bgSize);
        
        Matter.Body.rotate(this.stickBody, 0.01);
        this.stickBody.show(p);
        this.ballBody.show(p);

        p.drawBg(this.fg, this.bgSize);

        // this.boxes.push(this.Box(200, -p.height, 10, 10));
        // this.boxes.forEach((b) => {b.show(p)});
    }

    relPosSave = (x, y) => {
        if (this.bgSize.w == 0 || this.bgSize.h == 0) return;
        let percentX = x / this.bgSize.w;
        let percentY = y / this.bgSize.h;
        return {x: percentX, y: percentY};
    }
        
    relPosRestore = (percentX, percentY) => {
        if (this.bgSize.w == 0 || this.bgSize.h == 0) return;
        return {x: percentX * this.bgSize.w, y: percentY * this.bgSize.h}
    }
    

    beforeResize = () => {
        this.saveBodyInfo(this.stickBody);
        this.saveBodyInfo(this.ballBody);
        
    }

    saveBodyInfo = (body) => {
        if (body != undefined) {
            body.oriRP = this.relPosSave(body.position.x, body.position.y);
        }
    }

    afterResize = () => {
        this.resizeImgs();
        this.resizeBody();
    }

    resizeImgs = () => {
        let p = this.p;
        if (this.bg) this.bgSize = p.calculateImgScale(this.bg, p.width, p.height);
        let r = 0;
        if (this.stickSize) {
            r = this.stickSize.w / this.stickSize.h;
            this.stickSize = {w: this.bgSize.w/1.5, h: this.bgSize.w/(1.5*r)};
        }
        if (this.ballSize) {
            r = this.ballSize.w / this.ballSize.h;        
            this.ballSize = {w: this.bgSize.h*r/10, h: this.bgSize.h/10};
        }
        
        
    }

    resizeBody = () => {
        
        this.restoreBodyInfo(this.stickBody, this.stickSize);
        this.restoreBodyInfo(this.ballBody, this.ballSize);
        this.restoreBodyInfo_(this.ground, 
                {w: this.bgSize.w, h: this.wallW}, 
                {x: 0, y: this.bgSize.h/2});
        this.restoreBodyInfo_(this.rightWall, 
            {h: this.bgSize.h, w: this.wallW}, 
            {y: 0, x: this.bgSize.w/2});
        //this.restoreBodyInfo(this.ground, {w: this.bgSize.w, h: this.wallW});
        //this.restoreBodyInfo(this.rightWall, {h: this.bgSize.h, w: this.wallW});
        // if (this.ground) {
        //     Matter.Body.setPosition(this.ground, {x: 0, y: this.bgSize.h/2});
        //     Matter.Body.scale(this.ground, this.bgSize.w/this.ground.w, this.wallW/this.ground.h);
        // }
    }

    restoreBodyInfo_ = (body, size, center) => {
        if (body) {
            Matter.Body.setPosition(body, center);
            //Matter.Body.setCentre(body, center);
            Matter.Body.scale(body, size.w/body.w, size.h/body.h)
            body.w = size.w;
            body.h = size.h;
        }
        
    }

    restoreBodyInfo = (body, size) => {
        if (body && body.oriRP) {
            this.restoreBodyInfo_(body, size, this.relPosRestore(body.oriRP.x, body.oriRP.y));
        }
    }

    Box = (x, y, w, h) => {
        this.body = Matter.Bodies.circle(x, y, w/2, h/2)
        Matter.World.add(this.world, this.body)
        this.body.w = w
        this.body.h = h
    
        this.body.show = function(p){
            var pos = this.position
            var angle = this.angle
          
            p.push()
            p.translate(pos.x, pos.y)
            p.rotate(angle)
            p.rectMode(p.CENTER)
             // print(angle)
            p.ellipse(0,0,this.w,this.h)
            p.pop()
        }

        return this.body;
    }

    newRectImgBody = (img, x, y, w, h, isStatic=true, offset={w: 0, h: 0}) => {
        let body = Matter.Bodies.rectangle(x, y, w+offset.w, h+offset.h, {isStatic: isStatic})
        Matter.World.add(this.world, body)
        body.w = w
        body.h = h
        body.img = img
    
        body.show = function(p){
            var pos = this.position
            var angle = this.angle
          
            p.push()
            p.translate(pos.x, pos.y)
            p.rotate(angle)
            p.rectMode(p.CENTER)
            p.rect(0, 0, this.w, this.h);
            p.imageMode(p.CENTER);
            p.image(this.img, 0, 0, this.w, this.h);
            
            p.pop()
        }

        return body;
    }

    newWall = (x, y, w, h) => {
        let body = Matter.Bodies.rectangle(x, y, w, h, {isStatic: true})
        Matter.World.add(this.world, body)
        body.w = w
        body.h = h
    
        body.show = function(p){
            var pos = this.position
            var angle = this.angle
          
            p.push()
            p.translate(pos.x, pos.y)
            p.rotate(angle)
            p.rectMode(p.CENTER)
            p.rect(0, 0, this.w, this.h);
            
            p.pop()
        }

        return body;
    }

    setupWall = () => {
        this.wallW = 20;
        this.ground = this.newWall(0, this.bgSize.h/2, this.bgSize.w, this.wallW);
        this.rightWall = this.newWall(this.bgSize.w/2, 0, this.wallW, this.bgSize.h)
    }
    
}

