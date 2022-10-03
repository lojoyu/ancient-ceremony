//import S6 from './scene/S6'
import Button from './button';
import game from './scene/game';
import fontPath from './assets/SourceHanSansHWTC-VF.ttf'
import bgpat1 from './assets/game/BG 01.png';
import bgpat2 from './assets/game/BG 02.png';
import logo from './assets/game/LOGO.png';
import btn1 from './assets/game/Start button 01.png';
import btn2 from './assets/game/Start button 02.png';

export default function sketch(p) {

    let scenes = [];
    let snow = 0;
    let myFont;
    let pg;
    let level = -1;
    let c1 = p.color(255);
    let c2 = p.color(0);
    let bgpatImg = [];
    let logoImg;
    let btnImg = [];
    let btns = [];
    let toRotate = false;

    p.preload = () => {
        console.log(fontPath, p.loadFont);
        myFont = p.loadFont('https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff');
        //preload scenes
        scenes.push(new game(p, p.nextLevel, 1, '第一關  成年之禮', '請配對出南島語族成年禮使用的器物'))
        scenes.push(new game(p, p.nextLevel, 2, '第二關  交誼之禮', '請配對出南島語族貿易及交換的器物'))
        scenes.push(new game(p, p.nextLevel, 3, '第三關  心靈之禮', '請配對出南島語族占卜祭祀的器物'))
        for (let i =0; i<3; i++) {
            scenes[i].preload();
        }
        

        bgpatImg.push(p.loadImage(bgpat1));
        bgpatImg.push(p.loadImage(bgpat2));
        btnImg.push(p.loadImage(btn1));
        btnImg.push(p.loadImage(btn2));
        logoImg = p.loadImage(logo);

    }

    p.nextLevel = () => {
        //level += 1;
        if (level < 3) {
            level += 1;

            if (level == 1) {
                c2 = p.color(0, 0, 40);
                c1 = p.color(127, 127, 183);
            } else if (level == 2) {
                c2 = p.color(71, 0, 0)
                c1 = p.color(248, 138, 91)
            } else if (level == 3) {
                c2 = p.color(52, 57, 18)
                c1 = p.color(175, 194, 61)
            }
            p.setGradient(0, 0, p.width/2, p.height, c1, c2);
            p.setGradient(p.width/2, 0, p.width/2, p.height, c2, c1);
            scenes[level].start();
            
        }

        
    }

    p.setup = () => {
        
        p.createCanvas(p.windowWidth, p.windowHeight);
        //setup scenes
        for (let i =0; i<3; i++) {
            scenes[i].setup();
        }

        p.textFont(myFont);
        p.textSize(p.height / 15);
        p.textAlign(p.LEFT, p.CENTER);
        pg = p.createGraphics(p.windowWidth, p.windowHeight);

        // p.setGradient(-p.width/2, -p.height/2, p.width/2, p.height, c1, c2);
        // p.setGradient(0, -p.height/2, p.width/2, p.height, c2, c1);
        
        c2 = p.color(52, 57, 18)
        c1 = p.color(175, 194, 61)
        p.setGradient(0, 0, p.width/2, p.height, c1, c2);
        p.setGradient(p.width/2, 0, p.width/2, p.height, c2, c1);

        bgpatImg[0].loadPixels();
        bgpatImg[1].loadPixels();
        btnImg[0].loadPixels();
        btnImg[1].loadPixels();
        logoImg.loadPixels();

        for (let i=0; i<btnImg.length; i++) {
            btns.push(new Button(p, 0, 0, 0, 0, btnImg[i]));
        }
    }

    p.draw = () => {
        p.clear();
        if (toRotate) {
            p.background(0);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255);
            p.textSize(p.width / 20);
            p.text('請旋轉畫面以繼續遊戲', p.width/2, p.height/2);
            return;
        }
        p.imageMode(p.CENTER);
        p.image(pg, p.width/2, p.height/2, p.width, p.height);

        //draw scenes
        if (level > 0) {
            scenes[level-1].draw();
        }
        else {
            //p.image(pg, 0, 0, p.width, p.height);
            let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
            p.image(bgpatImg[0], p.width/2, p.height/2, size.w, size.h);
            p.image(bgpatImg[1], p.width/2, p.height/2, size.w, size.h);
            //console.log(logoImg);
            let logosize = p.calculateImgScale(logoImg, p.width, p.height/1.8);
            p.image(logoImg, p.width/2, p.height/2-logosize.h/4, logosize.w, logosize.h);
            
            let btnsize = p.calculateImgScale(btnImg[0], p.width, p.height/6);
            //p.image(btnImg[0])
            //console.log(btns);
            btns[0].draw(p.width/2, p.height/2 + p.height/4, btnsize.w, btnsize.h);

        }
        // p5.image(bg, -p.width/2., -p.height/2.);
        // p.background(200);
        // p.normalMaterial();
        // p.push();
        // p.rotateZ(p.frameCount * 0.01);
        // p.rotateX(p.frameCount * 0.01);
        // p.rotateY(p.frameCount * 0.01);
        // p.plane(100);
        // p.pop();
        
    };

    p.mousePressed = () => {
        // console.log("Canvas mouse!")
        if (level == -1) {
            if(btns[0].over({x: p.mouseX, y: p.mouseY})) p.nextLevel();
        }
        else if (level == 0) {
            if(btns[1].over({x: p.mouseX, y: p.mouseY})) p.nextLevel();
        }
        else if (scenes[level-1]) scenes[level-1].mousePressed();
    }

    p.resizeImgScale = (img, w, h) => {
        let size = p.calculateImgScale(img, w, h);
        if (size.w == 0 || size.h == 0) return;
        img.resize(size.w, size.h);
    }

    p.calculateImgScale = (img, w, h) => {
        let r = img.width/img.height;
        let nr = w/h;
        if (r > nr) { // sacrifice height
            return({w: w, h: w/r, r: w/img.width});
        } else return({w: h * r, h:h, r: h/img.height});
    }

    p.calculateImgScale2 = (img, w, h) => {
        let r = img.width/img.height;
        let nr = w/h;
        if (r < nr) { // sacrifice height
            return({w: w, h: w/r, r: w/img.width});
        } else return({w: h * r, h:h, r: h/img.height});
    }

    p.updateWithProps = props => {
        if (props.size && props.size.w != 0 && props.size.h != 0) {
            if (props.size.h > props.size.w) toRotate = true;
            else toRotate = false;
            p.resizeCanvas(props.size.w, props.size.h);
            console.log(toRotate);
        }
    }

    p.drawBg = (bg, bgSize) => {
        let x = -p.width/2 + (p.width - bgSize.w)/2;
        let y = -p.height/2 + (p.height - bgSize.h)/2;
        p.image(bg, x, y, bgSize.w, bgSize.h);
    }

    p.relPosSave = (x, y) => {
        if (p.width == 0 || p.height == 0) return;
        console.log(y, p.height, y / p.height);
        let percentX = x / p.width;
        let percentY = y / p.height;
        return {x: percentX, y: percentY};
    }
        
    p.relPosRestore = (percentX, percentY) => {
        if (p.width == 0 || p.height == 0) return;
        return {x: percentX * p.width, y: percentY * p.height}
    }


    p.setGradient = (x, y, w, h, c1, c2) => {
        pg.noFill();
    
        for (let i = x; i <= x + w; i++) {
            let inter = p.map(i, x, x + w, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            pg.stroke(c);
            // p.noStroke();
            // p.fill(c);
            // p.rect(i, y + h/2, 0.1, h);
            pg.line(i, y, i, y + h);
        }
    }
  
    
}
