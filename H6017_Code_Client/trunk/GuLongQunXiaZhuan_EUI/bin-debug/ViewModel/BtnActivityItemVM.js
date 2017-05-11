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
     * @author cai_haotian 2016.3.21
     *
     */
    var BtnActivityItemVM = (function (_super) {
        __extends(BtnActivityItemVM, _super);
        function BtnActivityItemVM(_onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @给btnIcon字段赋值.
             */
            _this.btnIconSource = "";
            _this.skinName = "View.BtnActivityItem";
            _this.onCallBack = _onCallBack;
            return _this;
        }
        BtnActivityItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnIcon.source = this.btnIconSource;
        };
        return BtnActivityItemVM;
    }(eui.Button));
    ViewModel.BtnActivityItemVM = BtnActivityItemVM;
    __reflect(BtnActivityItemVM.prototype, "ViewModel.BtnActivityItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnActivityItemVM.js.map