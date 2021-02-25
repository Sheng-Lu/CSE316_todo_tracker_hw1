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

            let listDesc = document.createElement('div');
            listDesc.className = 'task-col';
            listDesc.innerHTML = listItem.description;
            // listDesc.value = listItem.description;
            // listDesc.disabled = true;
            todoListItem.appendChild(listDesc);

            let descInput = document.createElement('input');
            descInput.className = 'task-col-input';
            descInput.type = 'text';
            descInput.value = listItem.description;
            
            listDesc.onclick = function(event){
                listDesc.replaceWith(descInput);
                descInput.focus();
            }
            descInput.onblur = function(event) {
                listItem.setDescription(descInput.value);
                listDesc.innerHTML = listItem.description;
                descInput.replaceWith(listDesc);
            }

            let listDate = document.createElement('input');
            listDate.className = 'due-date-col';
            // listDate.innerHTML= listItem.dueDate;
            listDate.value = listItem.dueDate;
            todoListItem.appendChild(listDate);

            let listStatus = document.createElement('div');
            listStatus.className = 'status-col';
            listStatus.innerHTML= listItem.status;
            todoListItem.appendChild(listStatus);

            let listControl = document.createElement('div');
            listControl.className = 'list-controls-col'
            
            let arrowUp = document.createElement('div');
            arrowUp.className = 'list-item-control material-icons';
            arrowUp.innerHTML= 'keyboard_arrow_up';
            listControl.appendChild(arrowUp);

            let arrowDown = document.createElement('div');
            arrowDown.className = 'list-item-control material-icons';
            arrowDown.innerHTML='keyboard_arrow_down';
            listControl.appendChild(arrowDown);

            let close = document.createElement('div');
            close.className = 'list-item-control material-icons';
            close.innerHTML='close';
            listControl.appendChild(close);

            let listItemControl = document.createElement('div');
            listItemControl.className = 'list-item-control';
            listControl.appendChild(listItemControl);

            let listItemControl1 = document.createElement('div');
            listItemControl.className = 'list-item-control';
            listControl.appendChild(listItemControl1);

            todoListItem.appendChild(listControl);

            // itemsListDiv.appendChild()

            // let temp = " <div class='list-item-control'></div>"
            //                     + " <div class='list-item-control'></div>"
            //                     + "</div>";
            // itemsListDiv.innerHTML += temp;

        }
    }


    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}