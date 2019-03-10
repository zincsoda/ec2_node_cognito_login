const express = require('express');
const app = new express();
const port = 3001

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/js', express.static(__dirname + '/public/js'));

app.get('/', function(request, response){
    response.sendfile('public/index.html');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
