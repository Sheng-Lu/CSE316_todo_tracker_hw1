'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class DownArrow_Transaction extends jsTPS_Transaction {
    constructor(model, list, item){
        super();
        this.model = model;
        this.list = list;
        this.item = item;
    }

    doTransaction() {
        this.list.moveDown(this.item);
        this.model.refreshView();
    }

    undoTransaction(){
        this.list.moveUp(this.item);
        this.model.refreshView();
    }
}