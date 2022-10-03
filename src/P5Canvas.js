//import S6 from './scene/S6'
import Button from './button';
import game from './scene/game';
import fontPath from './assets/SourceHanSansHWTC-VF.ttf'
import bgpat1 from './assets/game/BG 01.png';
import bgpat2 from './assets/game/BG 02.png';
import logo from './assets/game/LOGO.png';
import btn1 from './assets/game/Start button 01.png';
import btn2 from './assets/game/Start button 02.png';
import btn3 from './assets/game/FB share.png';
import organizors from './assets/game/Organizers.png';

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
    let orgImg;

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
        btnImg.push(p.loadImage(btn3));
        logoImg = p.loadImage(logo);
        orgImg = p.loadImage(organizors);

    }

    p.nextLevel = () => {
        //level += 1;
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
        } else if (level == 4) {
            c2 = p.color(52, 57, 18)
            c1 = p.color(175, 194, 61)
        }
        p.setGradient(0, 0, p.width/2, p.height, c1, c2);
        p.setGradient(p.width/2, 0, p.width/2, p.height, c2, c1);

        if (level < 4 && level > 0)scenes[level-1].start();
        
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
        btnImg[2].loadPixels();
        logoImg.loadPixels();
        orgImg.loadPixels();

        for (let i=0; i<btnImg.length; i++) {
            btns.push(new Button(p, 0, 0, 0, 0, btnImg[i]));
        }
    }

    p.draw = () => {
        p.clear();
        p.imageMode(p.CENTER);
        p.image(pg, p.width/2, p.height/2, p.width, p.height);

        if (level == 4) {
            let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
            p.image(bgpatImg[0], p.width/2, p.height/2, size.w, size.h);
            p.image(bgpatImg[1], p.width/2, p.height/2, size.w, size.h);

            let title_text = "禮器配對挑戰";
            let challenge_suc_text = "挑戰成功！";
            let challenge_fail_text = "挑戰失敗。";
            let content_text = "你真棒！成為南島禮儀的小達人，順利完成配對任務。\n歡迎點擊按鈕分享展覽資訊，一起認識南島的禮儀文化！";
            
            p.textSize(p.height / 15);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255);
            p.text(title_text, p.width/2, p.height/5);
            p.textSize(p.height/8);
            p.text(challenge_suc_text, p.width/2, p.height/2.8);
            p.textSize(p.height/30);
            p.text(content_text, p.width/2, p.height/1.8);

            let btnsize = p.calculateImgScale(btnImg[2], p.width, p.height/6);
            btns[2].draw(p.width/2, p.height/2 + p.height/4, btnsize.w, btnsize.h);

            let orgSize = p.calculateImgScale(orgImg, p.width/1.5, p.height/1.8);
            p.image(orgImg, p.width/2, p.height-p.height/9, orgSize.w, orgSize.h);
        }
        //draw scenes
        else if (level > 0) {
            scenes[level-1].draw();
        }
        else if (level == -1) {
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
        else if (level == 0) {

            let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
            p.image(bgpatImg[0], p.width/2, p.height/2, size.w, size.h);
            p.image(bgpatImg[1], p.width/2, p.height/2, size.w, size.h);

            let title_text = "遊戲說明";
            let content_text = "南島語族是注重禮儀的人群，\n「禮器」即是儀式中使用物\n品，也傳達了南島文化最深層\n的一面。快來挑戰你對南島禮\n器的認識吧！";
            
            p.textSize(p.height / 15);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255, 255, 255);
            p.text(title_text, p.width/2, p.height/5);
            p.textSize(p.height/30);
            p.text(content_text, p.width/2, p.height/2.5);

            let btnsize = p.calculateImgScale(btnImg[0], p.width, p.height/6);
            btns[1].draw(p.width/2, p.height/2 + p.height/4, btnsize.w, btnsize.h);

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

    p.mouseClicked = () => {
        console.log("Canvas mouse!")
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
