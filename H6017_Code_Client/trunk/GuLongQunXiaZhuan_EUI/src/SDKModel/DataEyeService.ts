module Model {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
	export class DataEyeService {
		public constructor() {
		}

        public static initDataEye(_accountId:string,_channel:string): void {
            var agentConfig: DCAgentConfig = {
                appName: WebValue.appName,
                appId: "C3E865A80134D043909967C36AA710D72",        
                appVersion: WebValue.appVer,
                channel: _channel,
                uid: _accountId,
                errorReport:true
            };
            DCAgent.init(agentConfig);
        }
	}
}
