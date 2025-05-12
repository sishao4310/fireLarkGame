/*
 * @Date: 2021-08-12 09:33:37
 * @LastEditors: dgflash
 * @LastEditTime: 2023-02-15 09:38:36
 */

import { LayerType } from "db://oops-framework/core/gui/layer/LayerEnum";
import { UIConfig } from "db://oops-framework/core/gui/layer/UIConfig";

/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {
    /** 资源加载界面 */
    Loading = 1,
    /** 游戏主页面 */
    Game,
}   

/** 打开界面方式的配置数据 */
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "gui/loading/loading" },
    [UIID.Game]: { layer: LayerType.UI, prefab: "gui/prefabs/game" },
}