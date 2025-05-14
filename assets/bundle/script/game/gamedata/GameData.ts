
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { FishModellComp } from "./model/FishModellComp";

/** 账号模块 */
@ecs.register('GameData')
export class GameData extends ecs.Entity {

    FishModel!: FishModellComp;
    
    protected init() {
        this.addComponents<ecs.Comp>(FishModellComp);
    }
}