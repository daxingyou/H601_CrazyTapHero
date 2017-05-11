module ViewModel {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export class BtnTopVM extends eui.Component{
    	  
        /**
         * @按钮回调方法.
         */ 
        public onCallBack : Function;
        /**
         * @设置按钮控件.
         */ 
        public btnSetting : BtnTopItemVM;
        /**
         * @家族按钮控件.
         */ 
        public btnFamily: BtnTopItemVM;
        /**
         * @排名按钮控件.
         */ 
        public btnRanking: BtnTopItemVM;
        /**
         * @成就按钮控件.
         */ 
        public btnAchievement: BtnTopItemVM;
        /**
         * @成就按钮控件.
         */ 
        public btnActivity: BtnTopItemVM;
    	
        public constructor(_onCallBack?:Function) {
            super();
            this.skinName = View.BtnTopView;
            this.onCallBack = _onCallBack;
        }

        protected createChildren() {
            super.createChildren();
        }
	}
}
