
function getAllMonts () {
    return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
}

function generateMonthsSelect () {
    let months = getAllMonts();
    months.forEach((title, index) => {
        $('#monthsSelect').append(`<option value=${index}>${title}</option>`);
    });
}

function generateCalendar (year, month, events, eventsDay) {

    let daysInMonth = new Date(+year, +month+1, 0).getDate();
    let firstWeekDay = new Date(+year, +month, 1).getDay();

    firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;

    for(let i = 1; i < firstWeekDay; i++) {
        $('#calendar .body').append('<div class="day"></div>')
    }

    let index = firstWeekDay;

    for(let i = 1; i <= daysInMonth; i++) {


        let event = eventsDay.filter(value => parseInt(value)=== i);
        let br = '';

        if(++index === 7) {
            index = 0;
            br = '<br>';
        }

         let eventHtml = '';
         if(event.length) {
           events.forEach(value => eventHtml += `<p>${value.id}: ${value.title}</p>`)
         }
        $('#calendar .body').append(`<div data-day="${i}" class="day item">${i} ${eventHtml}</div>${br}`);
         eventHtml="";
    }
}

$(document).ready(function () {
    let url = window.location + "json"
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (result) {
        }
    }).then((data) => {
        generateMonthsSelect();
        let events = data;
        let eventsDay = [];
        events.forEach(value => {
            eventsDay.push(value.created.slice(value.created.lastIndexOf(',')+1));
        });
        let year = $('#yearInput').val();
        let month = $('#monthsSelect').val();
        generateCalendar(+year, +month, events, eventsDay);

        $('#monthsSelect').change(function () {
            let year = $('#yearInput').val();
            let month = $('#monthsSelect').val();
            $('#calendar .body').html('');
            generateCalendar(+year, +month, events, eventsDay);
        });

        $('#calendar').on('click', '.item', function () {
            let year = $('#yearInput').val();
            let month = $('#monthsSelect').val();
            let day = $(this).data('day');

            window.location.href = `/events?year=${year}&month=${month}&day=${day}`;
        })
    });
});
