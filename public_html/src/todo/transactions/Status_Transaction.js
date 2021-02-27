'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class Status_Transaction extends jsTPS_Transaction {
    constructor(model, listItem, oldStatus, newStatus){
        super();
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
        this.listItem = listItem;
        this.model = model;
    }

    doTransaction() {
        this.listItem.setStatus(this.newStatus);
        this.model.refreshView();
    }

    undoTransaction(){
        this.listItem.setStatus(this.oldStatus);
        this.model.refreshView();
    }
}