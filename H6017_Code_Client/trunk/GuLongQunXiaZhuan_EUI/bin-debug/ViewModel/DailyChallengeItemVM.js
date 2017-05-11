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
    var DailyChallengeItemVM = (function (_super) {
        __extends(DailyChallengeItemVM, _super);
        function DailyChallengeItemVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.DailyChallengeItem;
            return _this;
        }
        DailyChallengeItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        DailyChallengeItemVM.prototype.setItemInfo = function (_data) {
            this.info = _data;
            var arr = ["", "一", "二", "三", "四", "五"];
            if (Model.WebValue.isTraditional) {
                this.date.text = "難度" + arr[_data.st.id];
            }
            else {
                this.date.text = "难度" + arr[_data.st.id];
            }
            this.texticon.source = _data.st.icon;
            this.description.text = _data.st.description.replace("{}", _data.st.rewardCount + "");
        };
        return DailyChallengeItemVM;
    }(eui.Button));
    ViewModel.DailyChallengeItemVM = DailyChallengeItemVM;
    __reflect(DailyChallengeItemVM.prototype, "ViewModel.DailyChallengeItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=DailyChallengeItemVM.js.map