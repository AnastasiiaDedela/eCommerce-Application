import { makeAutoObservable } from "mobx";

class Counter {

    someValue = 0;

    constructor(){
        makeAutoObservable(this)
    }

    increateValue(){
        this.someValue += 1;
    }

    decreaseValue(){
        this.someValue -= 1;
    }
}

export default new Counter()