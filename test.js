var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello World');
}).listen(process.env.PORT || 2999, process.env.IP || '127.0.0.1');
var s_parser = require('./SParser.js');
var fg = require('./FactoryGirl.js');

// s_parser.parse('this is an error');
// s_parser.parse('(xp_sum 100)');
// s_parser.parse('( xp_sum 100)');
// s_parser.parse('(xp_sum 100 )');
// s_parser.parse('( xp_sum 100 )');
// s_parser.parse('(stat_sum hp_or_mp 100)');
// s_parser.parse('(k Parry)');
// s_parser.parse('(k (Refuse Escape Avoid Parry))');
// s_parser.parse('(k (Refuse Escape Avoid Parry) )');
// s_parser.parse('(k (Refuse Escape Avoid Parry ) )');
// s_parser.parse('(k (Refuse Escape Avoid Parry ) ) ');
// s_parser.parse(`  (and ((xp_sum 100)
//                         (stat_sum hp 50)
//                         (s Merican)
//                         (p Priest)
//                         (p (Guard Officer "Gun Slinger" Hunter Primitive Pugilist Soldier Thug))))`);
// s_parser.parse(`  (and ((xp_sum 200)
//                         (k "Lore - Local Area")))`);
// s_parser.parse(`    (and ((xp_sum 100)
//                           (or ((p (Cook Doctor Priest Teacher))
//                               (s "Nation of Accensor")))
//                           ((not (s "The Red Star")))))`);
// s_parser.parse(`
//   (and ((xp_sum 100)
//         (stat_sum mp 50)
//         (p (Jones Printer Teacher))
//         (k (class_type lore 4))))`);
// s_parser.parse('(and (xp_sum 100) (s Genjian)');
// s_parser.parse('(k "Mind Resistance")');
// s_parser.parse('(k "Super long sentence with multiple spaces")');
// s_parser.parse('(k " blankspace in front")');
// s_parser.parse('(k " blankspace at back too ")');
// s_parser.parse('(k " devil\'s advocate is at the back too ")');

// s_parser.mock({
//   xp_sum: 175,
//   hp: 35,
//   mp: 120,
//   professions: new Array('Guard', 'Hook-Up'),
//   strain: 'Lascarian'
// });

var prof_guard = fg.professions('Guard');
var prof_spy = fg.professions('Spy');
var lascarian_guard_75_villon = fg.new({
  xp_sum: 75,
  hp: 35,
  mp: 120,
  professions: prof_guard,
  strain: 'Lascarian'
})


// s_parser.parse(`
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50) 
//         (p Priest) 
//         (p (Guard Officer))))`)
// s_parser.parse(`
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50) 
//         (p (Gambler Scavenger Teacher Jones))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50) 
//         (p (Thug Pugilist))))`)
// s_parser.parse(` 
//   (and ((not (s "The Red Star")) 
//         (xp_sum 100)
//         (stat_sum hp_or_mp 50) 
//         (p ("Caravan Driver" "Hook-Up" Merchant Publican))))`)
// s_parser.parse(` 
//   (and ((s Retrograde) 
//         (xp_sum 100) 
//         (stat_sum hp_or_mp 50)))`)
// s_parser.parse(` 
//   (and ((or ((s "Pure Blood") 
//              (k "Lore - Strain - Pure Blood"))) 
//         (xp_sum 100) 
//         (stat_sum hp_or_mp 50) 
//         (k Literacy) 
//         (k "Lore - Pre-Fall History Modern") 
//         (k (Torture Interrogate))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50) 
//         ((or (p (Caravan Driver "Hook-Up" Merchant Engineer "Mad Scientist")) 
//              (s ("Diesel Jock" Rover)))) 
//         (k ("Building Tomorrow" Brewing "Forging the Future"))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)
//         (stat_sum hp_or_mp 50)
//         (p (Doctor Sawbones)) 
//         (p (Scavenger Thief Assassin Jones))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50)
//         (p (Sniper "Gun Slinger"))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum hp_or_mp 50)
//         (p (Soldier Guard Officer Hunter))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum hp 50) 
//         (s Merican)
//         (p Priest) 
//         (p (Guard Officer "Gun Slinger" Hunter Primitive Pugilist Soldier Thug))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200) 
//         (stat_sum hp_or_mp 50) 
//         (k "Mind Resistance")))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)
//         (stat_sum hp_or_mp 50) 
//         (p ("Martial Artist" Priest))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100) 
//         (stat_sum mp 100) 
//         (p (Charlatan Gambler Merchant Politician))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200) 
//         (stat_sum mp 50) 
//         (s ("Nation of Accensor" Remnant))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)  
//         (stat_sum hp_or_mp 50)
//         (s "Red Star") 
//         (p Priest) 
//         (p (Guard Officer "Gun Slinger" Primitive Soldier))))`)
// s_parser.parse(`
//   (and ((xp_sum 100)
//         (stat_sum hp_or_mp 50) 
//         (p (Assassin Doctor Gambler "Mad Scientist" "Ring Leader" Engineer)) 
//         (p (Charlatan Entertainer Politician Priest Teacher))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)
//         (p ("Gun Slinger" Hunter Primitive Soldier))))`)
// s_parser.parse(`
//   (and ((xp_sum 100) 
//         (stat_sum mp 50) 
//         (p (Jones Printer Teacher)) 
//         (k (lore_type 4))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)
//         (or ((p (Cook Doctor Priest Teacher))  
//              (s "Nation of Accensor"))) 
//         ((not (s "The Red Star")))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200) 
//         (stat_sum hp_or_mp 50)
//         (p (Assassin Thief Spy))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200) 
//         (stat_sum hp_or_mp 100) 
//         (p (Cook Brewer Teacher Entertainer Farmer Fishmonger))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200) 
//         (stat_sum hp_and_mp 100)))`)
// s_parser.parse(`
//   (and ((xp_sum 100)
//         (stat_sum hp_or_mp 50) 
//         (p ("Mad Scientist" Tinker Engineer))))`)
// s_parser.parse(` 
//   (and ((xp_sum 100)  
//         (stat_sum mp 50) 
//         (p Psionist) 
//         (k (psionic_type advanced 2))))`)
// s_parser.parse(` 
//   (and ((xp_sum 200)
//         (k "Lore - Local Area")))`)
// s_parser.parse(`
//   (and ((xp_sum 100) 
//         (p (Thief Assassin Spy))))`)

var villon = s_parser.set(`
  (and ((xp_sum 100) 
        (p (Thief Assassin Spy))))`)

villon.set_verbose(5)
  .expect(false, lascarian_guard_75_villon)
  .expect(true,  lascarian_guard_75_villon
                   .modify('xp_sum', 125)
                   .modify('professions', prof_spy))
  .expect(false, lascarian_guard_75_villon
                   .modify('xp_sum', 101));

process.exit(0);