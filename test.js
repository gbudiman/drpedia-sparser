// var http = require('http');
// var server = http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('Hello World');
// }).listen(process.env.PORT || 2999, process.env.IP || '127.0.0.1');
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
var prof_cook_fisher = fg.professions('Cook', 'Fishmonger');

var lascarian_guard_75_villon = fg.new({
  xp_sum: 75,
  hp: 35,
  mp: 120,
  professions: prof_guard,
  strain: 'Lascarian'
})
var genjian_cook_fisher_150_shepherd = fg.new({
  xp_sum: 150,
  hp: 10,
  mp: 10,
  professions: prof_cook_fisher,
  strain: 'Genjian'
})


var apo_templar = new s_parser(`
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p Priest) 
        (p (Guard Officer))))`);
var avontuur = new s_parser(`
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p (Gambler Scavenger Teacher Jones))))`)
var bone_breaker = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p (Thug Pugilist))))`)
var entrepreneur = new s_parser(` 
  (and ((not (s "The Red Star")) 
        (xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Caravan Driver" "Hook-Up" Merchant Publican))))`)
var free_radical = new s_parser(` 
  (and ((s Retrograde) 
        (xp_sum 100) 
        (stat_sum hp_or_mp 50)))`)
var g_man = new s_parser(` 
  (and ((or ((s "Pure Blood") 
             (k "Lore - Strain - Pure Blood"))) 
        (xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (k Literacy) 
        (k "Lore - Pre-Fall History Modern") 
        (k (Torture Interrogate))))`)
var gear_head = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        ((or (p (Caravan Driver "Hook-Up" Merchant Engineer "Mad Scientist")) 
             (s ("Diesel Jock" Rover)))) 
        (k ("Building Tomorrow" Brewing "Forging the Future"))))`)
var grave_robber = new s_parser(` 
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50)
        (p (Doctor Sawbones)) 
        (p (Scavenger Thief Assassin Jones))))`)
var marksman = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50)
        (p (Sniper "Gun Slinger"))))`)
var mercenary = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50)
        (p (Soldier Guard Officer Hunter))))`)
var merican_badass = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum hp 50) 
        (s Merican)
        (p Priest) 
        (p (Guard Officer "Gun Slinger" Hunter Primitive Pugilist Soldier Thug))))`)
var mind_killer = new s_parser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 50) 
        (k "Mind Resistance")))`)
var monk = new s_parser(` 
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Martial Artist" Priest))))`)
var mountebank = new s_parser(` 
  (and ((xp_sum 100) 
        (stat_sum mp 100) 
        (p (Charlatan Gambler Merchant Politician))))`)
var nephilim = new s_parser(` 
  (and ((xp_sum 200) 
        (stat_sum mp 50) 
        (s ("Nation of Accensor" Remnant))))`)
var oni = new s_parser(` 
  (and ((xp_sum 100)  
        (stat_sum hp_or_mp 50)
        (s "Red Star") 
        (p Priest) 
        (p (Guard Officer "Gun Slinger" Primitive Soldier))))`)
var overlord = new s_parser(`
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p (Assassin Doctor Gambler "Mad Scientist" "Ring Leader" Engineer)) 
        (p (Charlatan Entertainer Politician Priest Teacher))))`)
var reaper = new s_parser(` 
  (and ((xp_sum 100)
        (p ("Gun Slinger" Hunter Primitive Soldier))))`)
var sage = new s_parser(`
  (and ((xp_sum 100) 
        (stat_sum mp 50) 
        (p (Jones Printer Teacher)) 
        (k (lore_type 4))))`)
var saint = new s_parser(` 
  (and ((xp_sum 100)
        (or ((p (Cook Doctor Priest Teacher))  
             (s "Nation of Accensor"))) 
        ((not (s "The Red Star")))))`)
var shadow = new s_parser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 50)
        (p (Assassin Thief Spy))))`)
var shepherd = new s_parser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 100) 
        (p (Cook Brewer Teacher Entertainer Farmer Fishmonger))))`)
var survivor = new s_parser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_and_mp 100)))`)
var techno_savant = new s_parser(`
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Mad Scientist" Tinker Engineer))))`)
var thought_bender = new s_parser(` 
  (and ((xp_sum 100)  
        (stat_sum mp 50) 
        (p Psionist) 
        (k (psionic_type advanced 2))))`)
var veteran = new s_parser(` 
  (and ((xp_sum 200)
        (k "Lore - Local Area")))`)

var villon = new s_parser(`
  (and ((xp_sum 100) 
        (p (Thief Assassin Spy))))`)


shepherd
  .expect(false, genjian_cook_fisher_150_shepherd)
  .expect(true,  genjian_cook_fisher_150_shepherd
                   .modify('xp_sum', 200)
                   .modify('hp', 100))

villon
  .expect(false, lascarian_guard_75_villon)
  .expect(true,  lascarian_guard_75_villon
                   .modify('xp_sum', 125)
                   .modify('professions', prof_spy))
  .expect(false, lascarian_guard_75_villon
                   .modify('xp_sum', 101));

process.exit(0);