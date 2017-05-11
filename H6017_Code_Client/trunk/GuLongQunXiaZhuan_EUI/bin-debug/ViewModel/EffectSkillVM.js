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
    var EffectSkillVM = (function (_super) {
        __extends(EffectSkillVM, _super);
        function EffectSkillVM(_uiGroup, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @回调函数
             */
            _this.onCallBack = null;
            _this.uiGroup = _uiGroup;
            _this.onCallBack = _onCallBack;
            return _this;
        }
        /**
         * @初始化骨骼动画.
         * @
         */
        EffectSkillVM.prototype.initDragonBone = function (_json, _png, _skeleton, _playTimes) {
            if (_playTimes === void 0) { _playTimes = 1; }
            //   var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory(); 
            var factory = new dragonBones.EgretFactory(); //创建一个工厂,用来创建Armature.
            var skeletonData = RES.getRes(_skeleton); //获取动画数据.
            var textureData = RES.getRes(_json); //获取纹理集数据.
            var texture = RES.getRes(_png); //获取纹理集图片.
            // factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            // factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData))
            factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData)); //创建一个工厂,用来创建Armature.
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData)); //把纹理集数据和图片添加到工厂里.
            this.armatureName = skeletonData.armature[0].name; //获取Armature的名字,dragonBones4.0的数据可以包含多个骨架,这里取第一个Armature.
            this.armature = factory.buildArmature(this.armatureName); //从工厂里创建出Armature.
            var armatureDisplay = this.armature.display; //获取装载Armature的容器.
            // var armatureDisplay: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Dragon");
            armatureDisplay.x = 300; //位置居中.
            armatureDisplay.y = 450;
            this.uiGroup.addChild(armatureDisplay); //把它添加到舞台上.
            armatureDisplay.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onAnimationEvent, this);
            armatureDisplay.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimationEvent, this); //this传谁，监听方法就监听谁.
            armatureDisplay.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
            this.curAnimationName = this.armature.animation.animationList[0]; //取得这个Armature动画列表中的第一个动画的名字
            this.animation = this.armature.animation;
            dragonBones.WorldClock.clock.add(this.armature); //把Armature添加到心跳时钟里
            this.animation.gotoAndPlay(this.curAnimationName, 0, -1, _playTimes); //gotoAndPlay的用法：动画播放，播放一遍
            return this.armature;
        };
        //        /**
        //         * @如果点击了就重置播放.
        //         */ 
        //        public resetPlay(){
        //            this.animation.gotoAndPlay(this.curAnimationName,0,-1,1); //gotoAndPlay的用法：动画播放，播放一遍
        //        }
        /**
         * @动画监听事件.
         */
        EffectSkillVM.prototype.onAnimationEvent = function (evt) {
            if (this.onCallBack)
                this.onCallBack();
            switch (evt.type) {
                case dragonBones.AnimationEvent.START:
                    break;
                case dragonBones.AnimationEvent.LOOP_COMPLETE:
                    break;
                case dragonBones.AnimationEvent.COMPLETE:
                    this.uiGroup.removeChild(evt.armature.display); //动画完成后销毁这个armature,因为有可能在连续点击时候已经被强制销毁,所以要做容错.
                    dragonBones.WorldClock.clock.remove(evt.armature);
                    evt.armature.dispose();
                    break;
                case dragonBones.FrameEvent.ANIMATION_FRAME_EVENT:
                    Main.singleton.mainGameVM.enemyHit();
                    break;
            }
        };
        return EffectSkillVM;
    }(eui.Component));
    ViewModel.EffectSkillVM = EffectSkillVM;
    __reflect(EffectSkillVM.prototype, "ViewModel.EffectSkillVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=EffectSkillVM.js.map