'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            document.getElementById("popup").classList.add("active");
            document.getElementById("overlay").classList.add("active");
            // appModel.removeCurrentList();
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }  
        document.getElementById("cancel_button").onmousedown = function() {
            document.getElementById("popup").classList.remove("active");
            document.getElementById("overlay").classList.remove("active");
        }
        document.getElementById("x_button").onmousedown = function() {
            document.getElementById("popup").classList.remove("active");
            document.getElementById("overlay").classList.remove("active");
        }
        document.getElementById("confirm_button").onmousedown = function() {
            appModel.removeCurrentList();
            document.getElementById("popup").classList.remove("active");
            document.getElementById("overlay").classList.remove("active");
        }
        document.getElementById("overlay").onmousedown = function() {
            document.getElementById("popup").classList.remove("active");
            document.getElementById("overlay").classList.remove("active");
        }
        document.getElementById("close-list-button").onmousedown = function(){
            appModel.closeList();
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        document.getElementById("undo-button").style.pointerEvents = 'none';
        document.getElementById("undo-button").style.color = 'grey';
        this.model.loadList(listId);
    }

    handleDescription(item, newDesc){
        this.model.addDescriptionTransaction(item, newDesc);
    }

    handleDueDate(item, newDate){
        this.model.addDateTransaction(item, newDate);
    }

    handleStatus(item, newStatus){
        this.model.addStatusTransaction(item, newStatus);
    }

    handleUpArrow(list, item){
        this.model.addUpArrowTransaction(list, item);
    }

    handleDownArrow(list, item){
        this.model.addDownArrowTransaction(list, item);
    }

    handleClose(list, item){
        this.model.addCloseTransaction(list, item);
    }
    
    getCurrentList(){
        return this.model.getCurrentList();
    }
    
}