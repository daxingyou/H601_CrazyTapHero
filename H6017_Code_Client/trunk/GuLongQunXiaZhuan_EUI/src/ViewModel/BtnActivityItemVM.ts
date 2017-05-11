module ViewModel{
    /**
     *
     * @author cai_haotian 2016.3.21
     *
     */
    export class BtnActivityItemVM extends eui.Button{
         /**
         * @按钮Icon图片.
         */
        public btnIcon: eui.Image;
            
        /**
         * @给btnIcon字段赋值.
         */ 
        public btnIconSource: string = "";
        
         /**
         * @按钮回调方法.
        */            
        public onCallBack: Function;
        
    	public constructor(_onCallBack?:Function) {
        	super();
            this.skinName = "View.BtnActivityItem";
            this.onCallBack = _onCallBack;
    	}
    	
    	protected createChildren(){
    	  super.createChildren();
          this.btnIcon.source = this.btnIconSource;
    	}
    }
}