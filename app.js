const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/eventCalendar');
const EventsSchema = require('./models/event');
const Events = db.model('event', EventsSchema);

app.use(express.static(__dirname + '/public'));

app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get ('/json', (req, res) => {
    Events.find()
        .exec((err,events) =>{
            if (err) { return res.send('error has occured'); }
            console.log(events);
            res.json(events);
        });
});

app.get('/events', (req, res) => {
  res.sendFile(__dirname + '/public/html/events.html');
});

app.post('/events', (req, res) => {
    let event = new Events();
    event.id = req.body.id;
    event.title = req.body.title;
    event.created = req.body.date;
    event.text = req.body.text;


    Events.create(event,function(err){
        if (err) {return console.log(err);}
        res.send(event);
    });

});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
