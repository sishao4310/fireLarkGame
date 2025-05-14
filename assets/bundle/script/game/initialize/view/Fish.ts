import { tween } from 'cc';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { Vec2 } from 'cc';
import { Tween } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Utils } from '../utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends Component {

    @property(Node)
    sp_fish: Node = null;

    lastPos: Vec2 = Vec2.ZERO; // 上一次的位置，用于更新角度

    onLoad() {

    }
    initFish(fishId: number, fishCfg: any) {

        tween(this.node).to(15, { position: new Vec3(Math.random()*500+500, Math.random()*500+500,0) }).start();

        this.lastPos = this.node.position.toVec2();

        let angle = -45
        angle = Utils.convectToMirrorAngle(angle);
        this.sp_fish.angle = angle

    }
    // 更新鱼的角度
    updateDegree() {
        let curPos = this.node.getPosition();
        // 如果位移不超过1，不改变角度
        if (this.lastPos.subtract(curPos.toVec2()).length() < 1) {
            return;
        }

        let dir = curPos.subtract(this.lastPos.toVec3());
        let angle = Utils.getRotateAngle(dir.toVec2());
        this.sp_fish.angle = angle;

        this.lastPos = curPos.toVec2();
    }

    update(dt: number) {
        this.updateDegree();
    }
}


