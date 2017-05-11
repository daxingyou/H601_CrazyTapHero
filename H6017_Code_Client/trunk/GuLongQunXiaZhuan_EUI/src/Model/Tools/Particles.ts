module Model {
    /**
     *
     * @author cai_haotian 2016.3.17
     * @description particle  effect
     *
     */
    export class Particles {
        /**
         * @粒子系统
         */
        public system: particle.ParticleSystem;
        
        /**
         * @父节点
         */ 
        private uiGroup:egret.DisplayObjectContainer;
        
        /**
         * @纹理集名称
         */ 
        private texture:string;
        
        /**
         * @配置表名称 
         */ 
        private config:string;
        
        /**
         * @回调函数
         */ 
        private onCallBack:Function;

        /**
         * @_texture:粒子图片数据
         * @_config:粒子特效JSON文件
         * @_uiGroup:播放父节点
         * @_x:设置播放所在x坐标
         * @_y:设置播放所在y坐标
         */
        public constructor(_uiGroup?: egret.DisplayObjectContainer,_texture?: string,_config?: string,_onCallBack?:Function) {
            this.uiGroup=_uiGroup;
            this.texture=_texture;
            this.config=_config;
            this.onCallBack=_onCallBack;
        }
    	  
        
        public setParticlesPos(_x?: number,_y?: number):particle.ParticleSystem{
            var texture = RES.getRes(this.texture);
            var config = RES.getRes(this.config);
            this.system = new particle.GravityParticleSystem(texture,config);
            this.uiGroup.addChild(this.system);
            this.system.x = _x;
            this.system.y = _y;
            this.system.start();
            return this.system;
        }


    }
}