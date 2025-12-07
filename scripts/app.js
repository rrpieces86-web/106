const API_URL = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";
function saveTask(){
    const title = $("#txttitle").val();
    const description = $("#txtdescription").val();
    const color = $("#selcolor").val();
    const date = $("#seldate").val();
    const status = $("#selstatus").val();
    const budget = $("#numbudget").val();

    const data = new Task(title, description, color, date, status, budget);
    console.log(data)

    $.ajax({
        type: "POST",
        Url: API_URL,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(created){
            console.log("task created:", created);
        },
        error: function(error){
            console.log("error:", error);
        }
    });
}

function loadTask()
{
    $.ajax({
        type: "get",
        url: API_URL,
        dataType: "json",
        success: function(tasks){
            console.log(tasks)
            //seperate objects with loop
            for (let i=0; i<tasks.length; i++)
            {
                let temp = tasks[i];
                if(temp.name === "reece")
                displayTask(temp);
            }
        }
        //seperate with foreach function
        //tasks.forEach(displayTask);
    });
}
function updateTask()
{
    $.ajax({
        type: "put",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/20",
        data: JSON.stringify({
            title: "new entry",
        }),
        contentType:"application/json",
        success: function(response)
        {
            console("update success",response)
        },
        error: function(err)
        {
            console.log(err)
        }

    });
}
function displayTask(task){
    const data = `
    <div class="task" style="border-color:${task.color}">
    <div clas="info">
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    </div>
    <label class="status">${task.status}</label>
    <div class="date-budget">
    <label>${task.date}</label>
    <label>${task.budget}</label>
    </div>
    </div>
    `
    $(".list").append(data);
}
//test connection to api
function testRequest()
{
    
$.ajax({
    type: "get",
    url: "API_URL",
    success: function(response){
        console.log("API Response:", response);
    },
    Error: function(error){
        console.log("error:", error);
    }
    
    
});
}
function init(){
    $("#btnsave").click(saveTask);
    loadTask();
}
window.onload = init;