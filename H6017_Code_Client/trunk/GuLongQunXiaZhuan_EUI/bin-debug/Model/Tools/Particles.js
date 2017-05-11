var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian 2016.3.17
     * @description particle  effect
     *
     */
    var Particles = (function () {
        /**
         * @_texture:粒子图片数据
         * @_config:粒子特效JSON文件
         * @_uiGroup:播放父节点
         * @_x:设置播放所在x坐标
         * @_y:设置播放所在y坐标
         */
        function Particles(_uiGroup, _texture, _config, _onCallBack) {
            this.uiGroup = _uiGroup;
            this.texture = _texture;
            this.config = _config;
            this.onCallBack = _onCallBack;
        }
        Particles.prototype.setParticlesPos = function (_x, _y) {
            var texture = RES.getRes(this.texture);
            var config = RES.getRes(this.config);
            this.system = new particle.GravityParticleSystem(texture, config);
            this.uiGroup.addChild(this.system);
            this.system.x = _x;
            this.system.y = _y;
            this.system.start();
            return this.system;
        };
        return Particles;
    }());
    Model.Particles = Particles;
    __reflect(Particles.prototype, "Model.Particles");
})(Model || (Model = {}));
//# sourceMappingURL=Particles.js.map