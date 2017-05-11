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
     * @author fangchao
     *
     */
    var DailyRechargeItemVM = (function (_super) {
        __extends(DailyRechargeItemVM, _super);
        function DailyRechargeItemVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.DailyRechargeItem;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        DailyRechargeItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initItem();
        };
        DailyRechargeItemVM.prototype.initItem = function () {
            this.rewardBtn.costIcon.visible = false;
            this.rewardBtn.costNum.visible = false;
        };
        DailyRechargeItemVM.prototype.setInfo = function (_data) {
            this.data = _data;
            if (Model.WebValue.isTraditional) {
                this.description.text = "連續儲值" + _data.cumulativeDays + "天，可領取：";
            }
            else {
                this.description.text = "连续充值" + _data.cumulativeDays + "天，可領取：";
            }
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
            this.icon0.source = "icon_jinbi";
            this.number0.text = _data.rewardCountFirst + "";
            this.icon1.source = "icon_lingshi";
            this.number1.text = _data.rewardCountSecond + "";
            switch (_data.rewardState) {
                case -1:
                    this.rewardBtn.setDailyRecharge(true);
                    break;
                case 0:
                    this.rewardBtn.setDailyRecharge(false);
                    break;
                case 1:
                    this.rewardBtn.visible = false;
                    this.finish.visible = true;
                    break;
                default: alert("数据状态错误！请联系管理员！！！");
            }
        };
        /**
         * @回调函数
         */
        DailyRechargeItemVM.prototype.getReward = function () {
            if (this.onCallBack) {
                this.onCallBack(this.data);
                this.rewardBtn.visible = false;
                this.finish.visible = true;
            }
        };
        return DailyRechargeItemVM;
    }(eui.Component));
    ViewModel.DailyRechargeItemVM = DailyRechargeItemVM;
    __reflect(DailyRechargeItemVM.prototype, "ViewModel.DailyRechargeItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=DailyRechargeItemVM.js.map