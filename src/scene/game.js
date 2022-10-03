import card from './card';


export default class game {
    
    constructor(p, nextLevel, level=1, title='第一關  成年之禮', desc='請配對出南島語族成年禮使用的器物') {
        this.p = p;
        this.cards = [];
        this.back = [];
        this.pos = [];
        this.waitNext = 2000;
        this.turnback = 800;
        this.title = title;
        this.nextLevel = nextLevel;
        this.desc = desc;
        this.level = level;
        
        // this.card_is_match = [];
    }

    preload = () => {
        console.log('Game preload')
        let p = this.p;
        let level = this.level;


        this.back.push(p.loadImage(`Chap ${level}/卡牌內容_卡牌背面CH${level}.png`));
        // this.back.push(p.loadImage(card_back2_path));
        // this.back.push(p.loadImage(card_back3_path));

        this.sucImg = p.loadImage(`Chap ${level}/Success.png`);
        this.failImg = p.loadImage(`Chap ${level}/Fail.png`);
        
        let c = 'A';
        if (this.level == 2) c = 'B'
        else if (this.level == 3) c = 'C'
        
        for (let i=0; i<5; i++) {
            this.cards.push(new card(p, `Chap ${level}/卡牌內容_${c}${i+1}.png`, i));
            this.cards.push(new card(p, `Chap ${level}/卡牌內容_${c}${i+1}1.png`, i));
        } 

    }

    setup = () => {
        console.log('Game setup')
        let p = this.p;
        this.img_size = p.width/10;
             
    }

    start = () => {
        for (let i=0; i< this.back.length; i++){
            this.back[i].loadPixels();
        }
        for (let i=0; i< this.cards.length; i++){
            this.cards[i].setBack(this.back[0]);
            this.cards[i].setup();
            this.cards[i].setSize(this.img_size);
        }
        this.sucImg.loadPixels();
        this.failImg.loadPixels();

        this.setRandomCardPos(this.cards, this.img_size/1.8);   
        this.count = 60;
        this.prev = Date.now();
        this.card_cache = -1;
        this.card_match = 0;
        this.suc = false;
        this.fail = false;
        for (let i=0; i< this.cards.length; i++){
            this.cards[i].turnBack();
        }
    }


    draw = () => {
    
        let p = this.p;
        for (let i=0; i< this.cards.length; i++){
            this.cards[i].draw();
        }
        p.fill(255);
        p.textSize(p.height / 15);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(this.title, p.width/5, p.height/10);
        p.textAlign(p.RIGHT, p.CENTER);
        p.text(`Time left ${this.count > 9 ? this.count : "0"+this.count} sec`, p.width - p.width/5, p.height/10);
        p.textSize(p.height / 20);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(this.desc, p.width/2, p.height - p.height/10);

        if (this.suc) {
            let size = p.calculateImgScale(this.sucImg, p.width/1.5, p.height/1.2);
            p.image(this.sucImg, p.width/2, p.height/2, size.w, size.h);
            return;
        } else if (this.fail) {
            let size = p.calculateImgScale(this.failImg, p.width/1.5, p.height/1.2);
            p.image(this.failImg, p.width/2, p.height/2, size.w, size.h);
            return;
        }

        
        if (Date.now() - this.prev > 1000) {
            this.prev = Date.now();
            this.count --;
            if (this.count == 0) {
                this.fail = true;
                setTimeout(()=>{
                    this.start();
                }, this.waitNext)
            }
        }
    }

    setRandomCardPos = (cards, distance) => {
        let x = 0 + this.p.width/2;
        let y = (Math.sqrt(3)/2*distance) + this.p.height/2;
        let pos = [
                [x,y], 
                [x, y-(Math.sqrt(3)*distance)],
                [x+1.5*distance, y-(Math.sqrt(3)/2*distance)],
                [x-1.5*distance, y-(Math.sqrt(3)/2*distance)],
                [x+3*distance, y],
                [x-3*distance, y],
                [x+3*distance, y-(Math.sqrt(3)*distance)],
                [x-3*distance, y-(Math.sqrt(3)*distance)],
                [x+4.5*distance, y-(Math.sqrt(3)/2*distance)],
                [x-4.5*distance, y-(Math.sqrt(3)/2*distance)]
            ]
        this.shuffleArray(pos);
        for (let i=0; i< cards.length; i++){
            cards[i].setPos(pos[i]);
        }
        
        return pos;
    }
    
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    mousePressed = () => {
        if (this.card_cache2 || this.suc || this.fail) return;
        let point = [this.p.mouseX, this.p.mouseY];
        let cards = this.cards;
        let card_num;
        for (let i=0; i< cards.length; i++){
            if (cards[i].checkIfChoosed(point, this.img_size/2)){
                card_num = i;
                console.log("Card no:" + card_num);
            }
        }
        
        if (card_num != undefined) {
            
            cards[card_num].mousePressed();
            this.checkIsCardMatched(card_num);
        }
        
    }

    // Need to check
    checkIsCardMatched = (card_no) => {
       
        if(this.card_cache == -1){
            this.card_cache = card_no;
        }
        else{
            
            console.log(this.card_cache, card_no, this.cards[card_no].getCardMatchNum(), this.cards[this.card_cache].getCardMatchNum() );
            if (this.cards[card_no].getCardMatchNum() == this.cards[this.card_cache].getCardMatchNum()) {
                console.log("Pair!!");
                this.card_cache = -1;
                this.card_match ++;
                if (this.card_match == 5) {
                    this.suc = true;
                    setTimeout(()=>{
                        this.nextLevel();
                    }, this.waitNext)
                }
                return true;
            }
            else{ 
                console.log("Not Match!!");
                //this.card_close = [card_no, Date.now()];
                this.card_cache2 = true;
                setTimeout(()=>{
                    this.cards[card_no].turnBack();
                    this.cards[this.card_cache].turnBack();
                    this.card_cache = -1;
                    this.card_cache2 = false;
                }, this.turnback);
            }
        }
        return false;
    }
}

