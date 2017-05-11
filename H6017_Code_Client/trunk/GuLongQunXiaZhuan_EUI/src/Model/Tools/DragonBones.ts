/**
 *
 * @author T.J
 *
 */
module Model {
    export class DragonBones {

        private factory: dragonBones.EgretFactory;

        public constructor() {

        }

        /*
         * 创建工厂， 加载资源， 添加事例， 添加纹理
         * by cai_haotian 2016.2.15.
         */ 
        public static addArmatureToFactory(dData: string,tData: string,pic:string): dragonBones.EgretFactory {
            var factory: dragonBones.EgretFactory;
            try {
                factory = new dragonBones.EgretFactory();
                var dragonbonesData = RES.getRes(dData);
                var textureData = RES.getRes(tData);
                var texture = RES.getRes(pic);
                factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
                factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
            } catch(e) {
                console.error("DragonBones Factory Get Resource or Parse Data Error.");
            }
            return factory;
        }
        /*
         * 构建骨架
         */ 
        public static buildArmature(factory: dragonBones.EgretFactory,name: string): dragonBones.Armature {
            var armature: dragonBones.Armature;
            try {
                armature = factory.buildArmature(name);
            } catch(e) {
                console.error("DragonBones Factory Build Armature Error.");
            }
            return armature;
        }
        /*
         * 播放动画.
         */ 
        public static play(parent: egret.DisplayObjectContainer,armature: dragonBones.Armature,action: string,x: number,y: number,playTimes:number=0): void {
            try {
                armature.display.x = x;
                armature.display.y = y;
                parent.addChild(armature.display);
                dragonBones.WorldClock.clock.add(armature);
                armature.animation.gotoAndPlay(action,-1,-1,playTimes);
//                egret.Ticker.getInstance().register(function(frameTime: number) {
//                    dragonBones.WorldClock.clock.advanceTime(0.05)
//                },this);
            } catch(e) {
                console.error("DragonBones Factory Play Error.");
            }
        }
    }
}