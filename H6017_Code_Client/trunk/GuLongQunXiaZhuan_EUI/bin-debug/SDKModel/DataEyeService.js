var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var DataEyeService = (function () {
        function DataEyeService() {
        }
        DataEyeService.initDataEye = function (_accountId, _channel) {
            var agentConfig = {
                appName: Model.WebValue.appName,
                appId: "C3E865A80134D043909967C36AA710D72",
                appVersion: Model.WebValue.appVer,
                channel: _channel,
                uid: _accountId,
                errorReport: true
            };
            DCAgent.init(agentConfig);
        };
        return DataEyeService;
    }());
    Model.DataEyeService = DataEyeService;
    __reflect(DataEyeService.prototype, "Model.DataEyeService");
})(Model || (Model = {}));
//# sourceMappingURL=DataEyeService.js.map