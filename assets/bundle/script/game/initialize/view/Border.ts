
import { ERigidBody2DType } from 'cc';
import { MouseJoint2D } from 'cc';
import { Size, view, RigidBody2D, BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Border')
export class Border extends Component {


    @property
    mouseJoint: boolean = false;

    @property
    thickness: number = 10;

    @property
    borderSize: number = 50;

    start() {

    }
    onLoad() {

        let size = view.getVisibleSize();
        let width = size.width;
        let height = size.height;

        // var boder = this.node.addComponent(RigidBody2D);
        // boder.type = ERigidBody2DType.Static
        // boder.enabledContactListener = true;
    

        // this._addBound(this.node, -width / 2 - this.thickness / 2 - this.borderSize, 0, this.thickness, height + this.borderSize * 2, 1);
        // this._addBound(this.node, 0, -height / 2 - this.thickness / 2 - this.borderSize, width + this.borderSize * 2, this.thickness, 2);
        // this._addBound(this.node, width / 2 + this.thickness / 2 + this.borderSize, 0, this.thickness, height + this.borderSize * 2, 3);
        // this._addBound(this.node, 0, height / 2 + this.thickness / 2 + this.borderSize, width + this.borderSize * 2, this.thickness, 4);
    }

    _addBound(node: Node, x: number, y: number, width: number, height: number, tag: number) {
        let collider = node.addComponent(BoxCollider2D);
        collider.group = 2;
        collider.tag = tag;
        collider.density = 1;
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
        console.log(collider,tag)
        collider.apply();
    }

    update(deltaTime: number) {

    }
}


