var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.send(JSON.stringify(data));
};

exports.collectData = function(request, callback){
  var data = "";
  console.log('-------------> this function has run at all');
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(JSON.parse(data));
  });
};


exports.CORS = function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "content-type, accept");

  next();
};

exports.interceptOptions = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200).send();
  } else {
    next();
  }
};

exports.getInfo = function(req, res, next) {
  console.log('METHOD: ', req.method)
  next();
};