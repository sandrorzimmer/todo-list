function getTodolist() {
    let to_do_list = [];

    //Busca o JSON armazenado no localstorage e converte para array
    to_do_list = JSON.parse(localStorage.to_do_list);
    
    return to_do_list;
}

function getCompletedlist() {
    let completed_list = [];

    //Busca o JSON armazenado no localstorage e converte para array
    completed_list = JSON.parse(localStorage.completed_list);
    
    return completed_list;
}

function saveTodolist(to_do_list) {
    //Converte o array em objeto JSON
    to_do_list_json = JSON.stringify(to_do_list);

    //Armazena o objeto JSON no localstorage
    localStorage.to_do_list = to_do_list_json;

    return;
}

function saveCompletedlist(completed_list) {
    //Converte o array em objeto JSON
    completed_list_json = JSON.stringify(completed_list);

    //Armazena o objeto JSON no localstorage
    localStorage.completed_list = completed_list_json;

    return;
}

//Mostra as listas to do e completed
function showLists() {
    let to_do_list = [];
    let completed_list = [];
    let element_todo = "";
    let element_completed = "";

    to_do_list = getTodolist();
    completed_list = getCompletedlist();

    //Monta a lista to do com os dados buscados
    $.each(to_do_list, function (i, value) {
        element_todo += "<li>";
        element_todo += "<input id='" + i + "' type='checkbox' onchange='completeItem(" + i + ")'/>";
        //element_todo += "<label for='" + i + "'>" + value + "</label>";
        element_todo += "<span onclick='editItem(" + i + ",0)'>" + value + "</span>";
        element_todo += "<li>";
    });
    $(".to_do_list").html(element_todo);

    //Monta a lista completed com os dados buscados
    $.each(completed_list, function (i, value) {
        element_completed += "<li>";
        element_completed += "<input id='" + i + "' type='checkbox' onchange='undoItem(" + i + ")'/>";
        element_completed += "<span onclick='editItem(" + i + ",1)'>" + value + "</span>";
        element_completed += "<li>";
    });
    $(".completed_list").html(element_completed);
    return;
}

//Insere novo item na lista to do
function insertToDo() {
    let to_do_list = [];
    let to_do_item = "";

    to_do_list = getTodolist();    

    to_do_item = $("#text_insert").val();
    to_do_list.push(to_do_item);

    saveTodolist(to_do_list);

    to_do_list = getTodolist();

    //Mostra a lista to do atualizada com o novo item
    showLists();

    //Limpa campo de inserção de novo item
    $("#text_insert").val("");
    return;
}

function completeItem(item) {
    let to_do_list = [];
    let completed_list = [];
    let text_item = "";

    to_do_list = getTodolist();
    completed_list = getCompletedlist();

    text_item = to_do_list[item];

    to_do_list.splice(item,1);

    saveTodolist(to_do_list);

    completed_list.push(text_item);

    saveCompletedlist(completed_list);

    showLists();

    return;
}

function undoItem(item){
    let to_do_list = [];
    let completed_list = [];
    let text_item = "";

    to_do_list = getTodolist();
    completed_list = getCompletedlist();

    text_item = completed_list[item];

    completed_list.splice(item,1);

    saveCompletedlist(completed_list);

    to_do_list.push(text_item);

    saveTodolist(to_do_list);

    showLists();

    return;
}

function clearCompleted() {
    let init_localstorage = [];

    saveCompletedlist(init_localstorage);

    showLists();

    return;
}

function editItem(item,list_type) {
    //list = 0 --> to do list item
    //list = 1 --> completed list item

    let list = [];
    let item_text = "";

    if (list_type == 0) {
        list = getTodolist();
    } else {
        list = getCompletedlist();
    }
    item_text = list[item];
    $("#edit_item").val(item_text);
    $("#item_index").val(item);
    $("#list_type").val(list_type);

    return;
}

function confirmEditItem() {
    let list_type = null;
    let item_index = null;
    let item_text = "";
    let list = [];
    
    list_type = $("#list_type").val();
    item_index = $("#item_index").val();
    item_text = $("#edit_item").val();

    if (list_type == 0) {
        list = getTodolist();
        list[item_index] = item_text;
        saveTodolist(list);
    } else {
        list = getCompletedlist();
        list[item_index] = item_text;
        saveCompletedlist(list);
    }
    showLists();
    $("#edit_item").val("");

    return;
}

//Executar ao carregar a página
$(document).ready(function(){

    let init_localstorage = [];

    if (typeof(Storage) !== "undefined") {
        if (localStorage.to_do_list == undefined) {
            saveTodolist(init_localstorage);
        }
        if (localStorage.completed_list == undefined) {
            saveCompletedlist(init_localstorage);
        }
        showLists();
    } else {
        alert("Sorry, this browser does not support Web Storage.");
    }
 });
