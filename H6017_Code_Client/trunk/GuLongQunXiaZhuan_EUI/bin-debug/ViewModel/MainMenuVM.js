var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var MainMenuVM = (function (_super) {
        __extends(MainMenuVM, _super);
        function MainMenuVM(_uiLayer, _onCallBack, pageName) {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            if (Model.WebValue.isTraditional) {
                _this.skinName = View.MainMenuView_tw;
            }
            else {
                _this.skinName = View.MainMenuView;
            }
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChildAt(_this, 1);
            //            if(pageName == PageName.SceneList) {
            //                this.extraInitSceneList();
            //            } else { 
            //                
            //            }
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: add main menu vm to ui layer !　");
            return _this;
        }
        //        private extraInitSceneList() { 
        //            this.menuBtnGroup.x = -1280;
        //            this.levelGroup.x = 0;
        //        }
        MainMenuVM.prototype.onComplete = function () {
            if (Model.WebServiceBase.isDebug) {
                console.log("onComplete");
            }
        };
        MainMenuVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottom();
            this.initActivityBtn();
            this.initBtnGroup();
        };
        /**
         * @主页面顶部按钮事件初始化.
         */
        MainMenuVM.prototype.initBtnTop = function () {
            var _this = this;
            this.btnTop.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new ViewModel.SettingsVM(Main.singleton, function () { });
            }, this);
            this.btnTop.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new ViewModel.AchievementVM(Main.singleton, function () { });
            }, this);
            this.btnTop.btnFamily.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new ViewModel.FamilyVM(Main.singleton, function () { });
            }, this);
            this.btnTop.btnRanking.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var RankList = new ViewModel.RankListVM(Main.singleton, function () { });
                Model.WebService.RankingData(function (_data) {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian rankingData get success!!!!!" + JSON.stringify(_data));
                    }
                    RankList.setRankScene(_data.rankSceneList, _data.rankScene, _data.sceneChange);
                    RankList.setRankDps(_data.rankDPSList, _data.rankDPS, _data.DPSChange);
                    RankList.setRechargeDps(_data.rankRechargeList, _data.rankRecharge, _data.rechargeChange);
                }, function () {
                    if (Model.WebValue.isTraditional) {
                        alert("獲取玩家排行失敗！");
                    }
                    else {
                        alert("获取玩家排行失败！");
                    }
                });
            }, this);
            this.btnTop.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //by cai_haotian 2016.3.22.
                if (_this.activity.alpha == 0) {
                    egret.Tween.get(_this.activity).to({ y: 74, alpha: 1 }, 800, egret.Ease.backOut);
                }
                else {
                    egret.Tween.get(_this.activity).to({ y: -156, alpha: 0 }, 800, egret.Ease.backOut);
                }
            }, this);
        };
        /**
         * @初始化菜单弹窗.
         */
        MainMenuVM.prototype.initMenuPopup = function () {
            var _this = this;
            this.menuPopupGroup.visible = false;
            this.menuPopup.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, function () {
                    Main.singleton.mainMenuVM.offLineGroup.visible = true;
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    }
                    else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                });
                _this.menuPopupGroup.visible = false;
                _this.currentPage = PageName.MainInfo;
            }, this);
            this.menuPopup.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
        };
        /**
         * @主页底部按钮事件初始化.
         */
        MainMenuVM.prototype.initBtnBottom = function () {
            var _this = this;
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setPData();
                _this.currentPage = PageName.Player;
            }, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setBFData();
                _this.currentPage = PageName.Friend;
            }, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setAData();
                _this.currentPage = PageName.MagicWeapon;
            }, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setMData();
                _this.currentPage = PageName.Mall;
            }, this);
        };
        /**
         * @初始化按钮组
         * @by cai_haotian 2016.3.28
         */
        MainMenuVM.prototype.initBtnGroup = function () {
            this.btnGroup = [this.btnBottom.btnProtagonist, this.btnBottom.btnBosomFriend, this.btnBottom.btnArtifact, this.btnBottom.btnMall];
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
        };
        /**
         * @根据点击转换按钮状态
         * @by cai_haotian 2016.3.28
         */
        MainMenuVM.prototype.btnChange = function (evt) {
            for (var i = 0; i < this.btnGroup.length; i++) {
                if (evt.target == this.btnGroup[i]) {
                    this.btnGroup[i].currentState = "down";
                    this.btnGroup[i].enabled = false;
                    this.btnGroup[i].btnWord.source = this.btnGroup[i].btnWordSourceDown;
                }
                else {
                    this.btnGroup[i].currentState = "up";
                    this.btnGroup[i].enabled = true;
                    this.btnGroup[i].btnWord.source = this.btnGroup[i].btnWordSource;
                }
            }
        };
        /**
         * @初始化活动按钮组
         * @by cai_haotian 2016.3.22.
         */
        MainMenuVM.prototype.initActivityBtn = function () {
            //累计奖励
            this.activity.accumulateRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (Model.PlayerLocalService.PlayerData.st.cumulativeRechargeSwitch) {
                    var TotalReward = new ViewModel.TotalRewardVM(Main.singleton, function () { });
                    Model.WebService.UpdateCumulativeRecharge(function (_data) {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian upDateCumulativeRecharge successed!!!!!!!!" + JSON.stringify(_data));
                        }
                        TotalReward.setList(_data);
                    }, function () {
                        if (Model.WebValue.isTraditional) {
                            alert("獲取累計獎勵失敗！！！請聯繫管理員！！！");
                        }
                        else {
                            alert("获取累计奖励失败！！！请联系管理员！！！");
                        }
                    });
                }
                else {
                    alert("活动尚未开放！敬请期待！");
                }
            }, this);
            //领取奖励
            this.activity.getRewards.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var partInReward = new ViewModel.PartInRewardVM(Main.singleton, function (txt) {
                    Model.WebService.PartInRward(txt, function (data) {
                        var rewardInfo = new ViewModel.ReceiveRewardsVM(Main.singleton, function () { });
                        rewardInfo.rewardInfo(data);
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cht partIn reward success" + JSON.stringify(data));
                        }
                    }, function (data) {
                        var rewardInfo = new ViewModel.ReceiveRewardsVM(Main.singleton, function () { });
                        rewardInfo.wrongInfo(data);
                    });
                });
            }, this);
            //每日充值
            this.activity.dailyRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (Model.PlayerLocalService.PlayerData.st.everydayRechargeSwitch) {
                    var dailyRecharge = new ViewModel.DailyRechargeVM(Main.singleton, function () {
                        if (Model.WebValue.isTraditional) {
                            for (var i = 0; i < Main.singleton.mainMenuVM.btnGroup.length; i++) {
                                if (Main.singleton.mainMenuVM.btnBottom.btnMall == Main.singleton.mainMenuVM.btnGroup[i]) {
                                    Main.singleton.mainMenuVM.btnGroup[i].currentState = "down";
                                    Main.singleton.mainMenuVM.btnGroup[i].enabled = false;
                                    Main.singleton.mainMenuVM.btnGroup[i].btnWord.source = Main.singleton.mainMenuVM.btnGroup[i].btnWordSourceDown;
                                }
                                else {
                                    Main.singleton.mainMenuVM.btnGroup[i].currentState = "up";
                                    Main.singleton.mainMenuVM.btnGroup[i].enabled = true;
                                    Main.singleton.mainMenuVM.btnGroup[i].btnWord.source = Main.singleton.mainMenuVM.btnGroup[i].btnWordSource;
                                }
                            }
                            Main.singleton.mainMenuVM.menuPopupGroup.visible = true;
                            Main.singleton.mainMenuVM.menuPopup.setMData(true);
                        }
                        else {
                            var data = Enumerable.From(Model.WebValue.dataStModel.shopList).Where(function (x) { return x.costRmb == 6; }).FirstOrDefault(null);
                            //这里也要接中间件支付
                            var item = {
                                "id": data.id,
                                "name": data.name,
                                "price": data.costRmb,
                                "count": 1,
                                "currency": "CUR_CNY"
                            };
                            DCAgent.onPayment({ amount: data.costRmb, currencyType: "CUR_CNY", payType: "", iapid: "", orderId: data.id });
                            lwsdk.pay(item, function () {
                                Model.WebService.Recharge(function (_data) {
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("cai_haotian rechargeText success!!!!!");
                                    }
                                    for (var i = 0; i < _data.shopList.length; i++) {
                                        Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].cost);
                                        Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].extraGet);
                                    }
                                    Main.singleton.mainGameVM.sceneInfo.init(); //更新主场景ui
                                }, function () {
                                    if (Model.WebValue.isTraditional) {
                                        alert("支付獲取失敗！");
                                    }
                                    else {
                                        alert("支付获取失败！");
                                    }
                                });
                            });
                        }
                    });
                    Model.WebService.UpdateDailyRecharge(function (_data) {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian upDateDailyRecharge successed!!!!!!!!" + JSON.stringify(_data));
                        }
                        dailyRecharge.setList(_data);
                    }, function () {
                        if (Model.WebValue.isTraditional) {
                            alert("對不起！獲取每日充值信息失敗！");
                        }
                        else {
                            alert("对不起！获取每日充值信息失败！");
                        }
                    });
                }
                else {
                    alert("活动尚未开放！敬请期待！");
                }
            }, this);
            //每日挑战
            this.activity.dailyChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var dailyChallenge = new ViewModel.DailChallengeVM(Main.singleton, function () { });
            }, this);
        };
        /**
         * @刷新界面.
         */
        MainMenuVM.prototype.refreshMenu = function () {
            switch (this.currentPage) {
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
        };
        return MainMenuVM;
    }(eui.Component));
    ViewModel.MainMenuVM = MainMenuVM;
    __reflect(MainMenuVM.prototype, "ViewModel.MainMenuVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=MainMenuVM.js.map