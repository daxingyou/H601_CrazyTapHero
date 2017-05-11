module ViewModel{
    /**
     *
     * @author cai_haotian
     * @date 2016.3.22.
     *
     */
   export class BtnActivityVM extends eui.Component{
       /**
        * @按钮组
        */ 
       public activityGroup:eui.Group;
       
       /**
        * @累计充值
        */ 
       public accumulateRecharge:ViewModel.BtnActivityItemVM;
       
       /**
        * @领取奖励
        */ 
       public getRewards:ViewModel.BtnActivityItemVM;
       
       /**
        * @每日充值
        */ 
       public dailyRecharge:ViewModel.BtnActivityItemVM;
       
       /**
        * @每日挑战
        */ 
       public dailyChallenge:ViewModel.BtnActivityItemVM;
       
       /**
        * @父节点
        */ 
       public uiLayer:eui.UILayer;
       
       /**
        * @回调函数
        */ 
       public onCallBack:Function;
       
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
            this.skinName = View.BtnActivityView_tw;
        	
        	this.uiLayer=_uiLayer;
        	this.onCallBack=_onCallBack;
    	}
    	
    	protected createChildren(){
    	  super.createChildren();
    	}
    	
    }
}