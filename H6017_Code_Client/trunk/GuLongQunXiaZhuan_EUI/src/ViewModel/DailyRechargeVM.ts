module ViewModel{
    /**
     *
     * @author cai_haotian 
     * @date 2016.1.18.
     *
     */
    export class DailyRechargeVM extends eui.Component{
        /**
         * @连续充值时间
         */ 
        private continueTime:eui.Label;
        /**
         * @关闭按钮
         */ 
        private closeBtn:ViewModel.CloseBtnVM;
        /**
         * @列表父节点
         */ 
        private listGroup:eui.Group;
        /**
         * @充值按钮
         */ 
        private rechargeBtn:ViewModel.BtnShareVM;
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
        
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
        	
        	if(Model.WebValue.isTraditional){
                this.skinName = View.DailyRechargeView_tw;
        	}else{
                this.skinName = View.DailyRechargeView;
        	}
            
        	this.uiLayer=_uiLayer;
        	this.uiLayer.addChild(this);
        	this.onCallBack=_onCallBack;
    	}
    	
    	protected createChildren(){
    	  super.createChildren();
    	  this.initWindow();
    	}
    	
    	private initWindow(){
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this);
            this.rechargeBtn.costIcon.visible = false;
            
            if(Model.WebValue.isTraditional){
                this.rechargeBtn.costNum.text = "";
                this.rechargeBtn.description.text = "儲 值"
            }else{
                this.rechargeBtn.costNum.text = "￥ 6";
                this.rechargeBtn.description.text = "充 值"
            }
            
            
            this.rechargeBtn.description.size=24;
            this.rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buyEvent,this);
    	}
    	
    	public setList(_data:Model.DailyRechargeInfo){
            var listInfo: Array<Model.DailyRechargeModel> = _data.dailyRechargeList;
            this.continueTime.text=_data.playerDuration+"";
            for(var i=0;i<listInfo.length;i++){
                var item: DailyRechargeItemVM = new DailyRechargeItemVM(this.listGroup,(_data:Model.DailyRechargeModel)=>{
                        Model.WebService.GetDailyRecharge(_data.dailyRechargeId,()=>{
                            if(Model.WebServiceBase.isDebug){
                                console.log("cai_haotian GetDailyRecharge success!!!!!!");
                            }
                            Model.PlayerLocalService.PlayerData.dy.treasure += _data.rewardCountFirst;
                            Model.PlayerLocalService.PlayerData.AddJewel = _data.rewardCountSecond;   
                            //调用成就 2016.4.5
                            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL,_data.rewardCountSecond);
                        },()=>{
                            if(Model.WebValue.isTraditional){
                                alert("獲取每日充值獎勵失敗！請聯繫管理員！");
                            }else{
                                alert("获取每日充值奖励失败！请联系管理员！");
                            }
                            
                            if(Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian GetDailyRecharge failed!!!!!!!");
                            }
                        })
                    });
                item.setInfo(listInfo[i]);
            }
    	}
    	
    	/**
    	 * @回调函数
    	 */ 
    	private buyEvent(){
    	  if(this.onCallBack){
            if(Model.WebValue.isTraditional) {
               this.uiLayer.removeChild(this);
            }
    	      this.onCallBack();
    	  }
    	}
    	
    	
    }
}