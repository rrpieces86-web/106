function saveTask(){
    const title = $("#txttitle").val();
    const description = $("#txtdescription").val();
    const color = $("#selcolor").val();
    const date = $("#seldate").val();
    const status = $("#selstatus").val();
    const budget = $("#numbudget").val();

    const data = new Task(title, description, color, date, status, budget);
    console.log(data)
}

function init(){
    $("#btnsave").click(saveTask);
}
window.onload = init;