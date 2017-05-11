module ViewModel {
	/**
	 *
	 * @author fangchao
	 *
	 */
    export class EffectSkillVM extends eui.Component {
    	/**
    	 * @父元素
    	 */
        private uiGroup: eui.Group;
        public armatureName: string;
        /**
         * @龙骨对象
         */
        public armature: dragonBones.Armature;
        /**
         * @龙骨第一帧
         */
        public curAnimationName: string;
        /**
         * @龙骨动画
         */
        public animation: dragonBones.Animation;
        /**
         * @回调函数
         */
        private onCallBack: Function = null;

        public constructor(_uiGroup: eui.Group, _onCallBack?: Function) {
            super();
            this.uiGroup = _uiGroup;
            this.onCallBack = _onCallBack;
        }

		/**
		 * @初始化骨骼动画.
		 * @
		 */
        public initDragonBone(_json: string, _png: string, _skeleton: string, _playTimes: number = 1): dragonBones.Armature {
            //   var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory(); 
            var factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();//创建一个工厂,用来创建Armature.
            var skeletonData = RES.getRes(_skeleton);//获取动画数据.
            var textureData = RES.getRes(_json);//获取纹理集数据.
            var texture = RES.getRes(_png);//获取纹理集图片.
            // factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            // factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData))
            factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));//创建一个工厂,用来创建Armature.
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));//把纹理集数据和图片添加到工厂里.
            this.armatureName = skeletonData.armature[0].name;//获取Armature的名字,dragonBones4.0的数据可以包含多个骨架,这里取第一个Armature.
            this.armature = factory.buildArmature(this.armatureName);//从工厂里创建出Armature.
            var armatureDisplay = this.armature.display;//获取装载Armature的容器.
            // var armatureDisplay: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Dragon");
            armatureDisplay.x = 300;//位置居中.
            armatureDisplay.y = 450;
            this.uiGroup.addChild(armatureDisplay); //把它添加到舞台上.
            armatureDisplay.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onAnimationEvent, this);
            armatureDisplay.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimationEvent, this);//this传谁，监听方法就监听谁.
            armatureDisplay.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
            this.curAnimationName = this.armature.animation.animationList[0];  //取得这个Armature动画列表中的第一个动画的名字
            this.animation = this.armature.animation;
            dragonBones.WorldClock.clock.add(this.armature);//把Armature添加到心跳时钟里
            this.animation.gotoAndPlay(this.curAnimationName, 0, -1, _playTimes); //gotoAndPlay的用法：动画播放，播放一遍
            return this.armature;
        }

        //        /**
        //         * @如果点击了就重置播放.
        //         */ 
        //        public resetPlay(){
        //            this.animation.gotoAndPlay(this.curAnimationName,0,-1,1); //gotoAndPlay的用法：动画播放，播放一遍
        //        }

        /**
         * @动画监听事件.
         */
        private onAnimationEvent(evt: dragonBones.AnimationEvent): void {
            if (this.onCallBack) this.onCallBack();
            switch (evt.type) {
                case dragonBones.AnimationEvent.START:
                    break;
                case dragonBones.AnimationEvent.LOOP_COMPLETE:
                    break;
                case dragonBones.AnimationEvent.COMPLETE:
                    this.uiGroup.removeChild(evt.armature.display);//动画完成后销毁这个armature,因为有可能在连续点击时候已经被强制销毁,所以要做容错.
                    dragonBones.WorldClock.clock.remove(evt.armature);
                    evt.armature.dispose();
                    break;
                case dragonBones.FrameEvent.ANIMATION_FRAME_EVENT:
                    Main.singleton.mainGameVM.enemyHit();
                    break;

            }
        }
    }
}
