// Need to: Grab SQL database stuff
function fetchGradeData() {
    // This will grab and return database info
    console.log("Fetching grade data...")
    // Create new request for HTTP data
    let xhr = new XMLHttpRequest()
    // Address on machine we are asking for data
    let apiRoute= "/api/grades";
    // When request changes status, run this function
    xhr.onreadystatechange = function(){
        let results;
        // Check if done
        if(xhr.readyState === xhr.DONE){
            // Check if successful
            if(xhr.status !== 200){
                console.error(`Could not get grades.
                    Status: ${xhr.status}`);
            }
            // Call function to update HTML
            populateGradebook(JSON.parse(xhr.responseText));
        }

    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();

}

// To Do: Populate the table with grade data
function populateGradebook(data) {
    //This will take grade data and update the table
    console.log("Populating gradebook with data:" , data);
    let tableElm = document.getElementById("gradebook"); // Get Gradebook Element
        data.forEach(function(assignment){ //For each row of data we're passed in
            let row = document.createElement('tr'); // Create table row
            let columns = []; // Place to put column info
            columns.name = document.createElement('td'); // 1st column table date will be name
            columns.name.appendChild(
                //Concatenate the full name
                document.createTextNode(assignment.last_name + "," + assignment.first_name)
            );
            columns.grade = document.createElement('td') // 2nd collumn will be grade
            columns.grade.appendChild(
                document.createTextNode(assignment.total_grade)
            );
            // Add table data columns to table row
            row.appendChild(columns.name);
            row.appendChild(columns.grade);
            // Add the row to the table visually
            tableElm.appendChild(row);

});

}

fetchGradeData();