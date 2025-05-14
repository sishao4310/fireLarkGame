import { misc } from 'cc';
import { Vec2 } from 'cc';
import { _decorator, Component, Node, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Utils')
export class Utils {
        private static enableMirror = false;

    public static forAngle(radians: number) {
        return new Vec2(Math.cos(radians), Math.sin(radians));
    }

    public static getAngle(dir: Vec2) {
        return Math.atan2(dir.y, dir.x);
    }

    public static getRotateAngle(dir: Vec2): number {
        // return -1 * cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x)) + 90;
        return misc.radiansToDegrees(Math.atan2(dir.y, dir.x)) - 90;
    }

    public static getRotateDirection(angle: number): Vec2 {
        let rad = misc.degreesToRadians(90 - angle);
        return this.forAngle(rad);
    }
    public static convectToMirrorAngle(angle: number) {
        if (this.enableMirror) {
            if (angle > 0) {
                return angle - 180;
            } else {
                return angle + 180;
            }
        }

        return angle;
    }
    // 角度跟随:
    // var dx = this.target.x - this.node.x;
    // var dy = this.target.y - this.node.y;
    // var dir = cc.v2(dx,dy);
    // //求弧度
    // var angle = dir.signAngle(cc.v2(1,0));
    // //根据弧度算出角度
    // var degree = angle / Math.PI * 180;
    // this.node.rotation = degree;

    // 移动带角度跟随
    // //计算出当前位置相对于X的偏移
    // var dx = this.node.x - this.target.x;
    // var dy = this.node.y - this.target.y;
    // var dir = cc.v2(dx,dy);
    // dir = dir.rotate(dt * 0.5);
    // this.node.x = dir.x;
    // this.node.y = dir.y;
    // var angle = dir.signAngle(cc.v2(1,0));
    // var degree = angle / Math.PI * 180;
    // this.node.rotation = degree - 90;

    public static convetTicket(ticket: number): string {
        return  (ticket >= 10000 ? Math.floor(ticket / 100) : ticket / 100)+"元"
    }

    public static convetGold(gold: number, pos: number = 2) {
        if (gold >= 100000000) {
            return this.fomatFloat(gold / 100000000, pos)+"亿";
        } else if (gold >= 10000) {
            return this.fomatFloat(gold / 10000, pos)+"万"
        } else {
            return gold;
        }
    }

    public static convetGold2(gold: number, pos: number = 2) {
        if (gold >= 100000000) {
            return { value: this.fomatFloat(gold / 100000000, pos), unit: "亿" };
        } else if (gold >= 10000) {
            return { value: this.fomatFloat(gold / 10000, pos), unit: "万" };
        } else {
            return { value: gold, unit: "" };
        }
    }
        public static fomatFloat(src:number,pos:number):number{
        return Math.floor(src*Math.pow(10, pos))/Math.pow(10, pos);
    }
}




   
