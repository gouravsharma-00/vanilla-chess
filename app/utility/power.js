// power utility

export default class Power {

    constructor() {
        // shield
        this.whiteShield = true;
        this.blackShield = true;
        // skip
        this.blackSkip = true;
        this.whiteSkip = true;

        // shield
        this.activeshieldwhite = null;
        this.activeshieldblack = null;
        // skip
        this.activeskipwhite = null;
        this.activeskipblack = null;
        
    }

    useShield(color) {
        if(color == 'black' && this.blackShield) {
            this.activeshieldblack = true;
            this.blackShield = false;
        }else if(this.whiteShield){
            this.activeshieldwhite = true;
            this.whiteShield = false;
        }
    }

    expireShield(color) {
        if(color == 'black') {
            this.activeshieldblack = null;
        }

        this.activeshieldwhite = null;
    }

    useSkip(color) {
        if(color == 'black' && this.blackSkip) {
            this.activeskipblack = true;
            this.blackSkip = false;

        }else if(this.whiteSkip){
            this.activeskipwhite = true;
            this.whiteSkip = false;
        }
    }

    expireSkip(color) {
        if(color == 'black') {
            this.activeskipblack = null;
        }

        this.activeskipwhite = null;
    }
}