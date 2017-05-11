var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author cai_haotian
     * @date 2016.3.14
     *
     */
    var FlyBox = (function () {
        function FlyBox(_uiGroup, _onCallBack) {
            /**
             * @从页面外出现到旋转位置的开始时间
             */
            this.startTime = 2000;
            /**
             * @返回时间
             */
            this.returnTime = 800;
            /**
             * @旋转时间
             */
            this.roundTime = 8000; //旋转时间
            /**
             * @在屏幕上显示的总时间
             */
            this.showTime = this.startTime + this.returnTime + 2 * this.roundTime;
            this.uiGroup = _uiGroup;
            this.onCallBack = _onCallBack;
            this.flyBox();
        }
        FlyBox.prototype.flyBox = function () {
            var factory = Model.DragonBones.addArmatureToFactory("Tx_box_ske_json", "Tx_box_tex_json", "Tx_box_tex_png");
            this.boxAnimel = Model.DragonBones.buildArmature(factory, "Tx_box");
            this.boxAnimel.display.x = Model.Mathf.random(100, 500);
            this.boxAnimel.display.y = 0;
            this.boxAnimel.display.touchEnabled = true;
            this.display = this.boxAnimel.display;
            dragonBones.WorldClock.clock.add(this.boxAnimel);
            this.boxAnimel.animation.gotoAndPlay("boxfly", -1, -1, 0);
            this.uiGroup.addChild(this.boxAnimel.display);
            //生成起点以及终点坐标
            this.startPos = new Model.Vector2(Model.Mathf.random(200, 400), Model.Mathf.random(100, 150));
            this.endPos = new Model.Vector2(200, 450);
            //left与right值作为贝塞尔的p1点
            this.leftPos = new Model.Vector2(-180, 200);
            this.rightPos = new Model.Vector2(780, 200);
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
        };
        /**
         * @出现函数
         */
        FlyBox.prototype.showFun = function (_onCallBack) {
            egret.Tween.get(this.display).to({ x: this.startPos.x, y: this.startPos.y }, this.startTime).call(function () {
                if (_onCallBack) {
                    _onCallBack();
                }
            });
        };
        /**
         * @转圈圈函数
         */
        FlyBox.prototype.turnAroundFun = function (_onCallBack) {
            var _this = this;
            //实现画圈圈的效果
            egret.Tween.get(this).to({ factor: 1 }, this.roundTime, egret.Ease.sineInOut).call(function () {
                _this.endPos = new Model.Vector2(500, 450);
                egret.Tween.get(_this).to({ factor: 1 }, _this.roundTime, egret.Ease.sineInOut).call(function () {
                    if (_onCallBack) {
                        _onCallBack();
                    }
                });
            });
        };
        /**
         * @实现返回函数
         */
        FlyBox.prototype.returnFun = function (_onCallBack) {
            var _this = this;
            egret.Tween.get(this.display).to({ x: Model.Mathf.random(0, 600), y: 0 }, this.returnTime).call(function () {
                if (_this.display) {
                    _this.uiGroup.removeChild(_this.boxAnimel.display);
                }
                if (_onCallBack) {
                    _onCallBack();
                }
                if (_this.onCallBack) {
                    _this.onCallBack();
                }
            });
        };
        /**
         * @掉落函数
         */
        FlyBox.prototype.dropDownFun = function (_onCallBack) {
            var _this = this;
            //中断当前所有tween动画
            this.boxAnimel.animation.gotoAndPlay("boxdown", -1, -1, 1);
            egret.Tween.removeTweens(this.display);
            egret.Tween.removeTweens(this);
            //开始掉落
            egret.Tween.get(this.boxAnimel.display).to({ y: 540 }, this.returnTime).call(function () {
                _this.boxAnimel.animation.gotoAndPlay("openbox", -1, -1, 1);
                egret.setTimeout(function () {
                    if (_onCallBack) {
                        _onCallBack();
                    }
                    else {
                        _this.finalUsing();
                    }
                    if (_this.onCallBack) {
                        _this.onCallBack();
                    }
                    _this.uiGroup.removeChild(_this.boxAnimel.display);
                }, _this, 800);
            });
        };
        /**
         * @点击后的实现函数
         */
        FlyBox.prototype.clickFun = function (_onCallBack) {
            var _this = this;
            this.boxAnimel.display.once(egret.TouchEvent.TOUCH_TAP, function () {
                _this.dropDownFun(_onCallBack);
                //                if(_onCallBack){
                //                    _onCallBack();
                //                }
            }, this);
        };
        Object.defineProperty(FlyBox.prototype, "factor", {
            get: function () {
                return 0;
            },
            set: function (t) {
                this.boxAnimel.display.x = (1 - t) * (1 - t) * (1 - t) * (1 - t) * this.startPos.x + 4 * t * (1 - t) * (1 - t) * (1 - t) * this.leftPos.x + 6 * t * t * (1 - t) * (1 - t) * this.endPos.x + 4 * t * t * t * (1 - t) * this.rightPos.x + t * t * t * t * this.startPos.x;
                this.boxAnimel.display.y = (1 - t) * (1 - t) * (1 - t) * (1 - t) * this.startPos.y + 4 * t * (1 - t) * (1 - t) * (1 - t) * this.leftPos.y + 6 * t * t * (1 - t) * (1 - t) * this.endPos.y + 4 * t * t * t * (1 - t) * this.rightPos.y + t * t * t * t * this.startPos.y;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @小飞箱掉落时随机抽取方法
         */
        FlyBox.prototype.finalUsing = function () {
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_GIFT, 1);
            //先设置数据
            Model.FlyBoxLocalService.setDropList(); //更新小飞箱掉落数据 by cai_haotian 2016.3.15.
            var skillFlag = true;
            //先判断有无技能在持续中如果有那么将skillFlag置为False 掉落不会出现技能
            for (var i = 0; i < Main.singleton.mainMenuVM.mainInfo.skillGroup.numElements; i++) {
                var skillItem = Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(i);
                if (skillItem.currentState == "during") {
                    skillFlag = false;
                }
            }
            if (skillFlag) {
                //使用技能的概率为80%，掉落金币的概率为20%
                var probability = Model.Mathf.random(0, 10000);
                if (probability <= 8000) {
                    var skillProbability = Model.Mathf.random(0, 4);
                    var skillInfo = Model.FlyBoxLocalService.skillInfo[skillProbability];
                    Main.singleton.mainMenuVM.mainInfo.skillAnimel(skillInfo.skillData, skillInfo.skillItem, false, function (_data, _duringTime) {
                        Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                        Main.singleton.mainMenuVM.flyBoxIcon.source = _data.st.icon;
                        Main.singleton.mainMenuVM.flyBoxDescription.text = _data.Description + "  " + Model.PlayerSkillLocalService.timeDes(_duringTime);
                        if (_duringTime <= 0) {
                            Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                        }
                    });
                }
                else {
                    var currencyProbability = Model.Mathf.random(0, 100);
                    var getCurrency = Model.FlyBoxLocalService.getCurrency(currencyProbability);
                    Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                    Main.singleton.mainMenuVM.flyBoxIcon.source = "";
                    Main.singleton.mainMenuVM.flyBoxDescription.text = getCurrency;
                    egret.setTimeout(function () {
                        Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                    }, this, 1000);
                }
            }
            else {
                //skillFlag为false时只能获得铜币
                var getCurrency = Model.FlyBoxLocalService.getCurrency(50);
                Main.singleton.mainMenuVM.flyBoxGroup.visible = true;
                Main.singleton.mainMenuVM.flyBoxIcon.source = "";
                Main.singleton.mainMenuVM.flyBoxDescription.text = getCurrency;
                egret.setTimeout(function () {
                    Main.singleton.mainMenuVM.flyBoxGroup.visible = false;
                }, this, 1000);
            }
        };
        return FlyBox;
    }());
    ViewModel.FlyBox = FlyBox;
    __reflect(FlyBox.prototype, "ViewModel.FlyBox");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=FlyBoxVM.js.map