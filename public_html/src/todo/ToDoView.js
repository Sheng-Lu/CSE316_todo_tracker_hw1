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
        listElement.onclick = function(event) {
            let temp = document.getElementById(newListId);
            // thisController.changeListName(newList, temp, event);
            let currList = thisController.getCurrentList();
            let listTemp = document.createElement("input");
            listTemp.className = "todo_button_input";
            listTemp.type = "text";
            listTemp.style.color = '#e9edf0';
            listTemp.style.textAlign = 'center';
            listTemp.style.height = '40px';
            listTemp.style.backgroundColor = 'rgb(255,200,25)';

            
            if(currList == newList){
                // console.log(true);
                listTemp.value = newList.getName();
                temp.replaceWith(listTemp);
                listTemp.focus();

                listTemp.onblur = function(event) {
                    newList.setName(listTemp.value);
                    listTemp.replaceWith(temp);
                    temp.innerHTML = listTemp.value;
                }
            }
            else{
                thisController.handleLoadList(newList.id);
                let temp1 = document.getElementById(newListId);
                temp1.style.backgroundColor = 'rgb(255,200,25)';
            }
            

            // let temp1 = document.getElementById(newListId);
            // temp1.style.backgroundColor = 'rgb(255,200,25)';
            
        }

        // let listTemp = document.createElement("input");
        //     listTemp.className = "todo_button_input";
        //     listTemp.type = "text";

        // let temp = document.getElementById(newListId);
        
        
        // temp.ondblclick = function(event) {
        //     listTemp.value = newList.getName();
        //     temp.replaceWith(listTemp);
        //     listTemp.focus();
        // }

        // listTemp.onblur = function(event) {
        //     newList.setName(listTemp.value);
        //     listTemp.replaceWith(temp);
        //     temp.innerHTML = listTemp.value;
        // }
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

        document.getElementById("delete-list-button").style.pointerEvents = 'auto';
        document.getElementById("add-item-button").style.pointerEvents = 'auto';
        document.getElementById("close-list-button").style.pointerEvents = 'auto';

        document.getElementById("delete-list-button").style.color = 'white';
        document.getElementById("add-item-button").style.color = 'white';
        document.getElementById("close-list-button").style.color = 'white';

        document.getElementById("add-list-button").style.color = 'grey';
        document.getElementById("add-list-button").style.pointerEvents = 'none';

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        if(list == null){
            return
        }

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
            todoListItem.className = 'list-item-card-item';
            itemsListDiv.appendChild(todoListItem);

            todoListItem.onmouseover = function(){
                todoListItem.style.backgroundColor = '#353a44';
            }
            todoListItem.onmouseout = function(){
                todoListItem.style.backgroundColor = '#40454e';
            }

            let listDesc = document.createElement('div');   // task description
            listDesc.className = 'task-col';
            listDesc.innerHTML = listItem.description;
            todoListItem.appendChild(listDesc);

            let descInput = document.createElement('input');
            descInput.className = 'right_input';
            descInput.type = 'text';
            descInput.value = listItem.description;
            
            listDesc.onclick = function(){
                listDesc.replaceWith(descInput);
                descInput.focus();
            }
            descInput.onblur = function() {
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

            listDate.onclick = function(){
                listDate.replaceWith(dateInput);
                dateInput.focus();
            }
            dateInput.onblur = function(){
                controller.handleDueDate(listItem, dateInput.value);
            }

            let listStatus = document.createElement('div');     //list status
            listStatus.className = 'status-col';
            listStatus.innerHTML= listItem.status;
            if(listItem.status == "incomplete"){
                listStatus.style.color = "#F5BC75";
            }
            else if(listItem.status == "complete"){
                listStatus.style.color = "#8ED4F8";
            }
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

            listStatus.onclick = function(){
                listStatus.replaceWith(statusInput);
                statusInput.focus();
            }
            statusInput.onblur = function(){
                controller.handleStatus(listItem, statusInput.value);
            }

            let listControl = document.createElement('div');
            listControl.className = 'list-controls-col'
            
            let arrowUp = document.createElement('div');        //up arrow
            arrowUp.className = 'list-item-control material-icons';
            arrowUp.innerHTML= 'keyboard_arrow_up';
            listControl.appendChild(arrowUp);

            arrowUp.onclick = function(){
                controller.handleUpArrow(list, listItem);
            }

            if(i == 0){
                arrowUp.style.color = 'grey';
                arrowUp.style.pointerEvents = 'none';
            }

            let arrowDown = document.createElement('div');      //down arrow
            arrowDown.className = 'list-item-control material-icons';
            arrowDown.innerHTML='keyboard_arrow_down';
            listControl.appendChild(arrowDown);

            arrowDown.onclick = function(){
                controller.handleDownArrow(list, listItem);
            }

            if(i == list.items.length-1){
                arrowDown.style.color = 'grey';
                arrowDown.style.pointerEvents = 'none';
            }

            let close = document.createElement('div');          //x button
            close.className = 'list-item-control material-icons';
            close.innerHTML='close';
            listControl.appendChild(close);

            close.onclick = function(){
                controller.handleClose(list, listItem);
                // list.removeItem(listItem);
                // itemsListDiv.removeChild(todoListItem);
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