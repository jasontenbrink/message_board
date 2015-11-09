var messages = [];

$(document).ready(function () {
  getData();
  $('#submitMessageForm').on('submit',submitMessageForm);
});


function submitMessageForm() {
  event.preventDefault();
  var values = {};
  $.each($(this).serializeArray(), function(i, field){
     values[field.name] = field.value;
  });
  $.ajax({
    type: "POST",
    url: "/data",
    data: values,
    success: function (data) {
      console.log('POST complete');
      getData();
    }
  });
}
function getData() {
  $.ajax({
    type: 'GET',
    url: '/data',
    success: function (data) {
      messages = data;
      displayMessages();
    }
  });
}

function displayMessages() {
  $('#postMessages').empty();
  for (var i = 0; i < messages.length; i++) {
    $('#postMessages').append('<div class="well" data-id="' + messages[i].id + '"></div>');
    var el$ = $('#postMessages').children().last();
    el$.append('<p class="name">' + messages[i].name + ' says:</p>');
    el$.append('<p>' + messages[i].message + '</p>');
  }
}
