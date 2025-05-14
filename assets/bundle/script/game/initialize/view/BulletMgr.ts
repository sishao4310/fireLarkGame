import { NodePool, Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Bullet } from './Bullet';
import { instantiate } from 'cc';
import { Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletMgr')
export class BulletMgr {
    private static inst: BulletMgr = null;
    public static getInstance(): BulletMgr {
        if (this.inst == null) {
            this.inst = new BulletMgr();
        }
        return this.inst;
    }

    bulletNodePool: NodePool = null; // 子弹对象池
    bulletPrefab: Prefab = null; // 子弹预制体

    rootNode: Node[] = []; // 子弹根节点

    weaponID:number = 1;
    // private constructor() {
    //     this.bulletNodePool = new NodePool("Bullet");
    // }

    public createBulletNode() {

        if (this.bulletNodePool.size() > 0) {
            return this.bulletNodePool.get();
        } else {
            return instantiate(this.bulletPrefab);
        }
    }
    public init(bullets: Node[], prefab: Prefab) {
        this.rootNode = bullets;
        this.bulletPrefab = prefab;
        this.bulletNodePool = new NodePool("Bullet");
    }
    public updateBullet(id){
        this.weaponID = id;
    }
    public clearAllBullet() {
        for (let i = 0; i < this.rootNode[0].children.length; i++) {
            let node = this.rootNode[0].children[i];
            let bullet = node.getComponent(Bullet);
            if (bullet) {
                this.despawnBullet(node);
            }
        }
    }
    public createBullet(bulletId: number, player_id: number, bullet_cfg_id: number, pos: Vec2, bullet_angle: number, lock_fish_id: number, turretRate: number) {
        let node = this.createBulletNode();
        if (node) {
            node.parent = this.rootNode[0];

            let bullet = node.getComponent(Bullet);
            bullet.updateStyle(this.weaponID);
            bullet.init(bulletId, player_id, bullet_cfg_id, pos, bullet_angle, lock_fish_id, turretRate);
        }
    }
    public despawnBullet(bullet: Node) {
        this.bulletNodePool.put(bullet);
    }

}



