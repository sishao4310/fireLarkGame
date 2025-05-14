import { find } from 'cc';
import { NodeEventType } from 'cc';
import { UITransform } from 'cc';
import { misc } from 'cc';
import { v2 } from 'cc';
import { EventTouch } from 'cc';
import { Vec2 } from 'cc';
import { Vec3 } from 'cc';
import { Canvas } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Event } from 'cc';
import { BulletMgr } from './BulletMgr';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {

    @property(Node)
    weapon: Node = null;

    @property(Sprite)
    dizuo: Sprite = null;
    @property(Sprite)
    paotai: Sprite = null;
    @property(Sprite)
    danjia: Sprite = null;


    @property([SpriteFrame])
    dizuo_style: SpriteFrame[] = [];
    @property([SpriteFrame])
    paotai_style: SpriteFrame[] = []

    weaponId

    start() {

    }
    onLoad() {
        let canvas = this.node.parent
        canvas.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        canvas.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        canvas.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        canvas.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
    public initData(weaponId: number) {

        this.weaponId = weaponId;

        this.dizuo.spriteFrame = this.dizuo_style[weaponId];
        this.paotai.spriteFrame = this.paotai_style[weaponId];
        BulletMgr.getInstance().updateBullet(weaponId);

        this.dizuo.node.getComponent(Animation).play('dizuo0' + weaponId);
        this.paotai.node.getComponent(Animation).play('paotai0' + weaponId);


    }
    onMouseLeave(event: EventTouch) {

    }
    onMouseEnter(event: EventTouch) {

    }
    onTouchCancel(event: EventTouch) {

    }
    onTouchEnd(event: EventTouch) {
        if (event.eventPhase == Event.AT_TARGET) {
            this.rotationTurret(event.getLocation());
        }
    }
    onTouchMove(event: EventTouch) {
        if (event.eventPhase == Event.AT_TARGET) {
            this.rotationTurret(event.getLocation());
        }
    }
    onTouchStart(event: EventTouch) {
        if (event.eventPhase == Event.AT_TARGET) {
            this.rotationTurret(event.getLocation());
        }
        let fireAngle = this.weapon.angle;
        let firePos = this.getFirePos(fireAngle);
        BulletMgr.getInstance().createBullet(1, 1, 1, firePos, fireAngle, 1, 0)
        this.paotai.node.getComponent(Animation).play("gongji0" + this.weaponId);
        this.paotai.node.getComponent(Animation).on(Animation.EventType.FINISHED, () => {
            this.paotai.node.getComponent(Animation).play('paotai0' + this.weaponId);
        }, this);

    }

    public rotationTurret(pos: Vec2) {
        let fireAngle = this.getFireAngle(pos);
        if (fireAngle > 80) {
            fireAngle = 80
        } else if (fireAngle < -80) {
            fireAngle = -80;
        }
        // if (this.drillBullet) {
        // yy.log.debug("drillbullet angle:" + fireAngle);
        // if (fireAngle > 60) {
        // fireAngle = 60;
        // } else if (fireAngle < -60) {
        // fireAngle = -60;
        // }
        // this.drillBullet.rotate(fireAngle);
        // }
        this.weapon.angle = fireAngle;
    }
    public getFireAngle(pos: Vec2 = null) {
        if (pos != null) {
            let weaponPos = this.weapon.parent.getComponent(UITransform).convertToWorldSpaceAR(this.weapon.getPosition());
            let normalizeVec = pos.subtract(v2(weaponPos.x, weaponPos.y)).normalize();
            let rad = v2(0, 1).signAngle(normalizeVec)
            let angle = Math.floor(misc.radiansToDegrees(rad));
            return angle;
        } else {
            return this.weapon.angle;
        }
    }
    public getFirePos(angle?: number) {
        let rad = -1 * misc.degreesToRadians(angle ? angle : this.weapon.angle);
        let weaponPos = this.weapon.parent.getComponent(UITransform).convertToWorldSpaceAR(this.weapon.getPosition());
        return v2(weaponPos.x + 40 * Math.sin(rad), weaponPos.y + 10 * Math.cos(rad));
    }

    onDisable(): void {

    }

    update(deltaTime: number) {

    }
}


