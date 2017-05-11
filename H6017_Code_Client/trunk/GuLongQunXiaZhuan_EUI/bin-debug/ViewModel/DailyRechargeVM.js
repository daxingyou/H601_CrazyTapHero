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
    var DailyRechargeVM = (function (_super) {
        __extends(DailyRechargeVM, _super);
        function DailyRechargeVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            if (Model.WebValue.isTraditional) {
                _this.skinName = View.DailyRechargeView_tw;
            }
            else {
                _this.skinName = View.DailyRechargeView;
            }
            _this.uiLayer = _uiLayer;
            _this.uiLayer.addChild(_this);
            _this.onCallBack = _onCallBack;
            return _this;
        }
        DailyRechargeVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
        };
        DailyRechargeVM.prototype.initWindow = function () {
            var _this = this;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
            this.rechargeBtn.costIcon.visible = false;
            if (Model.WebValue.isTraditional) {
                this.rechargeBtn.costNum.text = "";
                this.rechargeBtn.description.text = "儲 值";
            }
            else {
                this.rechargeBtn.costNum.text = "￥ 6";
                this.rechargeBtn.description.text = "充 值";
            }
            this.rechargeBtn.description.size = 24;
            this.rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyEvent, this);
        };
        DailyRechargeVM.prototype.setList = function (_data) {
            var listInfo = _data.dailyRechargeList;
            this.continueTime.text = _data.playerDuration + "";
            for (var i = 0; i < listInfo.length; i++) {
                var item = new ViewModel.DailyRechargeItemVM(this.listGroup, function (_data) {
                    Model.WebService.GetDailyRecharge(_data.dailyRechargeId, function () {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian GetDailyRecharge success!!!!!!");
                        }
                        Model.PlayerLocalService.PlayerData.dy.treasure += _data.rewardCountFirst;
                        Model.PlayerLocalService.PlayerData.AddJewel = _data.rewardCountSecond;
                        //调用成就 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, _data.rewardCountSecond);
                    }, function () {
                        if (Model.WebValue.isTraditional) {
                            alert("獲取每日充值獎勵失敗！請聯繫管理員！");
                        }
                        else {
                            alert("获取每日充值奖励失败！请联系管理员！");
                        }
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian GetDailyRecharge failed!!!!!!!");
                        }
                    });
                });
                item.setInfo(listInfo[i]);
            }
        };
        /**
         * @回调函数
         */
        DailyRechargeVM.prototype.buyEvent = function () {
            if (this.onCallBack) {
                if (Model.WebValue.isTraditional) {
                    this.uiLayer.removeChild(this);
                }
                this.onCallBack();
            }
        };
        return DailyRechargeVM;
    }(eui.Component));
    ViewModel.DailyRechargeVM = DailyRechargeVM;
    __reflect(DailyRechargeVM.prototype, "ViewModel.DailyRechargeVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=DailyRechargeVM.js.map