'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
            
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let controller = this.controller;

        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            // let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
            //                     + "<div class='task-col' >" + listItem.description + "</div>"
            //                     + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
            //                     + "<div class='status-col'>" + listItem.status + "</div>"
            //                     + "<div class='list-controls-col'>"
            //                     + " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
            //                     + " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
            //                     + " <div class='list-item-control material-icons'>close</div>"
            //                     + " <div class='list-item-control'></div>"
            //                     + " <div class='list-item-control'></div>"
            //                     + "</div>";
            // itemsListDiv.innerHTML += listItemElement;
            
            

            let todoListItem = document.createElement('div');
            todoListItem.id = 'todo-list-item-' + listItem.id;
            // todoListItem.setAttribute("id", "todo-list-item-"+listItem.id);
            todoListItem.className = 'list-item-card';
            itemsListDiv.appendChild(todoListItem);

            let listDesc = document.createElement('div');   // task description
            listDesc.className = 'task-col';
            listDesc.innerHTML = listItem.description;
            todoListItem.appendChild(listDesc);

            let descInput = document.createElement('input');
            descInput.className = 'right_input';
            descInput.type = 'text';
            descInput.value = listItem.description;
            
            listDesc.onclick = function(event){
                listDesc.replaceWith(descInput);
                descInput.focus();
            }
            descInput.onblur = function(event) {
                controller.handleDescription(listItem, descInput.value);
            }

            let listDate = document.createElement('div');     // task date
            listDate.className = 'due-date-col';
            listDate.innerHTML= listItem.dueDate;
            todoListItem.appendChild(listDate);

            let dateInput = document.createElement('input');
            dateInput.className = 'right_input';
            dateInput.type = 'date';
            dateInput.value = listItem.dueDate;

            listDate.onclick = function(event){
                listDate.replaceWith(dateInput);
                dateInput.focus();
            }
            dateInput.onblur = function(event){
                controller.handleDueDate(listItem, dateInput.value);
                // listItem.setDueDate(dateInput.value);
                // listDate.innerHTML= listItem.dueDate;
                // dateInput.replaceWith(listDate);
            }

            let listStatus = document.createElement('div');     //list status
            listStatus.className = 'status-col';
            listStatus.innerHTML= listItem.status;
            todoListItem.appendChild(listStatus);

            let statusInput = document.createElement('select');
            statusInput.className = 'right_input';

            let completeS = document.createElement("option");
            completeS.className = 'right_input'
            completeS.value = "complete";
            completeS.text = "complete";
            completeS.style.backgroundColor = "#40454e";
            statusInput.appendChild(completeS);

            let incompleteS = document.createElement("option");
            incompleteS.value = "incomplete";
            incompleteS.text = "incomplete";
            incompleteS.style.backgroundColor = "#40454e";
            statusInput.appendChild(incompleteS);

            statusInput.value = listItem.status;

            // todoListItem.appendChild(statusInput);

            listStatus.onclick = function(event){
                listStatus.replaceWith(statusInput);
                statusInput.focus();
            }
            statusInput.onblur = function(event){
                listItem.setStatus(statusInput.value);
                listStatus.innerHTML= listItem.status;
                statusInput.replaceWith(listStatus);
            }

            let listControl = document.createElement('div');
            listControl.className = 'list-controls-col'
            
            let arrowUp = document.createElement('div');        //up arrow
            arrowUp.className = 'list-item-control material-icons';
            arrowUp.innerHTML= 'keyboard_arrow_up';
            listControl.appendChild(arrowUp);

            arrowUp.onclick = function(event){
                list.moveUp(listItem);
                this.viewList(list)
            }

            let arrowDown = document.createElement('div');
            arrowDown.className = 'list-item-control material-icons';
            arrowDown.innerHTML='keyboard_arrow_down';
            listControl.appendChild(arrowDown);

            arrowDown.onclick = function(event){
                list.moveDown(listItem);
            }

            let close = document.createElement('div');          //x button
            close.className = 'list-item-control material-icons';
            close.innerHTML='close';
            listControl.appendChild(close);

            close.onclick = function(event){
                list.removeItem(listItem);
                itemsListDiv.removeChild(todoListItem);
            }

            let listItemControl = document.createElement('div');
            listItemControl.className = 'list-item-control';
            listControl.appendChild(listItemControl);

            let listItemControl1 = document.createElement('div');
            listItemControl.className = 'list-item-control';
            listControl.appendChild(listItemControl1);

            todoListItem.appendChild(listControl);


        }
    }


    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}