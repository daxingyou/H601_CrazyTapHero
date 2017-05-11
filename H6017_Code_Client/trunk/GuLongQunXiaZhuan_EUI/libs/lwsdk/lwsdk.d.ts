declare class lwsdk {

    static init(config?: Config): void;

    static login(callback: Function): string;

    static pay(item: Item,callback: Function): string;

    static token: string;
    
    // 加载成功后告知unity
    static finishLoading(): void;
    
    // 提交排行榜字段，让unity发送给game center
    static leaderBoard(key,value): void;
}

declare class Config {
    static game: number;
    static channel: number;
}

declare class Item {
    static id: String;
    static name: String;
    static price: number;
    static count: number;
    static currency: String;
}