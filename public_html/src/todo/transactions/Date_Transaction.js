'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class Date_Transaction extends jsTPS_Transaction {
    constructor(model, listItem, oldDate, newDate){
        super();
        this.oldDate = oldDate;
        this.newDate = newDate;
        this.listItem = listItem;
        this.model = model;
    }

    doTransaction() {
        this.listItem.setDueDate(this.newDate);
        this.model.refreshView();
    }

    undoTransaction(){
        this.listItem.setDueDate(this.oldDate);
        this.model.refreshView();
    }
}