module ViewModel{
    /**
     *
     * @author cai_haotian 
     * @date 2016.3.14
     *
     */
    export class FlyBox {
        /**
         * @小飞箱龙骨动画对象
         * @by cai_haotian 2016.2.25.
         */
        private boxAnimel: dragonBones.Armature;
        /**
         * @进入场景的开始位置
         * @by cai_haotian 2016.2.25.
         */
        private startPos: Model.Vector2;
        /**
         * @贝萨尔曲线的结束位置
         * @by cai_haotian 2016.2.25.
         */
        private endPos: Model.Vector2;
        /**
         * @左画圈的贝萨尔曲线左点坐标
         * @by cai_haotian 2016.2.25.
         */
        private leftPos: Model.Vector2;
        /**
         * @右画圈的贝萨尔曲线右点坐标
         * @by cai_haotian 2016.2.25.
         */
        private rightPos: Model.Vector2;
        /**
         * @从页面外出现到旋转位置的开始时间
         */ 
        public startTime:number=2000;
        /**
         * @返回时间
         */ 
        public returnTime:number=800;
        /**
         * @旋转时间
         */ 
        public roundTime:number=8000;//旋转时间
        /**
         * @在屏幕上显示的总时间
         */ 
        public showTime=this.startTime+this.returnTime+2*this.roundTime;
        /**
         * @显示对象
         */ 
        public display:dragonBones.Armature;
        
        
        /**
         * @父节点
         */ 
        private uiGroup: egret.DisplayObjectContainer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
        
        
        public constructor(_uiGroup: egret.DisplayObjectContainer,_onCallBack:Function) {
        	  this.uiGroup=_uiGroup;
        	  this.onCallBack=_onCallBack;
        	  this.flyBox();
    	  }
    	
        private flyBox() {
            var factory: dragonBones.EgretFactory = Model.DragonBones.addArmatureToFactory("Tx_box_ske_json","Tx_box_tex_json","Tx_box_tex_png");
            this.boxAnimel = Model.DragonBones.buildArmature(factory,"Tx_box");
            this.boxAnimel.display.x = Model.Mathf.random(100,500);
            this.boxAnimel.display.y = 0;
            this.boxAnimel.display.touchEnabled = true;
            this.display=this.boxAnimel.display;
            dragonBones.WorldClock.clock.add(this.boxAnimel);
            this.boxAnimel.animation.gotoAndPlay("boxfly",-1,-1,0);
            this.uiGroup.addChild(this.boxAnimel.display);
            
            //生成起点以及终点坐标
            this.startPos = new Model.Vector2(Model.Mathf.random(200,400),Model.Mathf.random(100,150));
            this.endPos = new Model.Vector2(200,450);
            
            //left与right值作为贝塞尔的p1点
            this.leftPos = new Model.Vector2(-180,200);
            this.rightPos = new Model.Vector2(780,200);
            
//            //先达到起始点
//            //各个时间需求
//            var startTime = 2000;//出现到旋转位置开始时的时间
//            var returnTime = 800;//返回时间
//            var roundTime = 8000;//旋转时间
//            var showTime = startTime + returnTime + 2 * roundTime;//总共在屏幕上显示的时间
            
//            egret.Tween.get(this.boxAnimel.display).to({ x: this.startPos.x,y: this.startPos.y },this.startTime).call(() => {
//                //实现画圈圈的效果
//                egret.Tween.get(this).to({ factor: 1 },this.roundTime,egret.Ease.sineInOut).call(() => {
//                    this.endPos = new Model.Vector2(500,450);
//                    egret.Tween.get(this).to({ factor: 1 },this.roundTime,egret.Ease.sineInOut).call(() => {
//                        egret.Tween.get(this.boxAnimel.display).to({ x: Model.Mathf.random(0,600),y: 0 },this.returnTime).call(() => {
//                            this.uiGroup.removeChild(this.boxAnimel.display);
//                            this.onCallBack();
//                        });
//                    });
//                });
//            });
        }
        
        /**
         * @出现函数
         */ 
        public showFun(_onCallBack?:Function){
            egret.Tween.get(this.display).to({ x: this.startPos.x,y: this.startPos.y },this.startTime).call(() => {
                if(_onCallBack){
                    _onCallBack();
                }
            });
        }
        
        /**
         * @转圈圈函数
         */ 
        public turnAroundFun(_onCallBack?: Function){
            //实现画圈圈的效果
            egret.Tween.get(this).to({ factor: 1 },this.roundTime,egret.Ease.sineInOut).call(() => {
                this.endPos = new Model.Vector2(500,450);
                egret.Tween.get(this).to({ factor: 1 },this.roundTime,egret.Ease.sineInOut).call(() => {
                    if(_onCallBack) {
                        _onCallBack();
                    }
                });
            });
        }
        
