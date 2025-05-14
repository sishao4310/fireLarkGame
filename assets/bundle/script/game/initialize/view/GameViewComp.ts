import { _decorator, Component, Node } from 'cc';
import { ecs } from 'db://oops-framework/libs/ecs/ECS';
import { CCComp } from 'db://oops-framework/module/common/CCComp';
import { Weapon } from './Weapon';
import { Prefab } from 'cc';
import { PlayerMgr } from './PlayerMgr';
import { BulletMgr } from './BulletMgr';
import { FishMgr } from './FishMgr';

const { ccclass, property } = _decorator;

@ccclass('GameViewComp')
@ecs.register('GameView', false)
export class GameViewComp extends CCComp {



     @property(Node)
    fishpond: Node = null; // 鱼根节点

    @property(Prefab)
    fishPrefab: Prefab =null; // 鱼预制体

    @property([Node])
    bulletRootNode: Node[] = []; // 子弹的根节点

    @property(Prefab)
    bulletPrefab: Prefab = null; // 子弹预制体

    @property([Node])
    effectNode: Node[] = []; // 特效层


    @property(PlayerMgr)
    playerMgr:PlayerMgr = null;

    @property([Weapon])
    weapon:Weapon[] = [] //炮台

    start() {
        this.enter();
    }

    enter() {
        const AnyDataReq = {
            anyPbMarshal: new Uint8Array(1)
        }

        BulletMgr.getInstance().init(this.bulletRootNode,this.bulletPrefab);
        FishMgr.getInstance().init(this.fishpond,this.fishPrefab);

        FishMgr.getInstance().createFish(1,1,1);
        // this.schedule(()=>{
        //     FishMgr.getInstance().createFish(1,1,1);
        // },10)
        this.initWeapon();
    }
    initWeapon(){
        this.weapon[0].initData(1);
    }

    update(deltaTime: number) {

    }

    reset(): void {
        throw new Error('Method not implemented.');
    }
}


