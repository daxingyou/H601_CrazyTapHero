module ViewModel {
	/**
	 *
	 * @author 
	 *
	 */
	export class FamilyVM extends eui.Component{
    	/**
    	 * @界面关闭按钮
    	 */
        private closeBtn: eui.Button;
        /**
        * @父节点.
        */
        private uiLayer: eui.UILayer;
        /**
         * @回调函数.
         */
        private onCallBack: Function;
        /**
         * @黑色背景
         */ 
        private maskBlackFamily: eui.Image;
        
        /**
         * @家族列表
         */ 
        private familyGroup:eui.Group;
        
        /**
         * @家族item 
         */ 
        private itemList:ViewModel.FamilyItemVM[]=[];
        
        /**
         * @页面主题窗口
         */ 
        private window: eui.Group;
        public constructor(_uiLayer: eui.UILayer,_onCallBack?: Function) {
            super();
            if(Model.WebValue.isTraditional){
                this.skinName = View.FamilyView_tw;
            }else{
                this.skinName = View.FamilyView;
            }
            
            
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
            
		}
        protected createChildren() {
            super.createChildren();
            this.initWindow();
            this.setListInfo();
        }
        
        private initWindow(){
            egret.Tween.get(this.maskBlackFamily).to({ alpha: .7 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);
            if(Model.WebServiceBase.isDebug)
            { console.log("fangchao: add magic weapon vm to ui layer !　"); };
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                egret.Tween.get(this.maskBlackFamily).to({ alpha: 0 },700,egret.Ease.circIn);
                egret.Tween.get(this.window).to({ y: -850 },700,egret.Ease.backIn);
                setTimeout(() => {
                    this.uiLayer.removeChild(this);
                },700);
            },this);
        }
        
        private setListInfo(){
            var Data:Model.ClanData[]=Model.ClanLocalService.ClanListData;
            if(this.familyGroup.numChildren==0){
                for(var i = 0;i < Data.length; i++) {
                    var item:ViewModel.FamilyItemVM=new ViewModel.FamilyItemVM(this.familyGroup,(_data:Model.ClanData)=>{
                            if(Model.PlayerLocalService.PlayerData.dy.treasure>=_data.st.activationCost){
                                Model.ClanLocalService.buySuccessCallBack(_data);
                                this.setListInfo();//更新ui
                                Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                    }
                                },() => {
                                    Main.singleton.mainMenuVM.offLineGroup.visible = true;
                                    if(Model.WebValue.isTraditional) {
                                        alert("數據提交失敗請聯繫管理員！！！！");
                                    } else {
                                        alert("数据提交失败请联系管理员！！！！");
                                    }
                                });//重新提交数据
                                
                            }else{
                                new ViewModel.LackGoldVM(Main.singleton,() => {
                                    egret.Tween.get(this.maskBlackFamily).to({ alpha: 0 },700,egret.Ease.circIn);
                                    egret.Tween.get(this.window).to({ y: -850 },700,egret.Ease.backIn);
                                    setTimeout(() => {
                                        this.uiLayer.removeChild(this);
                                    },700);
                                    });
                            }
                        });    
                    item.setItemInfo(Data[i]);
                    this.itemList.push(item);
                }
            }else{
                for(var i = 0;i < Data.length; i++) {
                    this.itemList[i].setItemInfo(Data[i]);
                }
            }
        }
	}
}
