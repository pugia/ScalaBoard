var express = require('express')
	, sassMiddleware = require('node-sass-middleware')
	, sizeOf = require('image-size')
	,	multer  = require('multer')
	,	storage = multer.diskStorage({
		  destination: function (req, file, cb) {
		    cb(null, 'assets/upload')
		  },
		  filename: function (req, file, cb) {
			  var re = /(?:\.([^.]+))?$/;
			  var ext = re.exec(file.originalname)[0];
			  
				var re = /@(\d)x/;
			  var ret = re.exec(file.originalname)[0];
			  
		    cb(null, Date.now() + ret + ext );
		  }
		})
	,	upload = multer({ storage: storage })


var app = express()

app.use('/css', sassMiddleware({
  src: __dirname + '/sass',
  dest: __dirname + '/assets/css',
  debug: true,
  outputStyle: 'expanded'
}));

app.use('/', express.static('assets'));
app.use('/bower_components', express.static('bower_components'));

app.post('/profile', upload.single('file'), function (req, res, next) {
  
  var data = {
	  filename: req.file.filename,
	  data: sizeOf('assets/upload/'+req.file.filename)
  }
  
  res.send(data);
  
})

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});