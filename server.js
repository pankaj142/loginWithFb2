//Express server
var express =require('express');
var bodyParser= require('body-parser');
var app =express();

app.use(express.static('public'));
app.use(bodyParser.json());

var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/test1');

//schema 
var PostSchema = mongoose.Schema({
    userId:Number,
    fullAddress:String,
    country:String,
    state:String,
    city:String,
   
},{collection:'post'}  // it will force db to save this model as collection called as 'post'
);

var PostModel = mongoose.model('PostModel', PostSchema);

app.post('/', createPost);
app.get('/:id', getPostById);
//api to save the address
function createPost(req, res){
    var post = req.body;
    console.log( post); 
    PostModel
        .create(post)
        .then(
            function(postObj){   
                res.json(200);   
            },
            function(err){       //on failure
                res.sendStatus(400);
            }
        );
}

//api to get the address 
function getPostById(req, res){
    var postId=req.params.id;
    PostModel
             //.findById(postId)
             .findOne({userId:postId})
             .then(
                 function(post){
                    res.json(post);
                 },
                 function(err){
                    res.sendStatus(400);
                 }
             )
}

app.listen(3000, function(){
    console.log("listenning on port 3000")
});
