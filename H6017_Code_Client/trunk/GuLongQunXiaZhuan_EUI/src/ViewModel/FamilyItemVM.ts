module ViewModel {
	/**
	 *
	 * @author 
	 *
	 */
    export class FamilyItemVM extends eui.Component {
        /**
         * @家族技能
         */ 
        private familyAttr:eui.Label
        /**
         * @家族技能介绍
         */ 
        private familyAttrDetail: eui.Label;
        /**
         * @家族头像
         */ 
        private familyIcon:eui.Image;
        /**
         * @所需元宝数量
         */ 
        private costGold: eui.Label;
         /**
         * @激活按钮
         */
        private activateBtn: ViewModel.BtnShareVM;
        /**
         * @已激活图片
         */ 
        private finished:eui.Image;
        
        /**
         * @父节点
         */ 
        private uiLayer:eui.Group;
        
        /**
         * @数据
         */ 
        private clanData:Model.ClanData;
        
        /**
         * @回调函数
         */ 
        private onCallBack:Function;
        
		public constructor(_uiLayer:eui.Group,_onCallBack:Function) {
            super();
            this.skinName = View.FamilyItem;
            this.uiLayer=_uiLayer;
            this.onCallBack=_onCallBack;
            this.uiLayer.addChild(this);
		}
        protected createChildren() {
            super.createChildren();
        }
        
        public setItemInfo(_data:Model.ClanData){
            
            this.clanData=_data;
            this.familyIcon.source=_data.st.pic;
            this.familyAttr.text=_data.st.name;
            this.familyAttrDetail.text=_data.st.described;
            
            this.activateBtn.visible = true;
            this.finished.visible=false;
            this.activateBtn.setClanBtn(_data.st.activationCost);
            if(_data.dy!=null){
                this.finished.visible=true;
                this.activateBtn.visible=false;
            }
            
            this.activateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnEvent,this);
        }
        
        private btnEvent(){
            if(this.onCallBack){
                this.onCallBack(this.clanData);
            }
        }
        
	}
}
