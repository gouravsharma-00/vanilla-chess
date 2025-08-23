// power utility

export default class Power {

    constructor() {
        this.whiteShield = true;
        this.blackShield = true;

        this.activeshieldwhite = null;
        this.activeshieldblack = null;
        
    }

    useShield(color) {
        if(color == 'black' && this.blackShield) {
            this.activeshieldblack = true;
            this.blackShield = false;
        }else if(this.whiteShield){
            this.activeshieldblack = true;
            this.whiteShield = false;
        }
    }

    expireShield(color) {
        if(color == 'black') {
            this.activeshieldblack = null;
        }

        this.activeshieldwhite = null;
    }
}