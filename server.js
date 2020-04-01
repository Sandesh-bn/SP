const express = require('express');
const app = express();
const port = 3000;  
const bodyParser = require('body-parser')

let UIEngineersCount = 0;
let id = 1;
const users = [];

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/user/create', (req, res) => {

  const newUser = {
    userId: id,
    name: req.body.name,
    groups: []
  }
  users.push(newUser);
  id = id + 1;
  return res.send(newUser);
});


app.post('/user/addGroup', (req, res) => {
  const { userId, groupName } = req.body;
  const userExists = users.find(user => {
    if (user.userId == userId) {
      user.groups.push(groupName);
      return true
    }
  });
  
  users.map((user)=>{
    if ((user.name == "Alice" || user.name == "Bob" || user.name == "Eve") 
       && user.groups.includes("UI Engineers")){
         UIEngineersCount++;
       }
  })

  if(UIEngineersCount === 3 ) {
    return res.send({
      success: true,
    });
  } else {
    UIEngineersCount = 0;
    return res.send(userExists);
  }

});





app.listen(port);
console.log(`Server listening on port ${port}`)

