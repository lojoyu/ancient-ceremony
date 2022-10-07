export default class card {
    
    constructor(p, image_path, matchNum) {
        this.p = p;
        this.image_path = image_path;
        this.isBack = true;
        this.isMatch = false;
        this.isChoosed = false;
        this.matchNum = matchNum;
        this.cardPos = [];
        this.preload();
    }
    
    preload = () => {
        let p = this.p;
        this.card = p.loadImage(this.image_path);
    }

    setup = () => {
        let p = this.p;
        this.card.loadPixels();
    }

    draw = (img_len, back_img) => {
        let p = this.p;
        p.imageMode(p.CENTER);
        if(this.isBack){
            p.image(this.backImg, this.cardPos[0], this.cardPos[1], this.image_size.width, this.image_size.height);
        }
        else{
            p.image(this.card, this.cardPos[0], this.cardPos[1], this.image_size.width, this.image_size.height);
        }   
    }

    calImageScale = (image_width) => {
        let rate = (this.card.height/this.card.width);
        let width_new = image_width;
        let height_new = width_new * rate;

        this.image_size = {width: width_new, height: height_new};
        return [width_new, height_new]
    }

    mousePressed = () => {
        if (this.isBack){
            this.isBack = false;
            this.isChoosed = true;
        }
        // else{
        //     if (this.isChoosed) {
        //         console.log("This card is choosed");
        //     }else{
        //         this.isBack = true;
        //     }
        // }
    }

    cardStatusIsBack = () => {
        return this.isBack;
    }

    cardIsChoosed = () => {
        return this.isChoosed;
    }

    getCardMatchNum = () => {
        return this.matchNum;
    }

    setCardMatchStatus = (match) =>{
        this.isMatch = match;
    }

    setPos = (pos) => {
        //card center point
        this.cardPos = pos;
        this.vertexSet = this.createPolygonVertexSet(pos, this.image_size.width/2);
    }

    getPos = () => {
        return this.cardPos;
        
    }

    setSize = (width) => {
        this.calImageScale(width);

    }

    setBack = (backImg) => {
        this.backImg = backImg
    }

    turnBack = () => {
        this.isBack = true;
    }

    checkIfChoosed = (point) => {
        if (!this.isBack) return false;
        return this.insidePolygon(point, this.vertexSet);
    }

    insidePolygon = (point, vertexSet) => {
        // console.log(point, vertexSet, this.p.width, this.p.height)
        var x = point[0], y = point[1];
        
        var inside = false;
        for (var i = 0, j = vertexSet.length - 1; i < vertexSet.length; j = i++) {
            var xi = vertexSet[i][0], yi = vertexSet[i][1];
            var xj = vertexSet[j][0], yj = vertexSet[j][1];
            
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        
        return inside;
    };

    createPolygonVertexSet = (coordinate, radius) => {
        let vertexSet = [
                    [coordinate[0]+radius, coordinate[1]],
                    [coordinate[0]+radius/2, coordinate[1]-(Math.sqrt(3)/2*radius)],
                    [coordinate[0]-radius/2, coordinate[1]-(Math.sqrt(3)/2*radius)],
                    [coordinate[0]-radius, coordinate[1]],
                    [coordinate[0]-radius/2, coordinate[1]+(Math.sqrt(3)/2*radius)],
                    [coordinate[0]+radius/2, coordinate[1]+(Math.sqrt(3)/2*radius)]
        ]
        return vertexSet;
    }

}