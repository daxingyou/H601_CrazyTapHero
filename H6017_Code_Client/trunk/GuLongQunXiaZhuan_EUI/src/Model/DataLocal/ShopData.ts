module Model{
    /**
     *
     * @author cai_haotian 
     * @Date 2016.2.26
     *
     */
    export class ShopData {
    	public constructor(_dy:Model.ShopDyModel,_st:Model.ShopStModel) {
        	this.dy = _dy;
            this.st = _st;
    	}
    	
    	/**
    	 * @商城动态数据
    	 */ 
    	public dy:Model.ShopDyModel;
    	
    	/**
    	 * @商城静态数据
    	 */
      public st: Model.ShopStModel;
      
      /**
       * @获得铜币数量(不带单位)
       */ 
      public gold:number;
      
      /**
       * @获得铜币显示数量
       */ 
      public get goldAndUnit(){
        return MainLocalService.toUnitConversion(this.gold);
      }
      
      /**
    	 * @获得商品类型
    	 */
      public get Type() {
          return <ShopType>ShopType[this.st.type];
      }
    }
}