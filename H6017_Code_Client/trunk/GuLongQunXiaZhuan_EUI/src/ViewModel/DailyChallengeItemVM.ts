module ViewModel{
    /**
     *
     * @author cai_haotian
     * @date 2016.1.18.
     *
     */
    export class DailyChallengeItemVM extends eui.Button{
        /**
         * @日期
         */ 
        public date:eui.Label;
        
        /**
         * @描述图片
         */ 
        public texticon:eui.Image;
        
        /**
         * @描述
         */ 
        public description:eui.Label;
        
        /**
         * @单条数据
         */ 
        public info:Model.ChallengeData;
        
    	public constructor() {
        	super();
            this.skinName =View.DailyChallengeItem;
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	}
    	
    	public setItemInfo(_data:Model.ChallengeData){
        	this.info=_data;
            var arr = ["","一","二","三","四","五"];
        	if(Model.WebValue.isTraditional){
                this.date.text = "難度" + arr[_data.st.id];
        	}else{
                this.date.text = "难度" + arr[_data.st.id];
        	}
        	
    	      
            this.texticon.source=_data.st.icon;
    	      this.description.text=_data.st.description.replace("{}",_data.st.rewardCount+"");
    	}
    }
}