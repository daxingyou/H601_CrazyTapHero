module ViewModel{
    /**
     *
     * @author cai_haotian
     * @date 2016.1.4.
     *
     */
    export class RankListItemVM extends eui.Component{
        /**
         * @头像图标
         */ 
        public icon:eui.Image;
        
        /**
         * @人物名称
         */ 
        public userName:eui.Label;
        
        /**
         * @描述详情
         */ 
        public detail:eui.Label;
        /**
         * @排名组
         */ 
        public rankingGroup:eui.Group;
        
        /**
         * @当前排名
         */ 
        public currentRanking:eui.Label;
        
        /**
         * @排名更新 
         */ 
        public updateRankList:eui.Label;
        /**
         * @上升
         */ 
        public up:eui.Image;
        /**
         * @下降
         */ 
        public down:eui.Image;
        
        /**
         * @排名背景
         */ 
        public rankingPic:eui.Image;
        
        /**
         * @排名名次
         */ 
        public rankingNum:eui.Label;
        
        /**
         * @第一名
         */ 
        public first:eui.Image;
        
        /**
         * @第二名
         */ 
        public second:eui.Image;
        
        /**
         * @第三名
         */ 
        public third:eui.Image;
        
        /**
         * @父节点
         */ 
        public uiGroup:eui.Group;
        
        /**
         * @回调方法
         */ 
        public onCallBack:Function;
        
    	public constructor(_uiGroup:eui.Group,_onCallBack:Function) {
        	super();
            this.skinName = View.RankListItem;
            this.uiGroup=_uiGroup;
            this.onCallBack = _onCallBack;
            this.uiGroup.addChild(this);
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	}
    	
    	/**
    	 * @设置闯关item
    	 */ 
    	public setSceneItem(_data:Model.RankSceneModel){
        	this.userName.text=_data.nickName;
        	if(Model.WebValue.isTraditional){
                this.detail.text = "完成關卡：" + _data.scene;
        	}else{
                this.detail.text = "完成关卡：" + _data.scene;
        	}
        	
        	this.setRanklevel(_data.rank);
    	}
    	
    	/**
    	 * @设置伤害item
    	 */ 
    	public setDpsItem(_data:Model.RankDPSModel){
    	      this.userName.text=_data.nickName;
    	      if(Model.WebValue.isTraditional){
                  this.detail.text = "隊友秒傷：" + Model.MainLocalService.toUnitConversion(Number(_data.dps));
    	      }else{
                  this.detail.text = "队友秒伤：" + Model.MainLocalService.toUnitConversion(Number(_data.dps));
    	      }
    	      
              
    	      this.setRanklevel(_data.rank)
    	}
    	
    	/**
    	 * @设置充值item
    	 */
        public setRechargeItem(_data: Model.RankRechargeModel) {
            this.userName.text = _data.nickName;
            if(Model.WebValue.isTraditional){
                this.detail.text = "累計儲值：" + _data.recharge;
            }else{
                this.detail.text = "累计充值：" + _data.recharge;
            }
            
            this.setRanklevel(_data.rank);
        }
    	
    	/**
    	 * @设置排名显示
    	 */ 
    	public setRanklevel(_id:string){
            switch(_id) {
                case "1":
                    this.first.visible = true;
                    break;
                case "2":
                    this.second.visible = true;
                    break;
                case "3":
                    this.third.visible = true;
                    break;
                default:
                    this.rankingGroup.visible = true;
                    this.rankingNum.text = _id + "";
            }
    	}
    }
}