import { _decorator, Component, Node } from 'cc';
import { Fish } from './module';
const { ccclass, property } = _decorator;

@ccclass('FishData')
export default class FishData {
    
    private static data:Fish[] = []

    static setData(data:Fish[]){
        this.data = data;
    }
    static getFishById(id:number){
        if(id == null || id == undefined){
            return null;
        }
       for (let index = 0; index < this.data.length; index++) {
            const fish = this.data[index];
            if(fish.id == id){
                return fish
            }
       }
    }
    static getAllData():any{
        return this.data;
    }

}

