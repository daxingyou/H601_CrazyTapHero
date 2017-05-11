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
     * @date 2016.3.22.
     *
     */
    var BtnActivityVM = (function (_super) {
        __extends(BtnActivityVM, _super);
        function BtnActivityVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnActivityView_tw;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            return _this;
        }
        BtnActivityVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return BtnActivityVM;
    }(eui.Component));
    ViewModel.BtnActivityVM = BtnActivityVM;
    __reflect(BtnActivityVM.prototype, "ViewModel.BtnActivityVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnActivityVM.js.map