module ViewModel{
    /**
     *
     * @author cai_haotian 
     * @date 2016.1.18.
     *
     */
    export class DailChallengeVM extends eui.Component{
        /**
         * @列表0
         */ 
        private list0: ViewModel.DailyChallengeItemVM;
        
        /**
         * @列表1
         */
        private list1: ViewModel.DailyChallengeItemVM;
        
        /**
         * @列表2
         */
        private list2: ViewModel.DailyChallengeItemVM;
        
        /**
         * @列表3
         */
        private list3: ViewModel.DailyChallengeItemVM;
        
        /**
         * @列表4
         */
        private list4: ViewModel.DailyChallengeItemVM;
        
        /**
         * @开始挑战按钮
         */ 
        private startChanllenge:ViewModel.BtnShareVM;
        
        /**
         * @倒计时
         */ 
        private countDown:eui.Label;
        
        /**
         * @累计登录
         */ 
        private accumulateLogin:eui.Label;
        
        /**
         * @关闭按钮
         */ 
        private closeBtn:ViewModel.CloseBtnVM;
        
        /**
         * @列表组
         */ 
        private items: Array<ViewModel.DailyChallengeItemVM> = [];
        
        /**
         * @所有数据
         */ 
        private dataList: Array<Model.ChallengeData>=[];
        
        /**
         * @选中的数据
         */ 
        private checkInfo:Model.ChallengeData;
        
        /**
         * @倒计时
         */ 
        private countTime:number;
        
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
                this.skinName = View.DailyChallenge_tw;
        	}else{
                this.skinName = View.DailyChallenge;
        	}
        	
            
        	this.uiLayer=_uiLayer;
        	this.uiLayer.addChild(this);
        	this.onCallBack=_onCallBack;
    	}
    	
        protected createChildren() {
            super.createChildren();
            this.initWindow();
            this.initItem();
            this.initBtn();
        }
        
        private initWindow(){
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                if(this.countTime){
                    egret.clearInterval(this.countTime);
                }
                this.uiLayer.removeChild(this);
            },this);
            this.startChanllenge.setChallengBtn(true);
        }
        
        /**
         * @判断当前是否可以进行挑战
         */ 
        private initBtn(){
            var myDate = new Date();
            var now = myDate.getTime() / 1000;
            if(now - Model.PlayerLocalService.PlayerData.dy.chanllengeTime <= Number(Model.PlayerLocalService.PlayerData.st.everydayCD)){
                this.startChanllenge.setChallengBtn(false);
                var lastTime = Number(Model.PlayerLocalService.PlayerData.st.everydayCD) - (now - Model.PlayerLocalService.PlayerData.dy.chanllengeTime);
                var des = Model.TimeSpan.FromSeconds(lastTime)
                this.countDown.text = des.toString();
                lastTime--;
                this.countTime=egret.setInterval(()=>{
                        var des = Model.TimeSpan.FromSeconds(lastTime)
                        this.countDown.text=des.toString();
                        lastTime--;
                    },this,1000);
            }else{
                this.countDown.text="00:00:00";
            }
        }
        
        
        private initItem(){
            this.items = [this.list0,this.list1,this.list2,this.list3,this.list4];
            if(Model.WebValue.isTraditional){
                this.accumulateLogin.textFlow = <Array<egret.ITextElement>>[
                    { text: "今天是妳登錄的第" },{ text: Model.PlayerLocalService.PlayerData.dy.cumulativeLogin + "",style: { "size": 24,"textColor": 0xFF0000 } },{ text: "天哦~" }
                ]
            }else{
                this.accumulateLogin.textFlow = <Array<egret.ITextElement>>[
                    { text: "亲，今天是你登录的第" },{ text: Model.PlayerLocalService.PlayerData.dy.cumulativeLogin + "",style: { "size": 24,"textColor": 0xFF0000 } },{ text: "天哦~" }
                ]
            }
            
            
            
            Model.ChallengeLoaclService.setChallengeData();//设置数据
            this.dataList=Model.ChallengeLoaclService.ChallengeDataList;//组织数据
            
            for(var i = 0;i < this.items.length; i++) {
                this.items[i].setItemInfo(this.dataList[i]);
                this.items[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.checkFun,this);
            }
            
            this.startChanllenge.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                    if(this.checkInfo){
                        var myDate = new Date();
                        var now = myDate.getTime() / 1000;
                        Model.PlayerLocalService.PlayerData.isChallenge=true;
                        Model.ChallengeLoaclService.challengeBossData = this.checkInfo;
                        //更改ui血量
                        Main.singleton.mainGameVM.sceneInfo.setChallengeBoss();
                        //开始计时
                        Main.singleton.mainGameVM.sceneInfo.initCBoss();
                        if(this.countTime) {
                            egret.clearInterval(this.countTime);
                        }
                        Model.ChallengeLoaclService.setChallengeCD(Math.round(now));
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
                        this.uiLayer.removeChild(this);
                    }else{
                        alert("请选择挑战难度！");
                    }
                },this);
        }
        
        private checkFun(evt?:egret.Event){
            for(var i = 0; i < this.items.length; i++) {
                if(evt.target==this.items[i]){
                    this.items[i].currentState = "down";
                    this.items[i].enabled = false;
                    this.checkInfo = this.dataList[i];
                   
                }else{
                    this.items[i].currentState="up";
                    this.items[i].enabled=true;
                }
            }
        }
    }
}