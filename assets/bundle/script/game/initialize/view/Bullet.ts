import { Vec2 } from 'cc';
import { Vec3 } from 'cc';
import { v2 } from 'cc';
import { BoxCollider2D } from 'cc';
import { Contact2DType } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { misc } from 'cc';
import { RigidBody2D } from 'cc';
import { UITransform } from 'cc';
import { sp } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Utils } from '../utils/Utils';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { AnimationClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property(Sprite)
    bullet_sp:Sprite = null;
    /**子弹样式*/
    @property([SpriteFrame])
    spframes: SpriteFrame[] = [];

    bulletId: number = -1;
    playerId: number = 0;
    lockFishId: number = -1;
    bulletCfg: any = null;

    lastPos: Vec2 = Vec2.ZERO;
    turretRate: number = 0;

    weaponId:number

    public init(bulletId: number, playerId: number, bulletCfgId: number, pos: Vec2, angle: number, lockFishId: number, turretRate: number) {

        this.node.position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos.toVec3());
        this.node.angle = angle;
        this.lastPos = this.node.position.toVec2();

        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        // this.bullet_sp
        this.bullet_sp.spriteFrame = this.spframes[this.weaponId];

        this.updateLinearVelocity();


    }
    public updateStyle(weaponId){
       this.weaponId = weaponId;

    }
    public lock() {
        // if (this.node.group != "lock_bullet") {
        //     this.node.group = "lock_bullet";
        //     this.getComponent(cc.PhysicsBoxCollider).apply();
        // }
    }

    public unLock() {
        this.lockFishId = -1;
        // if (this.node.group != "bullet") {
        //     this.node.group = "bullet";
        //     this.getComponent(cc.PhysicsBoxCollider).apply();
        // }
    }

    public updateLinearVelocity() {
        // if (this.bulletCfg) {
        // console.log("子弹角度:" + this.node.angle);
        let rad = misc.degreesToRadians(-1 * this.node.angle);
        let speed = 10//this.bulletCfg.Speed;
        let linearVelocity = v2(speed * Math.sin(rad), speed * Math.cos(rad));//初始化速度
        this.getComponent(RigidBody2D).linearVelocity = linearVelocity;
        // }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact): void {

    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact): void {

        if (otherCollider.node.name.indexOf('border') > -1) {
            if (otherCollider.tag >= 1 && otherCollider.tag <= 4) { // 碰到四周边界
                this.scheduleOnce(() => {
                    let dir = this.getComponent(RigidBody2D).linearVelocity;
                    let degree = Utils.getRotateAngle(dir);
                    this.node.angle = degree;
                });
            }
        }
    }
    update(dt: number): void {
        let curPos = this.node.getPosition();
        if (this.lastPos.subtract(curPos.toVec2()).length() < 5) {
            return;
        }

        // this.updateLinearVelocity();
    }
}


