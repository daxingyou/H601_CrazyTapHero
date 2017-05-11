module ViewModel {
	/**
	 *
	 * @author fangchao 
	 *
	 */
	export class EffectParticleVM extends eui.Component{
		/**
    	 * @父元素
    	 */
        private uiGroup: eui.Group;
        /**
         * @粒子系统对象
         */ 
        public system: particle.GravityParticleSystem;
        /**
         * @回调函数
         */
        private onCallBack: Function;
        public constructor(_uiGroup: eui.Group,_onCallBack?: Function) {
            super();
            this.uiGroup = _uiGroup;
            this.onCallBack = _onCallBack;
        }
        public initParticle(_json: string,_png:string) {
            //获取纹理
            var texture = RES.getRes(_png);
            //获取配置
            var config = RES.getRes(_json);
            //创建 GravityParticleSystem
            this.system = new particle.GravityParticleSystem(texture,config);
            //启动粒子库
            this.system.start();
            this.system.addEventListener(egret.Event.LOOP_COMPLETE,() => {
                this.uiGroup.removeChild(this.system);
                },this);
            //将例子系统添加到舞台
            this.uiGroup.addChild(this.system);
        }
	}
}
