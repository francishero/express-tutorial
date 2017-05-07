
var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

var app=express();

//middleware
// app.use((req,res,next)=>{
// 	console.log('method used: '+req.method +' and '+req.url);
// 	next();
// })

//view engine
app.set('view engine','ejs');
//folder for the views
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set the static path
app.use(express.static(path.join(__dirname,'public')));

var users=[

	{
		id:1,
		first_name:'john',
		last_name:'Doe',
		email:'johndoe@gmail.com'
	},
	{
		id:2,
		first_name:'bob',
		last_name:'Smith',
		email:'bobsmith@gmail.com'
	},
	{
		id:3,
		first_name:'Jill',
		last_name:'Jackson',
		email:'jilljackson@gmail.com'
	}
]


app.get('/',(req,res)=>{
	res.render('index',{title:'customers',users:users})
})

//handle the post request from the index.ejs form
app.post('/users/add',(req,res)=>{
	var newUser={
		first_name:req.body.first_name,
		last_name :req.body.last_name,
		email :req.body.email
	}

	res.send(newUser);
})

app.listen(3004,()=>{
	console.log("Server running on port 3000");
})