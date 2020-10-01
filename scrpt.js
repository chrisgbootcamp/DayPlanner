// Populate current day
var Day = moment().format("dddd, LL");

// Make global var for the timeblocks
var blockTime = $(".time-block");

// Current hour retrieve
var hrCurrent = moment().format("H");

// Retrieve schedule items
var ItemsToDo = [];

// Set the timeblock colors based on time
function colorTimeBlocks() {
    blockTime.each(function () {
        var thisBlock = $(this);
        var thisHour = parseInt(thisBlock.attr("data-hour"));

        // Add styling and take it away with if statements
        if (thisHour < hrCurrent) {
            thisBlock.addClass("past").removeClass("present future");
        }
        if (thisHour == hrCurrent) {
            thisBlock.addClass("present").removeClass("past future");
        }
        if (thisHour > hrCurrent) {
            thisBlock.addClass("future").removeClass("present past");
        }
    });
}

// Set up an array for the schedule
function startSched() {
    //    console.log(toDoItems);

    // run through each time block
    blockTime.each(function () {
        var thisTime = $(this);
        var thisTimeHr = parseInt(thisTime.attr("data-hour"));

        var schedObj = {
            // set hour to the data-hour
            hour: thisTimeHr,
            // get a string ready
            text: "",
        }
        // push to array
        ItemsToDo.push(schedObj);
    });
    // save to local storage
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    //console.log(toDoItems)

}

// To Do items need to be set to locale storage and retrieved from same and displayed
function schedRender() {
    ItemsToDo = localStorage.getItem("todos");
    ItemsToDo = JSON.parse(toDoItems);

    for (var i = 0; i < ItemsToDo.length; i++) {
        var itemHr = ItemsToDo[i].hour;
        var itemText = ItemsToDo[i].text;

        $("[data-hour=" + itemHr + "]").children(".description").val(itemText);
    }
    //console.log(ItemsToDo);
}

function saveButton() {
    var thisBlock = $(this).parent();

    var hourUpdate = $(this).parent().attr("data-hour");
    var addItem = (($(this).parent()).children(".description")).val();

    for (var r = 0; r < toDoItems.length; r++) {
        if (ItemsToDo[r].hour == hourUpdate) {
            ItemsToDo[r].text = addItem;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    schedRender();
}

// Start certain functions, use the on.ready
$(document).ready(function () {
    // Timeblocks color
    colorTimeBlocks();

    // No todos then startSched
    if (!localStorage.getItem("todos")) {
        startSched();
    }

    schedRender();

    // Date needs to display
    $("#currentDay").text(Day);

    $(".saveBtn").on("click", saveButton);
});