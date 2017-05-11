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
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var BtnBottomItemVM = (function (_super) {
        __extends(BtnBottomItemVM, _super);
        function BtnBottomItemVM(_onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @在exml里面给btnWord_up状态赋值.
             */
            _this.btnWordSource = "";
            /**
             * @在exml里面给btnWord_down状态赋值.
             */
            _this.btnWordSourceDown = "";
            _this.skinName = "View.BtnBottomItem";
            _this.onCallBack = _onCallBack;
            _this.setSkinPart("btnWordSource", _this.btnWordSource);
            _this.setSkinPart("btnWordSourceDown", _this.btnWordSourceDown);
            return _this;
        }
        BtnBottomItemVM.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.btnWord.source = this.btnWordSource;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.AudioService.Shared().PlaySound("YX-002_mp3");
                if (_this.currentState == "down") {
                    _this.btnWord.source = _this.btnWordSourceDown;
                }
                else {
                    _this.btnWord.source = _this.btnWordSource;
                }
            }, this);
        };
        /**
         * @控件状态监听.
         */
        BtnBottomItemVM.prototype.getCurrentState = function () {
            if (_super.prototype.getCurrentState.call(this) == "down") {
                this.btnWord.source = this.btnWordSourceDown;
            }
            else {
                this.btnWord.source = this.btnWordSource;
            }
            return _super.prototype.getCurrentState.call(this);
        };
        return BtnBottomItemVM;
    }(eui.Button));
    ViewModel.BtnBottomItemVM = BtnBottomItemVM;
    __reflect(BtnBottomItemVM.prototype, "ViewModel.BtnBottomItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnBottomItemVM.js.map