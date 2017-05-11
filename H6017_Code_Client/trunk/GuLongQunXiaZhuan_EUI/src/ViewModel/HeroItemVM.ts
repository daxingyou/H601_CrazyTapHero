module ViewModel {
	/**
	 * @author: fangchao
	 * @revise: zhu_jun
	 * @date: 2016.01.07.
	 */
	export class HeroItemVM extends eui.Component{
    	/**
    	 * @动画父节点.
    	 */ 
    	private uiGroup:eui.Group;
        /**
         * @回调方法.
         */ 
    	public onCallBack:Function = null;
    	/**
    	 * @序列帧对象.
    	 */ 
    	public movieClip:egret.MovieClip=null;
    	
        /**
         * @英雄攻击、待机动画播放.
         * @param: _uiGroup父节点.
         * @param: _name测试角色名,仅供测试时使用.
         */ 
		public constructor(_uiGroup:eui.Group) {
            super();
            this.uiGroup = _uiGroup;
            
        }
       
        /**
         * @初始化并播放特效.
         */ 
        public initMovieClip(_json: string,_png: string,_mcName: string,_playTimes: number = -1,_onCallBack?: Function,_switch:boolean=true) :egret.MovieClip{ 
            this.onCallBack = _onCallBack;
            var mcData: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(_json),RES.getRes(_png));
            this.movieClip = new egret.MovieClip(mcData.generateMovieClipData(_mcName));
            if(_switch){
                this.movieClip.addEventListener(egret.Event.COMPLETE,this.onEvent,this);
            }else{
                this.movieClip.addEventListener(egret.MovieClipEvent.FRAME_LABEL,this.onEvent,this);
            }
            this.uiGroup.addChild(this.movieClip);
            this.movieClip.play(_playTimes);
            return this.movieClip;
        }
        
        private onEvent(evt: egret.MovieClipEvent){
            if(this.onCallBack) this.onCallBack();//循环动画没传方法,所以不会进这里.
//            Model.console.log("zhujun: 循环动画没传方法,所以不会进这里. movie clip is " + this.movieClip);
//            if(this.movieClip) this.uiGroup.removeChild(this.movieClip);//因为有可能在连续点击时候已经被强制销毁,所以要做容错.
//            console.log("zhujun : mc play finish ! " + _mcName);
        }
        
        /**
         * @切换正在播放的MovieClip.
         * @1.不重复添加点击方法.
         * @2.不重复往场景上添加.
         * @敌人切换时使用.
         */ 
        public changeMovieClip(_json: string,_png: string,_mcName: string,_playTimes: number = -1,_onCallBack?:Function):egret.MovieClip{
            this.onCallBack = _onCallBack;
            if(this.movieClip){
//            console.log("zhujun: 切换正在播放的动画 !  ");
                this.movieClip.stop();
                var mcData: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(_json),RES.getRes(_png));
                this.movieClip.movieClipData = mcData.generateMovieClipData(_mcName);
                this.movieClip.play(_playTimes);
                return this.movieClip;
            }else{
                return this.movieClip;
            }
        }
	}
}

