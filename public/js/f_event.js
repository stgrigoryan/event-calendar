let queryParams = new URL(window.location.href);

let day = queryParams.searchParams.get('day');
let month = +queryParams.searchParams.get('month')+1;
let year = queryParams.searchParams.get('year');



$('#day').html(`${day}/${month}/${year}`);

let url = window.location + "/events";

$( "#submitButton" ).click(function() {
    let id = $('#eventId').val();
    let title = $('#eventTitle').val();
    let text = $('#eventText').val();
    let data = {id: id,
        title: title,
        date: `${year},${month},${day}`,
        text: text
    };
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(){
            window.location.href='/';},
        failure: function() {
            return alert("The event couldn't been saved!!!");
        }
    });
});
