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
     * @author cai_haotian
     * @date 2016.1.4.
     *
     */
    var RankListVM = (function (_super) {
        __extends(RankListVM, _super);
        function RankListVM(_uilayer, _onCallBack) {
            var _this = _super.call(this) || this;
            if (Model.WebValue.isTraditional) {
                _this.skinName = View.RankListView_tw;
            }
            else {
                _this.skinName = View.RankListView;
            }
            _this.uiLayer = _uilayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        RankListVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
        };
        /**
         * @初始化
         */
        RankListVM.prototype.initWindow = function () {
            var _this = this;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
            if (Model.WebValue.isTraditional) {
                this.rankSceneBtn.detailText.text = "闖關";
                this.dpsBtn.detailText.text = "秒傷";
                this.accumulateBtn.detailText.text = "累積儲值";
            }
            else {
                this.rankSceneBtn.detailText.text = "闯关";
                this.dpsBtn.detailText.text = "秒伤";
                this.accumulateBtn.detailText.text = "累积充值";
            }
            this.rankSceneBtn.currentState = "up";
            this.dpsBtn.currentState = "down";
            this.accumulateBtn.currentState = "down";
            this.rankScene.visible = true;
            this.btnGroup = [this.rankSceneBtn, this.accumulateBtn, this.dpsBtn];
            this.tabGroup = [this.rankScene, this.accumulate, this.dps];
            this.rankSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
            this.dpsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
            this.accumulateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChange, this);
        };
        RankListVM.prototype.btnChange = function (evt) {
            for (var i = 0; i < this.btnGroup.length; i++) {
                if (evt.target == this.btnGroup[i]) {
                    this.btnGroup[i].currentState = "up";
                    this.tabGroup[i].visible = true;
                }
                else {
                    this.btnGroup[i].currentState = "down";
                    this.tabGroup[i].visible = false;
                }
            }
        };
        /**
         * @设置闯关排名
         */
        RankListVM.prototype.setRankScene = function (_listData, _playerData, _change) {
            this.userName0.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            if (_change >= 0) {
                this.up0.visible = true;
                this.updateRankList0.text = _change + "";
                this.updateRankList0.textColor = 0x00F829;
            }
            else {
                this.down0.visible = true;
                this.updateRankList0.text = _change * -1 + "";
                this.updateRankList0.textColor = 0xF50601;
            }
            if (_playerData.scene) {
                if (Model.WebValue.isTraditional) {
                    this.detail0.text = "完成關卡：" + _playerData.scene;
                }
                else {
                    this.detail0.text = "完成关卡：" + _playerData.scene;
                }
            }
            if (_playerData.rank) {
                this.currentRanking0.text = "" + _playerData.rank;
            }
            else {
                if (Model.WebValue.isTraditional) {
                    this.currentRanking0.text = "暫未上榜";
                }
                else {
                    this.currentRanking0.text = "暂未上榜";
                }
                this.currentRanking0.textColor = 0xF8D112;
                this.up0.visible = false;
                this.updateRankList0.visible = false;
            }
            for (var i = 0; i < _listData.length; i++) {
                var item = new ViewModel.RankListItemVM(this.rankSceneList, function () {
                });
                item.setSceneItem(_listData[i]);
            }
        };
        /**
         * @设置伤害排名
         */
        RankListVM.prototype.setRankDps = function (_listData, _playerData, _change) {
            this.userName1.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            if (_change >= 0) {
                this.up1.visible = true;
                this.updateRankList1.text = _change + "";
                this.updateRankList1.textColor = 0x00F829;
            }
            else {
                this.down1.visible = true;
                this.updateRankList1.text = _change * -1 + "";
                this.updateRankList1.textColor = 0xF50601;
            }
            if (_playerData.dps) {
                if (Model.WebValue.isTraditional) {
                    this.detail1.text = "隊友秒傷：" + Model.MainLocalService.toUnitConversion(Number(_playerData.dps));
                }
                else {
                    this.detail1.text = "队友秒伤：" + Model.MainLocalService.toUnitConversion(Number(_playerData.dps));
                }
            }
            if (_playerData.rank) {
                this.currentRanking1.text = "" + _playerData.rank;
            }
            else {
                if (Model.WebValue.isTraditional) {
                    this.currentRanking1.text = "暫未上榜";
                }
                else {
                    this.currentRanking1.text = "暂未上榜";
                }
                this.currentRanking1.textColor = 0xF8D112;
                this.up1.visible = false;
                this.updateRankList1.visible = false;
            }
            for (var i = 0; i < _listData.length; i++) {
                var item = new ViewModel.RankListItemVM(this.dpsList, function () {
                });
                item.setDpsItem(_listData[i]);
            }
        };
        /**
         * @设置充值排名
         */
        RankListVM.prototype.setRechargeDps = function (_listData, _playerData, _change) {
            this.userName2.text = _playerData.nickName ? _playerData.nickName : Model.PlayerLocalService.PlayerData.dy.nickName;
            if (_change >= 0) {
                this.up2.visible = true;
                this.updateRankList2.text = _change + "";
                this.updateRankList2.textColor = 0x00F829;
            }
            else {
                this.down2.visible = true;
                this.updateRankList2.text = _change * -1 + "";
                this.updateRankList2.textColor = 0xF50601;
            }
            if (_playerData.recharge) {
                if (Model.WebValue.isTraditional) {
                    this.detail2.text = "累計儲值：" + _playerData.recharge;
                }
                else {
                    this.detail2.text = "累计充值：" + _playerData.recharge;
                }
            }
            if (_playerData.rank) {
                this.currentRanking2.text = "" + _playerData.rank;
            }
            else {
                this.currentRanking2.text = Model.WebValue.isTraditional ? "暫未上榜" : "暂未上榜";
                this.currentRanking2.textColor = 0xF8D112;
                this.up2.visible = false;
                this.updateRankList2.visible = false;
            }
            for (var i = 0; i < _listData.length; i++) {
                var item = new ViewModel.RankListItemVM(this.accumulateList, function () {
                });
                item.setRechargeItem(_listData[i]);
            }
        };
        return RankListVM;
    }(eui.Component));
    ViewModel.RankListVM = RankListVM;
    __reflect(RankListVM.prototype, "ViewModel.RankListVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=RankListVM.js.map