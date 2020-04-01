window.onload = function () {
    
    let userAddGroupCount = 0;
    const groupName = "UI Engineers"
    const userNames = [
        "Bob",
        "Alice",
        "Eve"
    ]
    const createUserButton = document.getElementById("create_user_button");

    createUserButton.addEventListener('click', createUser);

    function createUser() {
        userNames.map((username)=>{
            makeApiCall('POST', 'user/create', { name:username });  
        })
    }

    function addGroup(id){
        makeApiCall('POST', 'user/addGroup', {
            userId: id,
            groupName: groupName,
        });  
    }

    function makeApiCall(type, route, data) {

        // Using XMLHttpRequest for making code compatible with all browsers.
        // I prefer to use fetch api instead. 
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const parsedResponse = JSON.parse(xhr.response);
                if(route === "user/create") {
                    const { userId } = parsedResponse;
                    addGroup(userId)
                } else if(route === "user/addGroup") {
                    userAddGroupCount = userAddGroupCount +1;
                    if(userAddGroupCount === 3){
                        console.log("Complete");
                    }
                }  
            }
        };

        xhr.open(type, route);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));      
    }
}