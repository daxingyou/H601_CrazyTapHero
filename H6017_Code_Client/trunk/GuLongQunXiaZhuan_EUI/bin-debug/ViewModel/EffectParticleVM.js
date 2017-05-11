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
    var EffectParticleVM = (function (_super) {
        __extends(EffectParticleVM, _super);
        function EffectParticleVM(_uiGroup, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.uiGroup = _uiGroup;
            _this.onCallBack = _onCallBack;
            return _this;
        }
        EffectParticleVM.prototype.initParticle = function (_json, _png) {
            var _this = this;
            //获取纹理
            var texture = RES.getRes(_png);
            //获取配置
            var config = RES.getRes(_json);
            //创建 GravityParticleSystem
            this.system = new particle.GravityParticleSystem(texture, config);
            //启动粒子库
            this.system.start();
            this.system.addEventListener(egret.Event.LOOP_COMPLETE, function () {
                _this.uiGroup.removeChild(_this.system);
            }, this);
            //将例子系统添加到舞台
            this.uiGroup.addChild(this.system);
        };
        return EffectParticleVM;
    }(eui.Component));
    ViewModel.EffectParticleVM = EffectParticleVM;
    __reflect(EffectParticleVM.prototype, "ViewModel.EffectParticleVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=EffectParticleVM.js.map