
export class Fish {
    /**加速度类型*/
    accel: string;
    /**鱼的资源包*/
    asset: string;
    /** 出生类型*/
    birth: any;
    /**公告颜色*/
    color: string;
    /**是否播放大奖特效*/
    die_effect: boolean;
    /** 死亡时 激活效果*/
    effect: number;
    /**获取经验值*/
    exp: number;
    /**锁定图标*/
    fish_icon: string;
    /**闪电炮标识*/
    flash_tag: string;
    /**冰冻概率*/
    freeze: number;
    /** 鱼的id*/
    id: number;
    /** 显示层级*/
    layer: string;
    /** 移动类型*/
    move: string;
    /**移动速度*/
    move_speed: number;
    /** 鱼的名字*/
    name: string;
    /** 移动路径节点名字*/
    path: string;
    /**鱼的倍率*/
    power: [];
    /** 路径随机化*/
    rand_path: boolean;
    /** 旋转角度*/
    rot: number;
    /** 长度*/
    size: number;
    /** 游的动作名*/
    swim: string;
    /** 奖券掉落概率*/
    ticket_prob: number;

    tweens: Fish_tweens[];
    /**leixing */
    type: number;
    /**弹头概率*/
    warhead: number;
}
export class Fish_tweens {

    /**交换类型*/
    eases: string;
    /**每秒帧数*/
    fps: number;
    /**持续帧数*/
    frames: number;
    /** 鱼的id */
    id: number;
    /** 鱼的名字*/
    name: string;
    /*插值类型*/
    trans: string;
    /**移动雨里权重*/
    weight: number;
}
export class scene{
    /**场景id*/
    id:number;
    /**场景名字*/
    name:string;
    /**资源包*/
    assets:string;
    /**产鱼id*/
    birth_id:number;
    /**鱼阵id*/
    group_id:number;
    /**boss出场时间*/
    boss_fadein:number;
    /**boss离场时间*/
    boss_fadeout:number;
    /**转场时间*/
    pool_fadeout:number;
    /**首次进入是否刷鱼阵*/
    group_launch:boolean;
    /**boss的id*/
    boss_id:number;
}
export class CallBoss {
    comment: "BOSS";
    count: number[];
    delay: number[];
    delta: number[];
    desc: string;
    fin: number;
    fish_id: number[];
    follow: boolean;
    id: number;
    scene: number;
    start: number;
    type: string;
    births:[];
    groups:[];
}
export class Births{

}
export class FishGroup{
    
}