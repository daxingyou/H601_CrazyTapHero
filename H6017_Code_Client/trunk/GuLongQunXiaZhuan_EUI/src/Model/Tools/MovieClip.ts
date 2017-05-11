module Model {
	/**
	 *
	 * @author 
	 *
	 */
    export class MovieClip {

        private i:number = 0;
        private rate: number;
        private list: Array<string>;
        private image: eui.Image;
//        private onCallBack :Function = null;
        
        
        public constructor(_image?:eui.Image,_list?:Array<string>,_rate?:number) {
            this.image = _image;
            this.rate = _rate;
            this.list = _list;
        }
        
        public play(_onCallBack?:Function) {
            egret.setTimeout(() => { 
                var a = _onCallBack;
                this.image.source = this.list[this.i];
                this.i++;
                if(this.i < this.list.length) {
                    this.play(_onCallBack);
                } else { 
                    this.image.source = null;
                    if(_onCallBack != null) { 
                        _onCallBack();
                    }
                }    
            },this,1000/this.rate);
        }
	}
}
