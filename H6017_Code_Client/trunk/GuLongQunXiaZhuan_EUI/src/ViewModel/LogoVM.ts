module ViewModel {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
	export class LogoVM extends eui.Component {
    	
        private uiLayer: eui.UILayer;
        
        private onCallBack: Function;
    	
        public logoGroup: eui.Group;
        
        private logoImage: eui.Image;     
        
        public loadingBarItem: LoadingBarItemVM;
        
		public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
            super();
            
            if(Model.WebValue.isTraditional){
                this.skinName = View.LogoView_tw;
            }else{
                this.skinName = View.LogoView;
            }
            
            this.onCallBack = _onCallBack;
            this.uiLayer = _uiLayer;
            this.uiLayer.addChild(this);            
		}
		
        protected createChildren() {
            super.createChildren();
            if(this.onCallBack != null) { //主题初始化完成就回掉资源加载.
                this.onCallBack();
            }
        }
        
//        public setAlpha(current,total):void { 
//            console.log("Test: logo alpha " + current / total);
////            this.logoGroup.alpha = current / total;
//            var tw = egret.Tween.get(this.logoGroup);
//            tw.to({ alpha: current / total },2000);
//        }
	}
}
