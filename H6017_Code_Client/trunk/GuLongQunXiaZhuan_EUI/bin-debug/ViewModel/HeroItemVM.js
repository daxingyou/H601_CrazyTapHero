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
     * @author: fangchao
     * @revise: zhu_jun
     * @date: 2016.01.07.
     */
    var HeroItemVM = (function (_super) {
        __extends(HeroItemVM, _super);
        /**
         * @英雄攻击、待机动画播放.
         * @param: _uiGroup父节点.
         * @param: _name测试角色名,仅供测试时使用.
         */
        function HeroItemVM(_uiGroup) {
            var _this = _super.call(this) || this;
            /**
             * @回调方法.
             */
            _this.onCallBack = null;
            /**
             * @序列帧对象.
             */
            _this.movieClip = null;
            _this.uiGroup = _uiGroup;
            return _this;
        }
        /**
         * @初始化并播放特效.
         */
        HeroItemVM.prototype.initMovieClip = function (_json, _png, _mcName, _playTimes, _onCallBack, _switch) {
            if (_playTimes === void 0) { _playTimes = -1; }
            if (_switch === void 0) { _switch = true; }
            this.onCallBack = _onCallBack;
            var mcData = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
            this.movieClip = new egret.MovieClip(mcData.generateMovieClipData(_mcName));
            if (_switch) {
                this.movieClip.addEventListener(egret.Event.COMPLETE, this.onEvent, this);
            }
            else {
                this.movieClip.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onEvent, this);
            }
            this.uiGroup.addChild(this.movieClip);
            this.movieClip.play(_playTimes);
            return this.movieClip;
        };
        HeroItemVM.prototype.onEvent = function (evt) {
            if (this.onCallBack)
                this.onCallBack(); //循环动画没传方法,所以不会进这里.
            //            Model.console.log("zhujun: 循环动画没传方法,所以不会进这里. movie clip is " + this.movieClip);
            //            if(this.movieClip) this.uiGroup.removeChild(this.movieClip);//因为有可能在连续点击时候已经被强制销毁,所以要做容错.
            //            console.log("zhujun : mc play finish ! " + _mcName);
        };
        /**
         * @切换正在播放的MovieClip.
         * @1.不重复添加点击方法.
         * @2.不重复往场景上添加.
         * @敌人切换时使用.
         */
        HeroItemVM.prototype.changeMovieClip = function (_json, _png, _mcName, _playTimes, _onCallBack) {
            if (_playTimes === void 0) { _playTimes = -1; }
            this.onCallBack = _onCallBack;
            if (this.movieClip) {
                //            console.log("zhujun: 切换正在播放的动画 !  ");
                this.movieClip.stop();
                var mcData = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
                this.movieClip.movieClipData = mcData.generateMovieClipData(_mcName);
                this.movieClip.play(_playTimes);
                return this.movieClip;
            }
            else {
                return this.movieClip;
            }
        };
        return HeroItemVM;
    }(eui.Component));
    ViewModel.HeroItemVM = HeroItemVM;
    __reflect(HeroItemVM.prototype, "ViewModel.HeroItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=HeroItemVM.js.map