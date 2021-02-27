'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class Description_Transation extends jsTPS_Transaction {
        constructor(model, listItem, oldDesc, newDesc){
            super();
            this.oldDesc = oldDesc;
            this.newDesc = newDesc;
            this.listItem = listItem;
            this.model = model;
        }
    
        doTransaction() {
            this.listItem.setDescription(this.newDesc);
            this.model.refreshView();
        }
    
        undoTransaction(){
            this.listItem.setDescription(this.oldDesc);
            this.model.refreshView();
        }
    }