//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * @主脚本单例
     */
    public static singleton: Main;
    /**
     * @加载进度界面
     * @loading process interface
     */
    private logoVM: ViewModel.LogoVM;
    /**
     * @主界面控件.  
     * @depth:2.
     */
    public mainMenuVM: ViewModel.MainMenuVM;
    /**
     * @主游戏控件.
     * @depth：0.
     */
    public mainGameVM: ViewModel.MainGameVM;
    /**
     * @小飞箱控件
     * @by cai_haotian 2016.3.18
     */
    public flyBoxVM: ViewModel.FlyBox;
    /**
     * @主题是否加载完成.
     */
    private isThemeLoadEnd: boolean = false;
    /**
     * @资源是否加载完成.
     */
    private isResourceLoadEnd: boolean = false;
    /**
     * @登陆完毕.
     */
    private isLoginReady: boolean = false;
    /**
     * @动态数据准备完毕.
     */
    private isDyDataReady: boolean = false;
    /**
     * @静态数据准备完毕.
     */
    private isStDataReady: boolean = false;

    protected createChildren(): void {
        super.createChildren();
        Main.singleton = this;
        
        //by cai_haotian 2016.3.21.
        //中间件接入
        var config = {
            game: 8
        };
        lwsdk.init(config);
        
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        
        if(Model.WebValue.isTraditional){
            RES.loadConfig("resource/default_tw.res.json","resource/");//加载资源配置.
        }else{
            RES.loadConfig("resource/default.res.json","resource/");//加载资源配置.
        }
        
    }
   
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json",this.stage);//加载皮肤配置.
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
    }

    /**
     * @主题文件加载完成,开始预加载
     * @Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createLogoScene();
    }
    
    /**
     * @创建资源加载以及logo场景.
     */
    private createLogoScene() {
        this.logoVM = new ViewModel.LogoVM(this,() => {
            console.log("Test: Logo and loading scene init finish ! ");
        });
        var tw = egret.Tween.get(this.logoVM.logoGroup);//Logo淡入动画.
        tw.to({ alpha: 1 },2000).call(() => {
            this.logoVM.loadingBarItem.visible = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.loadGroup("preload");
        });
        this.sendLogin();//创建logo场景同时发送登陆请求.
    }

    /**
     * @preload资源组加载完成
     * @preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if(event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.isResourceLoadEnd = true;
            this.logoVM.loadingBarItem.visible = false;
            var tw = egret.Tween.get(this.logoVM.logoGroup);
            tw.to({ alpha: 0 },2000).call(() => {
                this.removeChild(this.logoVM);
                
                if(Model.WebServiceBase.isDebug){
                    console.log("this.isThemeLoadEnd " + this.isThemeLoadEnd + " this.isResourceLoadEnd " + this.isDyDataReady + " this.isDyDataReady " + this.isDyDataReady + " this.isStDataReady " + this.isStDataReady);
                }
                
                
                if(this.isThemeLoadEnd && this.isResourceLoadEnd && this.isDyDataReady && this.isStDataReady) {
                    this.createScene();
                } else {
                    if(Model.WebServiceBase.isDebug){
                        console.log("zhujun: theme or resource load failed !　");
                    }
                }
            });
        }
    }
    
    /**
     * @资源组加载出错
     * @Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    
    /**
     * @preload资源组加载进度．
     * @loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if(event.groupName == "preload") {
            this.logoVM.loadingBarItem.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    
    /**
     * @创建场景界面
     * @Create scene interface
     * @登陆完成即可发送请求获取动态数据和静态数据.
     */
    private sendLogin(): void {
        //by cai_haotian 2016.3.21
        //中间件登录
        lwsdk.login(() => {
            console.log("token:" + lwsdk.token);
            var webToolkit: Model.WebServiceToolKit = new Model.WebServiceToolKit();
            webToolkit.changeHeader(lwsdk.token);
            this.isLoginReady = true;//登陆请求成功回调，重置状态.
            this.sendDyData();
            this.sendStData();
            var channel = Model.Tools.getURLParam("channel");
            //9G需要特殊处理
            if(channel=="2"){
                Model.WebValue.is9G=true;
            }
            
            if(channel == "") {
                channel = "888";
            }
            console.log("cai_haotian "+Model.WebValue.accountM);
            console.log("cai_haotian dailyId" + Model.WebValue.accountM.id);
            Model.DataEyeService.initDataEye(Model.WebValue.accountM.id,channel);

        });
        
//                if(Model.Tools.getURLParam("channel") === "") {
//                    if(egret.localStorage.getItem("guid") == null) {
//                        egret.localStorage.setItem("guid",Model.Tools.guid());    
//                    }
//                    Model.WebValue.accountM = new Model.AccountModel(egret.localStorage.getItem("guid"));
//        //            Model.WebValue.accountM.shopId = "1727a18fc-6d31-445f-b82c-1b0dd621df98";//TODO: Temp zhujun 2016.01.22.//thirdId:59fdef8d-9557-3749-e074-390d4f56aaa6
//                    Model.DataEyeService.initDataEye(Model.WebValue.accountM.dailyId,"888");
//                    Model.WebService.userLogin(Model.WebValue.accountM,()=>{
//                        this.isLoginReady = true;//登陆请求成功回调，重置状态.
//                        this.sendDyData();
//                        this.sendStData();
//                        console.log("zhujun: userLogin interface call back successed !");                
//                    },()=>{
//                        if(Model.WebServiceBase.isDebug) console.log("zhujun: userlogin interface call back failed ! ");
//                    });
//                } else { //如果有渠道则进入SDKService处理业务.
//        //            Model.SDKService.initSDK(() => { 
//        //                Model.WebService.userLogin(Model.WebValue.accountM,(_request: egret.HttpRequest) => {
//        //                    this.sendMenuData();
//        //                });
//        //             });
//                }
    }
    
    /**
     * @发送动态数据.
     */
    private sendDyData() {
        Model.WebService.updateDyData((_data: Model.DataDyModel) => {
            //            Model.console.log("cai_haotian response :" + JSON.stringify(_request));
            Model.WebValue.dataDyModel = _data;
            DCAgent.login(Model.WebValue.dataDyModel.playerModel.nickName);
            this.isDyDataReady = true;
            if(this.isStDataReady && this.isResourceLoadEnd) this.createScene();//如果其他两个都好了,就创建场景.
            if(Model.WebServiceBase.isDebug) console.log("zhujun: update dy data interface call back successed !　");
        },() => {
            if(Model.WebServiceBase.isDebug){
                console.log("zhujun: update dy data interface call back failed ! ");
            }
        });
    }
    
    /**
     * @发送静态数据.
     */
    private sendStData() {
        Model.WebService.updateStData((_data: Model.DataStModel) => {
            Model.WebValue.dataStModel = _data;
            this.isStDataReady = true;
            if(this.isDyDataReady && this.isResourceLoadEnd) this.createScene();
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujun: update st data interface call back successed ! ");
            }
        },() => {
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujujn: update st data interface call back failed ! ");
            }
        });
    }
    
    /**
     * @创建游戏场景.
     */
    private createScene() { 
        //创建场景之前先初始化数据.
        Model.PlayerLocalService.initAllData();
        Model.AudioService.Shared();//实例化声音控件
        this.mainMenuVM = new ViewModel.MainMenuVM(this,() => {
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujun: main menu vm call back successed !　");
            }
        });
        this.mainGameVM = new ViewModel.MainGameVM(this,() => {
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujun: main game vm call back successed ! ");
            }
        });
        
        //9G的公告
        if(Model.WebValue.is9G){
            new ViewModel.AnnouncementMsgVM(this,()=>{});
        }
        
        //小飞箱
        var myDate = new Date();
        var now = myDate.getTime() / 1000;
        if(now-Model.PlayerLocalService.PlayerData.dy.doubleProbabilityTime<=86400){
            Model.PlayerLocalService.PlayerData.st.bagAppearTimeInterval/=2;
        }
        var timer: egret.Timer = new egret.Timer(Model.PlayerLocalService.PlayerData.st.bagAppearTimeInterval *1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            timer.stop();
            this.flyBoxVM = new ViewModel.FlyBox(this.mainMenuVM,() => {
                if(Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: flyBoxVM call back successed !　");
                }
                timer.start();
                egret.clearTimeout(returnFun);
            })
            this.flyBoxVM.showFun();
            var turnAroundFun=egret.setTimeout(() => {
                this.flyBoxVM.turnAroundFun();
            },this,this.flyBoxVM.startTime);
            var returnFun =egret.setTimeout(() => {
                this.flyBoxVM.returnFun();
            },this,this.flyBoxVM.startTime + this.flyBoxVM.roundTime * 2);
            this.flyBoxVM.clickFun();
        },this)
        timer.start();
    }
}
