
var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var expressValidator=require('express-validator');
var mongojs=require('mongojs');

var db=mongojs('customerapp',['users']);
var ObjectId=mongojs.ObjectId;
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

//global variables middleware

app.use((req,res,next)=>{
	res.locals.errors=[];
	next();
})

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

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

	//db
	db.users.find((err,docs)=>{
		console.log(docs);
		res.render('index',{title:'customers',users:docs})
	})
	
})

//handle the post request from the index.ejs form
app.post('/users/add',(req,res)=>{

	//set the rules

	req.checkBody('first_name','First Name is required').notEmpty();
	req.checkBody('last_name','Last Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();

	var errors=req.validationErrors();
	if(errors)
	{
		res.render('index',{
			title:'Customers',
			users:users,
			errors:errors
		});
	}
	else
	{
		var newUser={
		first_name:req.body.first_name,
		last_name :req.body.last_name,
		email :req.body.email
	}
	//insert the created user into db
	db.users.insert(newUser,(err,result)=>{
		if(err)
			console.log(err)
		//just redirect to homepage
		res.redirect('/');
	})

	}
	

	
});

//deletion router
app.delete('users/delete/:id',(req,res)=>{
	//delete user from db
	db.users.remove({_id:ObjectID(req.params.id)},(err)=>{
		if(err)
		{
			console.log(err);
		}
		res.redirect('/');
	})
});

app.listen(3004,()=>{
	console.log("Server running on port 3000");
})