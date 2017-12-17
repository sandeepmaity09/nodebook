var express = require('express');
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');

var app = express();
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3000);

var tours = [
	{id:0,name:'Hood River',price:99.99},
	{id:1,name:'Oregon Coast',price:149.93}
]

app.use(express.static(__dirname+'/public'));

app.get('/',function(request,response){
	response.render('home');
})

app.get('/about',function(request,response){
	response.render('about',{
		fortune:'Sandeep Maity'
	});
})

app.get('/error',function(request,response){
	response.status(500);
	response.render('error');
})

app.get('/greetings',function(request,response){
	response.render('about',{
		message:'Welcome',
		style:request.query.style,
		userid:request.cookie.userid,
		username:request.session.username
	})
})

app.get('/api/tours',function(request,response){
	response.json(tours);
})

// the following layout doesn't have a layout file, so views/no-layout.handerbars
// must include all necessary html
app.get('/no-layout',function(request,response){
	response.render('no-layout',{layout:null});
})

app.get('/custom-layout',function(request,response){
	response.render('custom-layout',{layout:'custom'});
})

app.post('/process-contact',function(request,response){
	console.log('Received contact from ' + request.body.name + ' <' + request.body.email + '>');
	try{
		return response.xhr ? response.render({success:true}):response.redirect(303,'/thank-you');
	} catch (error){
		return response.xhr ? response.json({error:'Database-error'}):response.redirect(303,'/database-error');
	}
})

// app.get('/api/toors',function(request,response){
// 	var toursXml = '<?xml version="1.0"?><tours>' + 
// 		products.map(function(p){ return '<tour price="' + p.price + '" id="' + p.id +'">' +p.name + '</tour>' }).join('') + '</tours>';
		

// 		var toursText = tours.map(function(p){ return p.id + ': ' + p.name + ' (' + p.price ')' }).join('\n');
// 		response.format({
// 			'application/json':function(){
// 				response.json(tours);
// 			},
// 			'application/xml':function(){
// 				response.type('application/xml');
// 				response.send(toursXml);
// 			},
// 			'text/xml':function(){
// 				response.type('text/xml');
// 				response.send(toursXml);
// 			},
// 			'text/plain':function(){
// 				response.type('text/plain');
// 				response.sen(toursXml);
// 			}
// 		})
// 	});

// app.get('/api/tours', function(req, res){
// var toursXml = '<?xml version="1.0"?><tours>' +
// products.map(function(p){
// return '<tour price="' + p.price +
// '" id="' + p.id + '">' + p.name + '</tour>';
// }).join('') + '</tours>';
// var toursText = tours.map(function(p){
// return p.id + ': ' + p.name + ' (' + p.price + ')';
// }).join('\n');
// res.format({'application/json': function(){
// res.json(tours);
// },
// 'application/xml': function(){
// res.type('application/xml');
// res.send(toursXml);
// },
// 'text/xml': function(){
// res.type('text/xml');
// res.send(toursXml);
// }
// 'text/plain': function(){
// res.type('text/plain');
// res.send(toursXml);
// }
// });
// });


app.get('/headers',function(request,response){
	response.set('Content-type','text/plain');
	response.set('name','Sandeep Maity');
	var s = '';
	for(var name in request.headers)
		s += name + ':' + request.headers[name] +'\n';
	// request :- instance of http.IncomeMessage
	// request.params 
	// request.param(name)
	// request.query
	// request.body // for post calls 
	// request.route // information about the currently matched route
	// request.cookies/request.signedCookies
	// request.headers
	// request.accepts([types])
	// request.ip
	// request.path  // the req path without protocol,host,port query
	// request.xhr // true if the call is ajax
	// request.protocol
	// request.secure // if req.protocol === 'https'
	// request.acceptedLanguages
	// request.session // for session values

	// response :- instance of http.ServerResponse
	// response.status :- HTTP status code
	// response.set(name,value): :- set a key value pair for response
	// response.cookie(name,value,[options]) , res.clearCookie(name,[options])
	// response.redirect([status],url)
	// response.send(body), response.send(status,body);
	// response.json(json), response.json(status,json);
	// response.jsonp(json), response.jsonp(status,json);
	// response.type(type);
	// response.format(object);
	// response.attachment([filename]), response.download(path,[filename],[callback])
	// response.sendFile(path,[options],[callback])
	// response.links(links)
	// response.locals, res.render(view,[locals],callback)

	response.send(s);
})

// app.post('/process-contact',function(request,response){
// 	// response.send(request.body);
// 	console.log('Received contact from ' + request.body.name + ' <' + request.body.email + ' >')
// 	response.redirect(303,'/thank-you');
// })



// this should appear AFTER all of the routes even if doesn't need the 'next'
// but it must be included for express to recognize this as an error handler
app.use(function(error,request,response,next){
	console.error(error.stack);
	response.status(500).render('error');
})

app.use(function(request,response){
	response.status(404).render('404');
})

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.');
})

