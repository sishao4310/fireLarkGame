import { _decorator, Component, Node } from 'cc';
import { ecs } from 'db://oops-framework/libs/ecs/ECS';
import { CCComp } from 'db://oops-framework/module/common/CCComp';

const { ccclass, property } = _decorator;

@ccclass('GameViewComp')
@ecs.register('GameView', false)
export class GameViewComp extends CCComp {
   
    start() {

    }

    update(deltaTime: number) {
        
    }

     reset(): void {
        throw new Error('Method not implemented.');
    }
}


