//import S6 from './scene/S6'
import Button from './button';
import game from './scene/game';
import fontPath from './assets/SourceHanSansHWTC-VF.ttf'
import bgpat1 from './assets/game/BG 01.png';
import bgpat2 from './assets/game/BG 02.png';
import bgpat3 from './assets/game/BG Hex.png';
import logo from './assets/game/LOGO.png';
import btn1 from './assets/game/Start button 01.png';
import btn2 from './assets/game/Start button 02.png';
import btn3 from './assets/game/FB share.png';
import lastT from './assets/game/lastTitle.png';
import organizors from './assets/game/Organizers.png';
import yesurl from './assets/sound/YES.mp3';
import nourl from './assets/sound/NO.mp3';
import winnerurl from './assets/sound/WINNER.mp3';
import loserurl from './assets/sound/LOSER.mp3';
import fireurl from './assets/game/firework.gif';
// import * as p5 from "p5"
// window.p5 = P5
// import 'p5/lib/addons/p5.sound'

// import "p5js-wrapper/sound"
// import "react-p5-wrapper/node_modules/p5/lib/addons/p5.sound";


export default function sketch(p) {

    let scenes = [];
    let snow = 0;
    let myFont;
    let boldFont;
    let pg;
    let level = -1;
    let c1 = p.color(255);
    let c2 = p.color(0);
    let bgpatImg = [];
    let logoImg;
    let btnImg = [];
    let btns = [];
    let toRotate = false;
    let orgImg;
    let lastTitle;
    let floating = 0;
    let floatingd = 1;
    let yessound, nosound, winnersound, losersound;
    let gif, gif_createImg;


    p.preload = () => {
        console.log(fontPath, p.loadFont);
        myFont = p.loadFont('https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Medium.woff');
        boldFont = p.loadFont('https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Bold.woff');

        gif = p.loadImage(fireurl);
       // gif_createImg = p.createImg(fireurl);

        //let song = p.loadSound(bgsound);
        yessound = new Audio(yesurl);
        nosound = new Audio(nourl);
        winnersound = new Audio(winnerurl);
        losersound = new Audio(loserurl);

        //preload scenes
        scenes.push(new game(p, p.nextLevel, 1, '第一關  請配對出南島語族成年禮使用的器物', '請配對出南島語族成年禮使用的器物'))
        scenes.push(new game(p, p.nextLevel, 2, '第二關  請配對出南島語族貿易及交換的器物', '請配對出南島語族貿易及交換的器物'))
        scenes.push(new game(p, p.nextLevel, 3, '第三關  請配對出南島語族占卜祭祀的器物', '請配對出南島語族占卜祭祀的器物'))
        for (let i=0; i<3; i++) {
            scenes[i].preload();
        }
        
        bgpatImg.push(p.loadImage(bgpat1));
        bgpatImg.push(p.loadImage(bgpat2));
        bgpatImg.push(p.loadImage(bgpat3));

        btnImg.push(p.loadImage(btn1));
        btnImg.push(p.loadImage(btn2));
        btnImg.push(p.loadImage(btn3));
        logoImg = p.loadImage(logo);
        orgImg = p.loadImage(organizors);
        lastTitle = p.loadImage(lastT);

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
            c2 = p.color(20, 23, 19)
            c1 = p.color(175, 194, 61)
            gif.setFrame(0);
            gif.play();
        }
        p.setGradient(0, 0, p.width/2, p.height, c1, c2, true);
        p.setGradient(p.width/2, 0, p.width/2, p.height, c2, c1, false);

        if (level < 4 && level > 0) scenes[level-1].start();
        
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
        
        c2 = p.color(20, 23, 19)
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
        //bgsound.play();
        
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

        if (level == 4) {
            let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
            p.image(bgpatImg[0], p.width/2, p.height/2, size.w, size.h);
            p.image(bgpatImg[1], p.width/2, p.height/2, size.w, size.h);

            let title_text = "禮器配對挑戰";
            let challenge_suc_text = "挑 戰 成 功 !";
            let challenge_fail_text = "挑戰失敗。";
            let content_text = "你真棒！成為南島禮儀的小達人，順利完成配對任務。\n歡迎點擊按鈕分享展覽資訊，一起認識南島的禮儀文化！";
            
            p.textSize(p.height / 15);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255);
            p.imageMode(p.CENTER);
            let titlesize = p.calculateImgScale(lastTitle, p.width, p.height);
            p.image(lastTitle, p.width/2, p.height/7, titlesize.w, titlesize.h);

            p.textSize(p.height/8);
            p.text(challenge_suc_text, p.width/2, p.height/3.2);
            p.textSize(p.height/20);
            p.textLeading(p.height/13);
            p.text(content_text, p.width/2, p.height/1.9);

            let btnsize = p.calculateImgScale(btnImg[2], p.width, p.height/5);
            btns[2].draw(p.width/2, p.height/2 + p.height/3.9, btnsize.w, btnsize.h);

            let orgSize = p.calculateImgScale(orgImg, p.width/1.5, p.height/1.8);
            p.image(orgImg, p.width/2, p.height-p.height/15, orgSize.w, orgSize.h);

            p.imageMode(p.CENTER);
            
            let gsize = p.calculateImgScale(gif, p.width, p.height);
            p.image(gif, p.width/2, p.height/2, gsize.w, gsize.h )
            // console.log(gif_createImg.width, p.width, gsize.w);
            // gif_createImg.size(50, 50);
            // gif_createImg.position(0, 0);
            
        }
        //draw scenes
        else if (level > 0) {
            scenes[level-1].draw();
        }
        else if (level == -1) {
             //p.image(pg, 0, 0, p.width, p.height);
             let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
             p.image(bgpatImg[0], p.width/2, p.height/2 + floating, size.w, size.h);
             p.image(bgpatImg[1], p.width/2, p.height/2 - floating, size.w, size.h);
             //console.log(logoImg);
             let logosize = p.calculateImgScale(logoImg, p.width, p.height/1.8);
             p.image(logoImg, p.width/2, p.height/2-logosize.h/4, logosize.w, logosize.h);
             
             let btnsize = p.calculateImgScale(btnImg[0], p.width, p.height/5);
             //p.image(btnImg[0])
             //console.log(btns);
             btns[0].drawMove(p.width/2, p.height/2 + p.height/3.6, btnsize.w, btnsize.h);
        }
        else if (level == 0) {

            let size = p.calculateImgScale2(bgpatImg[0], p.width, p.height);
            p.image(bgpatImg[0], p.width/2, p.height/2 + floating, size.w, size.h);
            p.image(bgpatImg[1], p.width/2, p.height/2 - floating, size.w, size.h);

            let title_text = "遊戲說明";
            let content_text = "南島語族是注重禮儀的人群，「禮器」是儀式中\n使用的物品，也傳達了南島文化最深層的一面。\n快來挑戰你對南島禮器的認識吧！";
            
            p.textFont(boldFont);
            p.textSize(p.height / 10);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(255, 255, 255);
            p.text(title_text, p.width/2, p.height/5);

            p.textFont(myFont);
            p.textSize(p.height / 15);
            p.textLeading(p.height / 12);
            p.text(content_text, p.width/2, p.height/2.1);
            p.textFont(boldFont);
            let btnsize = p.calculateImgScale(btnImg[0], p.width, p.height/5);
            btns[1].drawMove(p.width/2, p.height/2 + p.height/3.6, btnsize.w, btnsize.h);

        }
        if (floating > p.height/10) floatingd = -1;
        else if (floating < -p.height/10) floatingd = 1;
        floating += 0.1 * floatingd;

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
        else if (level == 4) {
            if(btns[2].over({x: p.mouseX, y: p.mouseY})) window.open('https://www.facebook.com/sharer/sharer.php?u=https://lojoyu.github.io/ancient-ceremony/')
        }
    }

    p.sound = (isCard, isWin)=>{
        let s;
        if (isCard) {
            if (isWin) s = yessound;
            else s = nosound;
        } else {
            if (isWin) s = winnersound;
            else s = losersound;
        }
        s.load();
        s.play();
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
            var newPG = p.createGraphics(props.size.w, props.size.h);
            pg = newPG;
            p.setGradient(0, 0, props.size.w/2, props.size.h, c1, c2, true);
            p.setGradient(props.size.w/2, 0, props.size.w/2, props.size.h, c2, c1, false);
            console.log(toRotate);
            
            if (level > 0 && level < 4) {
                scenes[level-1].resize();
            }
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


    p.setGradient = (x, y, w, h, c1, c2, up=true) => {
        if (!pg) return; 
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
