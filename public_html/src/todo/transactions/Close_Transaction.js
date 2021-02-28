'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class Close_Transaction extends jsTPS_Transaction {
    constructor(model, list, item){
        super();
        this.model = model;
        this.list = list;
        this.item = item;
        this.index = list.getIndexOfItem(item);
    }

    doTransaction() {
        this.list.removeItem(this.item);
        this.model.refreshView();
    }

    undoTransaction(){
        this.list.insertItemAtIndex(this.item, this.index);
        this.model.refreshView();
    }
}