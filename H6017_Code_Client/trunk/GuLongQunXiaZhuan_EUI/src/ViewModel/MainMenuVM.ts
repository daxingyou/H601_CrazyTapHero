module ViewModel {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export class MainMenuVM extends eui.Component {
    	/**
    	 * @舞台父节点.
    	 */
        private uiLayer: eui.UILayer;
        /**
         * @回调方法.
         */
        private onCallBack: Function;
        /**
         * @当前page.
         */
        public currentPage: PageName;
        /**
         * @列表弹窗父节点.
         */
        public menuPopupGroup: eui.Group;
        /**
         * @下方共用弹窗控件.
         */
        public menuPopup: MenuPopupVM;
        /**
         * @主页顶部按钮控件.
         */
        private btnTop: BtnTopVM;
        /**
         * @主页面底部按钮控件.
         */
        public btnBottom: BtnBottomVM;
        /**
         * @玩家主要信息控件.
         */
        public mainInfo: MainInfoVM;
        /**
         * @飞箱掉落信息
         * @by cai_haotian 2016.3.16.
         */
        public flyBoxGroup: eui.Group;
        /**
         * @飞箱物品文字描述
         * @by cai_haotian 2016.3.16.
         */
        public flyBoxDescription: eui.Label;
        /**
         * @飞箱掉落物品图表
         * @by cai_haotian 2016.3.16.
         */
        public flyBoxIcon: eui.Image;
        /**
         * @掉线节点
         * @by cai_haotian 2016.3.9
         */
        public offLineGroup: eui.Group;
        /**
         * @活动图表
         */ 
        public activity:BtnActivityVM;
        /**
         * @按钮组
         * @by cai_haotian 2016.3.28
         */
        public btnGroup: Array<BtnBottomItemVM>;

        public constructor(_uiLayer?: eui.UILayer,_onCallBack?: Function,pageName?: PageName) {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
            if(Model.WebValue.isTraditional){
                this.skinName = View.MainMenuView_tw;
            }else{
                this.skinName = View.MainMenuView;
            }
            
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChildAt(this,1);
            //            if(pageName == PageName.SceneList) {
            //                this.extraInitSceneList();
            //            } else { 
            //                
            //            }
            if(Model.WebServiceBase.isDebug)
                console.log("zhujun: add main menu vm to ui layer !　");
        }
		
        //        private extraInitSceneList() { 
        //            this.menuBtnGroup.x = -1280;
        //            this.levelGroup.x = 0;
        //        }
        
        private onComplete(): void {
            if(Model.WebServiceBase.isDebug) {
                console.log("onComplete");
            }
            
        }

        protected createChildren() {
            super.createChildren();
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottom();
            this.initActivityBtn();
            this.initBtnGroup();
        }
        
        /**
         * @主页面顶部按钮事件初始化.
         */
        private initBtnTop() {
            this.btnTop.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new ViewModel.SettingsVM(Main.singleton,() => { });
            },this);
            this.btnTop.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new ViewModel.AchievementVM(Main.singleton,()=>{});
            },this);
            this.btnTop.btnFamily.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                new ViewModel.FamilyVM(Main.singleton,()=>{});
            },this);
            this.btnTop.btnRanking.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                var RankList = new ViewModel.RankListVM(Main.singleton,() => { });   
                Model.WebService.RankingData((_data:Model.RankDyModel)=>{
                        if(Model.WebServiceBase.isDebug){
                            console.log("cai_haotian rankingData get success!!!!!"+JSON.stringify(_data));
                        }
                        RankList.setRankScene(_data.rankSceneList,_data.rankScene,_data.sceneChange);
                        RankList.setRankDps(_data.rankDPSList,_data.rankDPS,_data.DPSChange);
                        RankList.setRechargeDps(_data.rankRechargeList,_data.rankRecharge,_data.rechargeChange);
                    },()=>{
                        if(Model.WebValue.isTraditional){
                            alert("獲取玩家排行失敗！");
                        }else{
                            alert("获取玩家排行失败！");
                        }
                    })
            },this);
            this.btnTop.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                //by cai_haotian 2016.3.22.
                if(this.activity.alpha==0){
                    egret.Tween.get(this.activity).to({y:74,alpha:1},800,egret.Ease.backOut);
                }else{
                    egret.Tween.get(this.activity).to({ y: -156,alpha: 0 },800,egret.Ease.backOut);
                }
            },this);
        }
        
        /**
         * @初始化菜单弹窗.
         */
        private initMenuPopup() {
            this.menuPopupGroup.visible = false;
            this.menuPopup.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
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
                });
                this.menuPopupGroup.visible = false;
                this.currentPage = PageName.MainInfo;
            },this);
            this.menuPopup.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
        }
        
        /**
         * @主页底部按钮事件初始化.
         */
        private initBtnBottom() {
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setPData();
                this.currentPage = PageName.Player;
            },this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setBFData();
                this.currentPage = PageName.Friend;
            },this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setAData();
                this.currentPage = PageName.MagicWeapon;
            },this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setMData();
                this.currentPage = PageName.Mall;
            },this);
        }
        
        
        
        /**
         * @初始化按钮组
         * @by cai_haotian 2016.3.28
         */
        private initBtnGroup() {
            this.btnGroup = [this.btnBottom.btnProtagonist,this.btnBottom.btnBosomFriend,this.btnBottom.btnArtifact,this.btnBottom.btnMall];
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChange,this);
        }
        
        /**
         * @根据点击转换按钮状态
         * @by cai_haotian 2016.3.28
         */
        public btnChange(evt?: egret.Event) {
            for(var i = 0;i < this.btnGroup.length;i++) {
                if(evt.target == this.btnGroup[i]) {
                    this.btnGroup[i].currentState = "down";
                    this.btnGroup[i].enabled = false;
                    this.btnGroup[i].btnWord.source = this.btnGroup[i].btnWordSourceDown;
                } else {
                    this.btnGroup[i].currentState = "up";
                    this.btnGroup[i].enabled = true;
                    this.btnGroup[i].btnWord.source = this.btnGroup[i].btnWordSource;
                }
            }
        }
        
        /**
         * @初始化活动按钮组
         * @by cai_haotian 2016.3.22.
         */ 
        private initActivityBtn(){
            //累计奖励
            this.activity.accumulateRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                if(Model.PlayerLocalService.PlayerData.st.cumulativeRechargeSwitch){
                    var TotalReward: TotalRewardVM = new ViewModel.TotalRewardVM(Main.singleton,() => { });
                    Model.WebService.UpdateCumulativeRecharge((_data: Model.CumulativeRechargeInfo) => {
                        
                        if(Model.WebServiceBase.isDebug){
                            console.log("cai_haotian upDateCumulativeRecharge successed!!!!!!!!" + JSON.stringify(_data))
                        }
                        
                        TotalReward.setList(_data);
                    },() => {
                        if(Model.WebValue.isTraditional){
                            alert("獲取累計獎勵失敗！！！請聯繫管理員！！！");    
                        }else{
                            alert("获取累计奖励失败！！！请联系管理员！！！");
                        }
                    });
                }else{
                    alert("活动尚未开放！敬请期待！")
                }
            },this);
            //领取奖励
            this.activity.getRewards.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                var partInReward = new ViewModel.PartInRewardVM(Main.singleton,(txt:string) => {
                        Model.WebService.PartInRward(txt,(data) => {
                            var rewardInfo=new ViewModel.ReceiveRewardsVM(Main.singleton,()=>{});
                            rewardInfo.rewardInfo(data);
                            if(Model.WebServiceBase.isDebug){
                                console.log("cht partIn reward success" + JSON.stringify(data));
                            }
                        },(data) => {
                            var rewardInfo = new ViewModel.ReceiveRewardsVM(Main.singleton,() => { });
                            rewardInfo.wrongInfo(data);
                        });
                    });
            },this);
            //每日充值
            this.activity.dailyRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                if(Model.PlayerLocalService.PlayerData.st.everydayRechargeSwitch){
                        var dailyRecharge: DailyRechargeVM = new ViewModel.DailyRechargeVM(Main.singleton,() => {
                            if(Model.WebValue.isTraditional) {
                                for(var i = 0;i < Main.singleton.mainMenuVM.btnGroup.length;i++) {
                                    if(Main.singleton.mainMenuVM.btnBottom.btnMall == Main.singleton.mainMenuVM.btnGroup[i]) {
                                        Main.singleton.mainMenuVM.btnGroup[i].currentState = "down";
                                        Main.singleton.mainMenuVM.btnGroup[i].enabled = false;
                                        Main.singleton.mainMenuVM.btnGroup[i].btnWord.source = Main.singleton.mainMenuVM.btnGroup[i].btnWordSourceDown;
                                    } else {
                                        Main.singleton.mainMenuVM.btnGroup[i].currentState = "up";
                                        Main.singleton.mainMenuVM.btnGroup[i].enabled = true;
                                        Main.singleton.mainMenuVM.btnGroup[i].btnWord.source = Main.singleton.mainMenuVM.btnGroup[i].btnWordSource;
                                    }
                                }
                                Main.singleton.mainMenuVM.menuPopupGroup.visible = true;
                                Main.singleton.mainMenuVM.menuPopup.setMData(true);
                            }else{
                                var data: Model.ShopStModel = Enumerable.From(Model.WebValue.dataStModel.shopList).Where(x=> x.costRmb == 6).FirstOrDefault(null);
                                //这里也要接中间件支付
                                var item: Item = {
                                    "id": data.id,
                                    "name": data.name,
                                    "price": data.costRmb,
                                    "count": 1,
                                    "currency": "CUR_CNY"
                                };
                                DCAgent.onPayment({ amount: data.costRmb,currencyType: "CUR_CNY",payType: "",iapid: "",orderId: data.id });
                                lwsdk.pay(item,() => {
                                    Model.WebService.Recharge((_data: Model.ShopList) => {
                                        if(Model.WebServiceBase.isDebug){
                                            console.log("cai_haotian rechargeText success!!!!!");
                                        }
                                        for(var i = 0;i < _data.shopList.length;i++) {
                                            Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].cost);
                                            Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].extraGet);
                                        }
                                        Main.singleton.mainGameVM.sceneInfo.init();//更新主场景ui
                                    },() => {
                                        if(Model.WebValue.isTraditional){
                                            alert("支付獲取失敗！");
                                        }else{
                                            alert("支付获取失败！");
                                        }
                                        
                                    })
                                });
                            }
                        });
                        Model.WebService.UpdateDailyRecharge((_data: Model.DailyRechargeInfo) => {
                            if(Model.WebServiceBase.isDebug){
                                console.log("cai_haotian upDateDailyRecharge successed!!!!!!!!" + JSON.stringify(_data));
                            }
                            dailyRecharge.setList(_data);
                        },() => {
                            if(Model.WebValue.isTraditional){
                                alert("對不起！獲取每日充值信息失敗！");
                            }else{
                                alert("对不起！获取每日充值信息失败！");
                            }
                        });
                }else{
                    alert("活动尚未开放！敬请期待！");
                }
            },this);
            //每日挑战
            this.activity.dailyChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                var dailyChallenge=new ViewModel.DailChallengeVM(Main.singleton,()=>{});
            },this);
        }
        
        /**
         * @刷新界面.
         */
        public refreshMenu() {
            switch(this.currentPage) {
                case PageName.Player:
                    this.menuPopup.setPData();
                    break;
                case PageName.Friend:
                    this.menuPopup.setBFData();
                    break;
                case PageName.MagicWeapon:
                    this.menuPopup.setAData();
                    break;
                case PageName.Mall:
                    this.menuPopup.setMData();
                    break;
                default:
                    break;
            }
        }

    }
}
