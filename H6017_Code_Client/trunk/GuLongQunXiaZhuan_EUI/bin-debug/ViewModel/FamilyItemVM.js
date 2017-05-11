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
     * @author
     *
     */
    var FamilyItemVM = (function (_super) {
        __extends(FamilyItemVM, _super);
        function FamilyItemVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.FamilyItem;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        FamilyItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        FamilyItemVM.prototype.setItemInfo = function (_data) {
            this.clanData = _data;
            this.familyIcon.source = _data.st.pic;
            this.familyAttr.text = _data.st.name;
            this.familyAttrDetail.text = _data.st.described;
            this.activateBtn.visible = true;
            this.finished.visible = false;
            this.activateBtn.setClanBtn(_data.st.activationCost);
            if (_data.dy != null) {
                this.finished.visible = true;
                this.activateBtn.visible = false;
            }
            this.activateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnEvent, this);
        };
        FamilyItemVM.prototype.btnEvent = function () {
            if (this.onCallBack) {
                this.onCallBack(this.clanData);
            }
        };
        return FamilyItemVM;
    }(eui.Component));
    ViewModel.FamilyItemVM = FamilyItemVM;
    __reflect(FamilyItemVM.prototype, "ViewModel.FamilyItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=FamilyItemVM.js.map