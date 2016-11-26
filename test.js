var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello World');
}).listen(process.env.PORT, process.env.IP);
var s_parser = require('./SParser.js');

s_parser.parse('this is an error');
s_parser.parse('(xp_sum 100)');
s_parser.parse('( xp_sum 100)');
s_parser.parse('(xp_sum 100 )');
s_parser.parse('( xp_sum 100 )');
s_parser.parse('(stat_sum hp_or_mp 100)');
s_parser.parse('(k Parry)');
s_parser.parse('(k (Refuse Escape Avoid Parry))');
s_parser.parse('(k (Refuse Escape Avoid Parry) )');
s_parser.parse('(k (Refuse Escape Avoid Parry ) )');
s_parser.parse('(k (Refuse Escape Avoid Parry ) ) ');
s_parser.parse('(and (xp_sum 100) (s Genjian)');
s_parser.parse('(k "Mind Resistance")');
s_parser.parse('(k "Super long sentence with multiple spaces")');
s_parser.parse('(k " blankspace in front")');
s_parser.parse('(k " blankspace at back too ")');
s_parser.parse('(k " devil\'s advocate is at the back too ")');