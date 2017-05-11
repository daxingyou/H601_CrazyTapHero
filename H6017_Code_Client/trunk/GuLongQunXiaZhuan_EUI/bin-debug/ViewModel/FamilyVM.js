var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author
     *
     */
    var FamilyVM = (function (_super) {
        __extends(FamilyVM, _super);
        function FamilyVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @家族item
             */
            _this.itemList = [];
            if (Model.WebValue.isTraditional) {
                _this.skinName = View.FamilyView_tw;
            }
            else {
                _this.skinName = View.FamilyView;
            }
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        FamilyVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
            this.setListInfo();
        };
        FamilyVM.prototype.initWindow = function () {
            var _this = this;
            egret.Tween.get(this.maskBlackFamily).to({ alpha: .7 }, 700, egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            if (Model.WebServiceBase.isDebug) {
                console.log("fangchao: add magic weapon vm to ui layer !　");
            }
            ;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.maskBlackFamily).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -850 }, 700, egret.Ease.backIn);
                setTimeout(function () {
                    _this.uiLayer.removeChild(_this);
                }, 700);
            }, this);
        };
        FamilyVM.prototype.setListInfo = function () {
            var _this = this;
            var Data = Model.ClanLocalService.ClanListData;
            if (this.familyGroup.numChildren == 0) {
                for (var i = 0; i < Data.length; i++) {
                    var item = new ViewModel.FamilyItemVM(this.familyGroup, function (_data) {
                        if (Model.PlayerLocalService.PlayerData.dy.treasure >= _data.st.activationCost) {
                            Model.ClanLocalService.buySuccessCallBack(_data);
                            _this.setListInfo(); //更新ui
                            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                                if (Model.WebServiceBase.isDebug) {
                                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                }
                            }, function () {
                                Main.singleton.mainMenuVM.offLineGroup.visible = true;
                                if (Model.WebValue.isTraditional) {
                                    alert("數據提交失敗請聯繫管理員！！！！");
                                }
                                else {
                                    alert("数据提交失败请联系管理员！！！！");
                                }
                            }); //重新提交数据
                        }
                        else {
                            new ViewModel.LackGoldVM(Main.singleton, function () {
                                egret.Tween.get(_this.maskBlackFamily).to({ alpha: 0 }, 700, egret.Ease.circIn);
                                egret.Tween.get(_this.window).to({ y: -850 }, 700, egret.Ease.backIn);
                                setTimeout(function () {
                                    _this.uiLayer.removeChild(_this);
                                }, 700);
                            });
                        }
                    });
                    item.setItemInfo(Data[i]);
                    this.itemList.push(item);
                }
            }
            else {
                for (var i = 0; i < Data.length; i++) {
                    this.itemList[i].setItemInfo(Data[i]);
                }
            }
        };
        return FamilyVM;
    }(eui.Component));
    ViewModel.FamilyVM = FamilyVM;
    __reflect(FamilyVM.prototype, "ViewModel.FamilyVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=FamilyVM.js.map