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
     *
     * @author cai_haotian
     * @date 2016.1.18.
     *
     */
    var DailChallengeVM = (function (_super) {
        __extends(DailChallengeVM, _super);
        function DailChallengeVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @列表组
             */
            _this.items = [];
            /**
             * @所有数据
             */
            _this.dataList = [];
            if (Model.WebValue.isTraditional) {
                _this.skinName = View.DailyChallenge_tw;
            }
            else {
                _this.skinName = View.DailyChallenge;
            }
            _this.uiLayer = _uiLayer;
            _this.uiLayer.addChild(_this);
            _this.onCallBack = _onCallBack;
            return _this;
        }
        DailChallengeVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
            this.initItem();
            this.initBtn();
        };
        DailChallengeVM.prototype.initWindow = function () {
            var _this = this;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.countTime) {
                    egret.clearInterval(_this.countTime);
                }
                _this.uiLayer.removeChild(_this);
            }, this);
            this.startChanllenge.setChallengBtn(true);
        };
        /**
         * @判断当前是否可以进行挑战
         */
        DailChallengeVM.prototype.initBtn = function () {
            var _this = this;
            var myDate = new Date();
            var now = myDate.getTime() / 1000;
            if (now - Model.PlayerLocalService.PlayerData.dy.chanllengeTime <= Number(Model.PlayerLocalService.PlayerData.st.everydayCD)) {
                this.startChanllenge.setChallengBtn(false);
                var lastTime = Number(Model.PlayerLocalService.PlayerData.st.everydayCD) - (now - Model.PlayerLocalService.PlayerData.dy.chanllengeTime);
                var des = Model.TimeSpan.FromSeconds(lastTime);
                this.countDown.text = des.toString();
                lastTime--;
                this.countTime = egret.setInterval(function () {
                    var des = Model.TimeSpan.FromSeconds(lastTime);
                    _this.countDown.text = des.toString();
                    lastTime--;
                }, this, 1000);
            }
            else {
                this.countDown.text = "00:00:00";
            }
        };
        DailChallengeVM.prototype.initItem = function () {
            var _this = this;
            this.items = [this.list0, this.list1, this.list2, this.list3, this.list4];
            if (Model.WebValue.isTraditional) {
                this.accumulateLogin.textFlow = [
                    { text: "今天是妳登錄的第" }, { text: Model.PlayerLocalService.PlayerData.dy.cumulativeLogin + "", style: { "size": 24, "textColor": 0xFF0000 } }, { text: "天哦~" }
                ];
            }
            else {
                this.accumulateLogin.textFlow = [
                    { text: "亲，今天是你登录的第" }, { text: Model.PlayerLocalService.PlayerData.dy.cumulativeLogin + "", style: { "size": 24, "textColor": 0xFF0000 } }, { text: "天哦~" }
                ];
            }
            Model.ChallengeLoaclService.setChallengeData(); //设置数据
            this.dataList = Model.ChallengeLoaclService.ChallengeDataList; //组织数据
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].setItemInfo(this.dataList[i]);
                this.items[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkFun, this);
            }
            this.startChanllenge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.checkInfo) {
                    var myDate = new Date();
                    var now = myDate.getTime() / 1000;
                    Model.PlayerLocalService.PlayerData.isChallenge = true;
                    Model.ChallengeLoaclService.challengeBossData = _this.checkInfo;
                    //更改ui血量
                    Main.singleton.mainGameVM.sceneInfo.setChallengeBoss();
                    //开始计时
                    Main.singleton.mainGameVM.sceneInfo.initCBoss();
                    if (_this.countTime) {
                        egret.clearInterval(_this.countTime);
                    }
                    Model.ChallengeLoaclService.setChallengeCD(Math.round(now));
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
                    _this.uiLayer.removeChild(_this);
                }
                else {
                    alert("请选择挑战难度！");
                }
            }, this);
        };
        DailChallengeVM.prototype.checkFun = function (evt) {
            for (var i = 0; i < this.items.length; i++) {
                if (evt.target == this.items[i]) {
                    this.items[i].currentState = "down";
                    this.items[i].enabled = false;
                    this.checkInfo = this.dataList[i];
                }
                else {
                    this.items[i].currentState = "up";
                    this.items[i].enabled = true;
                }
            }
        };
        return DailChallengeVM;
    }(eui.Component));
    ViewModel.DailChallengeVM = DailChallengeVM;
    __reflect(DailChallengeVM.prototype, "ViewModel.DailChallengeVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=DailyChallengeVM.js.map