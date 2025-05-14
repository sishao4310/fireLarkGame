import { NodePool, Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Fish } from './Fish';
import { instantiate } from 'cc';
import { Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishMgr')
export class FishMgr {

    private static inst: FishMgr = null;
    public static getInstance(): FishMgr {
        if (this.inst == null) {
            this.inst = new FishMgr();
        }
        return this.inst;
    }
    fishNodePool: NodePool = null; // 鱼对象池
    fishPrefab: Prefab = null;

    fishpond: Node = null;

    // 锁定的鱼列表
    // lockFishList: number[] = [];
    lockFishMap: Map<number, number[]> = new Map<number, number[]>();

    private constructor() {
        this.fishNodePool = new NodePool('Fish');
    }

    public init(fishpond: Node, prefab: Prefab) {
        this.fishpond = fishpond;
        this.fishPrefab = prefab;
        // this.lockFishList.length = 0;
        this.lockFishMap.clear();
    }

    public createFish(fish_id: number, fish_cfg_id: number, route_id: number, bLamp: boolean = false): Fish {
        if (!bLamp && this.fishpond.children.length >= 200) {
            console.debug("最大鱼数量达到200了");
            return null;
        }


        let node = this.createFishNode();
        node.parent = this.fishpond;
        node.position = new Vec3(-50, -50);

        
        let fish = node.getComponent(Fish);
        fish.initFish(fish_id, fish_cfg_id);

        return fish;
    }



    public clearAllFish() {
        // fishGeneratorMgr.clearGenerator();
        for (let i = 0; i < this.fishpond.children.length; i++) {
            let node = this.fishpond.children[i];
            let fish = node.getComponent(Fish);
            if (fish) {
                this.despawnFish(node);
            }
        }
    }
    public createFishNode(): Node {
        if (this.fishNodePool.size() > 0) {
            return this.fishNodePool.get();
        } else {
            return instantiate(this.fishPrefab);
        }
    }
    public despawnFish(fish: Node) {
        this.fishNodePool.put(fish);
    }

}


