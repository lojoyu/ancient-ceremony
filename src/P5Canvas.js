//import S6 from './scene/S6'
import game from './scene/game';
import fontPath from './assets/SourceHanSansHWTC-VF.ttf'

export default function sketch(p) {

    let scenes = [];
    let snow = 0;
    let myFont;
    let pg;
    let level = 1;
    let c1 = p.color(255);
    let c2 = p.color(0);

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
        level = 1;
    }

    p.nextLevel = () => {
        //level += 1;
        if (level < 3) {
            level += 1;
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
        p.setGradient(0, 0, p.width/2, p.height, c1, c2);
        //p.setGradient(p.width/2, 0, p.width/2, p.height, c2, c1);
        
    }

    p.draw = () => {
        //p.clear();
        //p.image(pg, 0, 0, p.width, p.height);
        //draw scenes
        scenes[level-1].draw();
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
        if (scenes[level-1]) scenes[level-1].mousePressed();
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

    p.updateWithProps = props => {
        if (props.size && props.size.w != 0 && props.size.h != 0) {
            p.resizeCanvas(props.size.w, props.size.h);

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
