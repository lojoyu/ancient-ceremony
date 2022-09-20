import S6 from './scene/S6'

export default function sketch(p) {

    let scenes = [];
    let snow = 0;

    p.preload = () => {
        //preload scenes
        scenes = [new S6(p)];
        scenes[snow].preload();

        
    }

    p.setup = () => {
        
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        //setup scenes
        scenes[snow].setup();

        
    }

    p.draw = () => {
        p.clear();
        //draw scenes
        scenes[snow].draw();
      //  p5.image(bg, -p.width/2., -p.height/2.);
        // p.background(200);
        // p.normalMaterial();
        // p.push();
        // p.rotateZ(p.frameCount * 0.01);
        // p.rotateX(p.frameCount * 0.01);
        // p.rotateY(p.frameCount * 0.01);
        // p.plane(100);
        // p.pop();
        
    };

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
            if (scenes[snow]) {
                scenes[snow].beforeResize();
            }
            p.resizeCanvas(props.size.w, props.size.h);

            if (scenes[snow]) {
                scenes[snow].afterResize();
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
    
}
