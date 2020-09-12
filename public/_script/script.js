to_do_list = [];
completed_list = [];

//Função original de teste
function insertToDo_old() {
  let to_do_item = "";
  let element = "";

  to_do_item = $("#text_insert").val();
  to_do_list.push(to_do_item);

  $.each(to_do_list, function (i, value) {
    element += "<li>";
    element += "<input id='" + i + "' type='checkbox'/>";
    element += "<label for='" + i + "'>" + value + "</label>";
    element += "<li>";
  });
  $(".to_do_list").html(element);
  $("#text_insert").val("");
}

function insertToDo() {
  let to_do_item = "";
  let to_do_list_json = "";

  to_do_item = $("#text_insert").val();
  to_do_list.push(to_do_item);

  //Converte o array em objeto JSON
  to_do_list_json = JSON.stringify(to_do_list);

  //Armazena o objeto JSON no localstorage
  localStorage.to_do_list = to_do_list_json;

  //Busca o JSON armazenado e converte para array novamente
  to_do_list = JSON.parse(localStorage.to_do_list);

  $("#text_insert").val("");

  console.log(to_do_list);
}
