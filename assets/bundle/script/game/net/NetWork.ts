
/*
 * @Author: dgflash
 * @Date: 2021-11-11 17:45:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-03 10:07:14
 */
import { WebSock } from "db://oops-framework/libs/network/WebSock";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { NetData } from "db://oops-framework/libs/network/NetInterface";
import Global from "../config/Golbal";


/**
 * 游戏进入初始化模块
 * 1、热更新
 * 2、加载默认资源
 */
@ecs.register('NetWork')
export class NetWork extends ecs.Entity {

    private websocket:WebSock = null; 

    protected init() {
    
        this.websocket = new WebSock();
        this.websocket.connect(Global.WS_URL);
        this.websocket.onConnected = this.onConnected;
        this.websocket.onError = this.onError;
        this.websocket.onMessage = this.onMessage;
        this.websocket.onClosed = this.onClosed;
    }
    public send(any){
        this.websocket.send(any);
    }
    onMessage(msg: NetData){
        
    }
    onConnected=(evt:Event)=>{
        console.log("链接成功")
    }
    onError(error:Event){
        console.log("网络错误",error)
    }
    onClosed(evt:CloseEvent){
        console.log("网络断开",evt);
    }
    
}
