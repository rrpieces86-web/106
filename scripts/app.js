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
        url: API_URL,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(created){
            console.log("task created:", created);
        },
        error: function(error){
            console.log("Error:", error);
        }
    });
}

function loadTask()
{
    $.ajax({
        type: "get",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks",
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


// Function to clear all displayed tasks and delete from API/database
function clearAllTasks(){
    // First, fetch all tasks from the API
    $.ajax({
        type: "GET",
        url: API_URL,
        dataType: "json",
        success: function(tasks){
            console.log("Found " + tasks.length + " tasks to delete");
            
            // Filter tasks for user "reece" and delete each one
            const reeceTasks = tasks.filter(task => task.name === "reece");
            
            if(reeceTasks.length === 0){
                console.log("No tasks to delete");
                $(".list .task").remove();
                return;
            }
            
            // Delete each task from the API
            let deletedCount = 0;
            reeceTasks.forEach(function(task){
                $.ajax({
                    type: "DELETE",
                    url: API_URL + "/" + task.id,
                    success: function(response){
                        deletedCount++;
                        console.log("Deleted task:", task.id);
                        
                        // Once all tasks are deleted, clear the display
                        if(deletedCount === reeceTasks.length){
                            $(".list .task").remove();
                            console.log("All tasks deleted from database and display");
                        }
                    },
                    error: function(error){
                        console.log("Error deleting task:", task.id, error);
                    }
                });
            });
        },
        error: function(error){
            console.log("Error fetching tasks:", error);
        }
    });
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
    $("#btnclear").click(clearAllTasks);
    loadTask();

}
window.onload = init;