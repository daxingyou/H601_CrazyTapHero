module ViewModel{
    /**
     *
     * @author cai_haotian 
     * @date 2016.1.4.
     *
     */
    export class RankListVM extends eui.Component{
        /**
         * @玩家信息组
         */ 
        private playerInfo0:eui.Group;
        
        /**
         * @头像图标
         */
        private icon0: eui.Image;
        
        /**
         * @人物名称
         */
        private userName0: eui.Label;
        
        /**
         * @描述详情
         */
        private detail0: eui.Label;
        /**
         * @排名组
         */
        private rankingGroup0: eui.Group;
        
        /**
         * @当前排名
         */
        private currentRanking0: eui.Label;
        
        /**
         * @排名更新 
         */
        private updateRankList0: eui.Label;
        /**
         * @上升
         */
        private up0: eui.Image;
        /**
         * @下降
         */
        private down0: eui.Image;
        
        /**
         * @玩家信息组
         */
        private playerInfo1: eui.Group;
        
        /**
         * @头像图标
         */
        private icon1: eui.Image;
        
        /**
         * @人物名称
         */
        private userName1: eui.Label;
        
        /**
         * @描述详情
         */
        private detail1: eui.Label;
        /**
         * @排名组
         */
        private rankingGroup1: eui.Group;
        
        /**
         * @当前排名
         */
        private currentRanking1: eui.Label;
        
        /**
         * @排名更新 
         */
        private updateRankList1: eui.Label;
        /**
         * @上升
         */
        private up1: eui.Image;
        /**
         * @下降
         */
        private down1: eui.Image;
        
        /**
         * @玩家信息组
         */
        private playerInfo2: eui.Group;
        
        /**
         * @头像图标
         */
        private icon2: eui.Image;
        
        /**
         * @人物名称
         */
        private userName2: eui.Label;
        
        /**
         * @描述详情
         */
        private detail2: eui.Label;
        /**
         * @排名组
         */
        private rankingGroup2: eui.Group;
        
        /**
         * @当前排名
         */
        private currentRanking2: eui.Label;
        
        /**
         * @排名更新 
         */
        private updateRankList2: eui.Label;
        /**
         * @上升
         */
        private up2: eui.Image;
        /**
         * @下降
         */
        private down2: eui.Image;
        
        
        /**
         * @关闭按钮
         */ 
        private closeBtn:eui.Button;
        /**
         * @闯关排行按钮
         */ 
        private rankSceneBtn:ViewModel.BtnMagicWeaponDetailVM;
        /**
         * @闯关排行显示表单
         */ 
        private rankScene:eui.Group;
        /**
         * @玩家排名信息
         */ 
        private user:ViewModel.RankListItemVM;
        /**
         * @闯关排行前10名
         */ 
        private rankSceneList:eui.Group;
        
        
         /**
         * @秒伤排行按钮
         */
        private dpsBtn: ViewModel.BtnMagicWeaponDetailVM;
        /**
         * @秒伤排行显示表单
         */
        private dps: eui.Group;
        /**
         * @秒伤玩家排名信息
         */
        private user0: ViewModel.RankListItemVM;
        /**
         * @闯关排行前10名
         */
        private dpsList:eui.Group;
        
        
        /**
         * @累计充值排行按钮
         */
        private accumulateBtn: ViewModel.BtnMagicWeaponDetailVM;
        /**
         * @秒伤排行显示表单
         */
        private accumulate: eui.Group;
        /**
         * @闯关排行前10名
         */
        private accumulateList:eui.Group;
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;

        
    	public constructor(_uilayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
        	
        	if(Model.WebValue.isTraditional){
                this.skinName = View.RankListView_tw;
        	}else{
                this.skinName = View.RankListView;
        	}
        	
        	this.uiLayer=_uilayer;
        	this.onCallBack=_onCallBack;
            this.uiLayer.addChild(this);
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	      this.initWindow();
    	}
    	
    	
    	/**
        * @按钮组
        */
        private btnGroup: Array<ViewModel.BtnMagicWeaponDetailVM>;
        
        /**
         * @页签组
         */ 
        private tabGroup:Array<eui.Group>;
    	
    	/**
    	 * @初始化
    	 */ 
    	private initWindow(){
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this)
                
            if(Model.WebValue.isTraditional){
                this.rankSceneBtn.detailText.text = "闖關";
                this.dpsBtn.detailText.text = "秒傷";
                this.accumulateBtn.detailText.text = "累積儲值";
            }else{
                this.rankSceneBtn.detailText.text = "闯关";
                this.dpsBtn.detailText.text = "秒伤";
                this.accumulateBtn.detailText.text = "累积充值";
            }
            

            this.rankSceneBtn.currentState = "up";
            this.dpsBtn.currentState = "down";
            this.accumulateBtn.currentState = "down";
            this.rankScene.visible = true;
            
            this.btnGroup=[this.rankSceneBtn,this.accumulateBtn,this.dpsBtn];
            this.tabGroup = [this.rankScene,this.accumulate,this.dps];
            this.rankSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
            this.dpsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
            this.accumulateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
    	}
    	
    	private btnChange(evt:egret.Event){
    	      for(var i = 0; i < this.btnGroup.length; i++) {
        	      if(evt.target==this.btnGroup[i]){
        	        this.btnGroup[i].currentState="up";
        	        this.tabGroup[i].visible=true;
        	      }else{
        	        this.btnGroup[i].currentState="down";
                    this.tabGroup[i].visible = false;
        	      }
    	      }
    	}
    	
    	/**
    	 * @设置闯关排名
    	 */ 
        public setRankScene(_listData:Array<Model.RankSceneModel>,_playerData:Model.RankSceneModel,_change:number){
            
            this.userName0.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            
            if(_change >= 0) {
                this.up0.visible = true;
                this.updateRankList0.text = _change + "";
                this.updateRankList0.textColor = 0x00F829;
            } else {
                this.down0.visible = true;
                this.updateRankList0.text = _change * -1 + "";
                this.updateRankList0.textColor = 0xF50601;
            }
            
            
            if(_playerData.scene){
                if(Model.WebValue.isTraditional){
                    this.detail0.text = "完成關卡：" + _playerData.scene;
                }else{
                    this.detail0.text = "完成关卡：" + _playerData.scene;
                }
                
            }
            
            
            if(_playerData.rank){
                this.currentRanking0.text = "" + _playerData.rank;
            }else{
                if(Model.WebValue.isTraditional){
                    this.currentRanking0.text = "暫未上榜";
                }else{
                    this.currentRanking0.text = "暂未上榜";
                }
                
                this.currentRanking0.textColor=0xF8D112;
                this.up0.visible=false;
                this.updateRankList0.visible=false;
            }
            
            
            
            for(var i = 0;i < _listData.length; i++) {
                var item:ViewModel.RankListItemVM=new ViewModel.RankListItemVM(this.rankSceneList,()=>{
                    });
                item.setSceneItem(_listData[i]);
    	      }
    	  }
    	  
    	 /**
    	  * @设置伤害排名
    	  */  
        public setRankDps(_listData: Array<Model.RankDPSModel>,_playerData: Model.RankDPSModel,_change: number){
            this.userName1.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            
            if(_change >= 0) {
                this.up1.visible = true;
                this.updateRankList1.text = _change + "";
                this.updateRankList1.textColor = 0x00F829;
            } else {
                this.down1.visible = true;
                this.updateRankList1.text = _change * -1 + "";
                this.updateRankList1.textColor = 0xF50601;
            }
            
            if(_playerData.dps){
                
                if(Model.WebValue.isTraditional){
                    this.detail1.text = "隊友秒傷：" + Model.MainLocalService.toUnitConversion(Number(_playerData.dps));
                }else{
                    this.detail1.text = "队友秒伤：" + Model.MainLocalService.toUnitConversion(Number(_playerData.dps));
                }
            }
            
            if(_playerData.rank){
                this.currentRanking1.text = "" + _playerData.rank;
            }else{
                if(Model.WebValue.isTraditional){
                    this.currentRanking1.text = "暫未上榜";
                }else{
                    this.currentRanking1.text = "暂未上榜";
                }
                
                this.currentRanking1.textColor = 0xF8D112;
                this.up1.visible = false;
                this.updateRankList1.visible = false;
            }
            
            
            
             for(var i = 0;i < _listData.length;i++) {
                 var item: ViewModel.RankListItemVM = new ViewModel.RankListItemVM(this.dpsList,() => {
                 });
                 item.setDpsItem(_listData[i]);
             }
    	 }
    	 
    	 /**
    	  * @设置充值排名
    	  */
        public setRechargeDps(_listData: Array<Model.RankRechargeModel>,_playerData: Model.RankRechargeModel,_change: number) {
            this.userName2.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            
            if(_change >= 0) {
                this.up2.visible = true;
                this.updateRankList2.text = _change + "";
                this.updateRankList2.textColor = 0x00F829;
            } else {
                this.down2.visible = true;
                this.updateRankList2.text = _change * -1 + "";
                this.updateRankList2.textColor = 0xF50601;
            } 
            
            if(_playerData.recharge){
                if(Model.WebValue.isTraditional){
                    this.detail2.text = "累計儲值：" + _playerData.recharge;
                }else{
                    this.detail2.text = "累计充值：" + _playerData.recharge;
                }
                
            }
            
            if(_playerData.rank){
                this.currentRanking2.text = "" + _playerData.rank;
            }else{
                this.currentRanking2.text = Model.WebValue.isTraditional ? "暫未上榜":"暂未上榜";
                this.currentRanking2.textColor = 0xF8D112;
                this.up2.visible = false;
                this.updateRankList2.visible=false;
            }
            
            
            
            for(var i = 0;i < _listData.length;i++) {
                 var item: ViewModel.RankListItemVM = new ViewModel.RankListItemVM(this.accumulateList,() => {
                 });
                 item.setRechargeItem(_listData[i]);
             }
         }
    	
    	
    }
}