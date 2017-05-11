module ViewModel {
	/**
	 *
	 * @author fangchao
	 *
	 */
	export class DailyRechargeItemVM extends eui.Component{
    	 /**
         * @所获钱数
         */ 
        public earnMoney:eui.Label;
        
        /**
         * @描述
         */ 
        public description:eui.Label;
        
        /**
         * @物品0
         */ 
        public Item0:eui.Group;
        
        /**
         * @物品1
         */ 
        public Item1: eui.Group;
        
        /**
         * @图标1 
         */ 
        public icon0:eui.Image;
        
        /**
         * @图标2
         */ 
        public icon1:eui.Image;
        
        /**
         * @数量0
         */ 
        public number0:eui.Label;
        
        /**
         * @数量1
         */ 
        public number1:eui.Label;
        
        /**
         * @完成图片
         */ 
        public finish:eui.Image;
        
        /**
         * @父节点
         */ 
        public uiLayer: eui.Group;
        
        /**
         * @回调方法
         */ 
        public onCallBack:Function;
        
        /**
         * @数据
         */ 
        public data: Model.DailyRechargeModel;
        
        /**
         * @领取按钮
         */ 
        public rewardBtn: ViewModel.BtnShareVM;
		public constructor(_uiLayer?:eui.Group,_onCallBack?:Function) {
            super();
            this.skinName = View.DailyRechargeItem;
            this.uiLayer=_uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
		}
        
		protected createChildren() {
            super.createChildren();
            this.initItem();
        }
        
        private initItem(){
            this.rewardBtn.costIcon.visible=false;
            this.rewardBtn.costNum.visible=false;
        }
        
        public setInfo(_data:Model.DailyRechargeModel){
            this.data=_data;
            
            if(Model.WebValue.isTraditional){
                this.description.text = "連續儲值" + _data.cumulativeDays + "天，可領取：";
            }else{
                this.description.text = "连续充值" + _data.cumulativeDays + "天，可領取：";
            }
            
            
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getReward,this);
            
            this.icon0.source ="icon_jinbi";
            this.number0.text = _data.rewardCountFirst + "";
            
            this.icon1.source ="icon_lingshi";
            this.number1.text = _data.rewardCountSecond + "";
            
            switch(_data.rewardState){
                case -1:
                    this.rewardBtn.setDailyRecharge(true);
                    break;
                case 0:
                    this.rewardBtn.setDailyRecharge(false);
                    break;
                case 1:
                    this.rewardBtn.visible=false;
                    this.finish.visible=true;
                    break;
                default:alert("数据状态错误！请联系管理员！！！");
            }
        }
        
        /**
         * @回调函数
         */
        private getReward() {
            if(this.onCallBack) {
                this.onCallBack(this.data);
                this.rewardBtn.visible = false;
                this.finish.visible = true;
            }
        }
	}
}
