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
     * @date 2016.1.4.
     *
     */
    var RankListItemVM = (function (_super) {
        __extends(RankListItemVM, _super);
        function RankListItemVM(_uiGroup, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.RankListItem;
            _this.uiGroup = _uiGroup;
            _this.onCallBack = _onCallBack;
            _this.uiGroup.addChild(_this);
            return _this;
        }
        RankListItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @设置闯关item
         */
        RankListItemVM.prototype.setSceneItem = function (_data) {
            this.userName.text = _data.nickName;
            if (Model.WebValue.isTraditional) {
                this.detail.text = "完成關卡：" + _data.scene;
            }
            else {
                this.detail.text = "完成关卡：" + _data.scene;
            }
            this.setRanklevel(_data.rank);
        };
        /**
         * @设置伤害item
         */
        RankListItemVM.prototype.setDpsItem = function (_data) {
            this.userName.text = _data.nickName;
            if (Model.WebValue.isTraditional) {
                this.detail.text = "隊友秒傷：" + Model.MainLocalService.toUnitConversion(Number(_data.dps));
            }
            else {
                this.detail.text = "队友秒伤：" + Model.MainLocalService.toUnitConversion(Number(_data.dps));
            }
            this.setRanklevel(_data.rank);
        };
        /**
         * @设置充值item
         */
        RankListItemVM.prototype.setRechargeItem = function (_data) {
            this.userName.text = _data.nickName;
            if (Model.WebValue.isTraditional) {
                this.detail.text = "累計儲值：" + _data.recharge;
            }
            else {
                this.detail.text = "累计充值：" + _data.recharge;
            }
            this.setRanklevel(_data.rank);
        };
        /**
         * @设置排名显示
         */
        RankListItemVM.prototype.setRanklevel = function (_id) {
            switch (_id) {
                case "1":
                    this.first.visible = true;
                    break;
                case "2":
                    this.second.visible = true;
                    break;
                case "3":
                    this.third.visible = true;
                    break;
                default:
                    this.rankingGroup.visible = true;
                    this.rankingNum.text = _id + "";
            }
        };
        return RankListItemVM;
    }(eui.Component));
    ViewModel.RankListItemVM = RankListItemVM;
    __reflect(RankListItemVM.prototype, "ViewModel.RankListItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=RankListItemVM.js.map