        /**
         * @实现返回函数
         */ 
        public returnFun(_onCallBack?:Function){
            egret.Tween.get(this.display).to({ x: Model.Mathf.random(0,600),y: 0 },this.returnTime).call(() => {
                
                if(this.display){
                    this.uiGroup.removeChild(this.boxAnimel.display);
                }
                
                if(_onCallBack) {
                    _onCallBack();
                }
                if(this.onCallBack) {
                    this.onCallBack();
                }
            });
        }
        
        /**
         * @掉落函数
         */ 
        public dropDownFun(_onCallBack?:Function){
            //中断当前所有tween动画
            this.boxAnimel.animation.gotoAndPlay("boxdown",-1,-1,1);

            egret.Tween.removeTweens(this.display);
            egret.Tween.removeTweens(this);
            //开始掉落
            egret.Tween.get(this.boxAnimel.display).to({ y: 540 },this.returnTime).call(() => {
                this.boxAnimel.animation.gotoAndPlay("openbox",-1,-1,1);
                egret.setTimeout(() => {
                    if(_onCallBack) {
                        _onCallBack();
                    } else {
                        this.finalUsing();
                    }
                    if(this.onCallBack){
                        this.onCallBack();
                    }
                    this.uiGroup.removeChild(this.boxAnimel.display);
                },this,800);
            });
        }
        
        /**
         * @点击后的实现函数
         */ 
        public clickFun(_onCallBack?:Function){
            this.boxAnimel.display.once(egret.TouchEvent.TOUCH_TAP,() => {
                this.dropDownFun(_onCallBack);
//                if(_onCallBack){
//                    _onCallBack();
//                }
            },this)
        }
        
        

        public get factor(): number {
            return 0;
        }

        public set factor(t: number) {
            this.boxAnimel.display.x = (1 - t) * (1 - t) * (1 - t) * (1 - t) * this.startPos.x + 4 * t * (1 - t) * (1 - t) * (1 - t) * this.leftPos.x + 6 * t * t * (1 - t) * (1 - t) * this.endPos.x + 4 * t * t * t * (1 - t) * this.rightPos.x + t * t * t * t * this.startPos.x;
            this.boxAnimel.display.y = (1 - t) * (1 - t) * (1 - t) * (1 - t) * this.startPos.y + 4 * t * (1 - t) * (1 - t) * (1 - t) * this.leftPos.y + 6 * t * t * (1 - t) * (1 - t) * this.endPos.y + 4 * t * t * t * (1 - t) * this.rightPos.y + t * t * t * t * this.startPos.y;
        }
        
        /**
         * @小飞箱掉落时随机抽取方法
         */ 
        public finalUsing(){
            
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_GIFT,1);
            
            //先设置数据
            Model.FlyBoxLocalService.setDropList();//更新小飞箱掉落数据 by cai_haotian 2016.3.15.
            var skillFlag = true;
            //先判断有无技能在持续中如果有那么将skillFlag置为False 掉落不会出现技能
            for(var i = 0;i < Main.singleton.mainMenuVM.mainInfo.skillGroup.numElements;i++) {
                var skillItem = <ViewModel.BtnActiveSkillVM>Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(i);
                if(skillItem.currentState == "during") {
                    skillFlag = false;
                }
            }

            if(skillFlag) {
                //使用技能的概率为80%，掉落金币的概率为20%
                var probability = Model.Mathf.random(0,10000);
                if(probability <= 8000) {
                    var skillProbability = Model.Mathf.random(0,4);
                    var skillInfo: Model.FlyBoxSkillData = Model.FlyBoxLocalService.skillInfo[skillProbability];
                    
                    Main.singleton.mainMenuVM.mainInfo.skillAnimel(skillInfo.skillData,skillInfo.skillItem,false,(_data:Model.PlayerSkillData,_duringTime:number)=>{
                        Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                        Main.singleton.mainMenuVM.flyBoxIcon.source = _data.st.icon;
                        Main.singleton.mainMenuVM.flyBoxDescription.text = _data.Description + "  " + Model.PlayerSkillLocalService.timeDes(_duringTime);
                        if(_duringTime<=0){
                            Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                        }
                    });
                } else {
                    var currencyProbability = Model.Mathf.random(0,100);
                    var getCurrency = Model.FlyBoxLocalService.getCurrency(currencyProbability);
                    Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                    Main.singleton.mainMenuVM.flyBoxIcon.source = "";
                    Main.singleton.mainMenuVM.flyBoxDescription.text = getCurrency;
                    egret.setTimeout(() => {
                        Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                    },this,1000);
                }
            } else {
                //skillFlag为false时只能获得铜币
                var getCurrency = Model.FlyBoxLocalService.getCurrency(50);
                Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                Main.singleton.mainMenuVM.flyBoxIcon.source = "";
                Main.singleton.mainMenuVM.flyBoxDescription.text = getCurrency;
                egret.setTimeout(() => {
                    Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                },this,1000);
            }
        }
        
        
        
    }
}