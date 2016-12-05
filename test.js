var sp = require('./SParser.js');
var fg = require('./FactoryGirl.js');

sp.log_human_readable_result(false);

var prof_guard = fg.professions('Guard');
var prof_spy = fg.professions('Spy');
var prof_cook_fisher = fg.professions('Cook', 'Fishmonger');

var lascarian_guard_75_villon = new fg.FactoryGirl({
  xp_sum: 75,
  hp: 35,
  mp: 120,
  professions: prof_guard,
  strain: 'Lascarian'
})
var genjian_cook_fisher_150_shepherd = new fg.FactoryGirl({
  xp_sum: 150,
  hp: 10,
  mp: 10,
  professions: prof_cook_fisher,
  strain: 'Genjian'
})
var plain_200_overlord = new fg.FactoryGirl({
  xp_sum: 200,
  hp: 60
})
var plain_200_gearhead = new fg.FactoryGirl({
  xp_sum: 200,
  hp: 100
})
var psionist_200_thoughtbender = new fg.FactoryGirl({
  xp_sum: 200,
  mp: 50,
  professions: ['Psionist']
})
var plain_200_veteran = new fg.FactoryGirl({
  xp_sum: 200
})
var printer_200_sage = new fg.FactoryGirl({
  xp_sum: 200,
  mp: 50,
  professions: ['Jones']
})


var apo_templar = new sp.SParser(`
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p Priest) 
        (p (Guard Officer))))`);
var avontuur = new sp.SParser(`
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p (Gambler Scavenger Teacher Jones))))`)
var bone_breaker = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (p (Thug Pugilist))))`)
var entrepreneur = new sp.SParser(` 
  (and ((not (s "The Red Star")) 
        (xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Caravan Driver" "Hook-Up" Merchant Publican))))`)
var free_radical = new sp.SParser(` 
  (and ((s Retrograde) 
        (xp_sum 100) 
        (stat_sum hp_or_mp 50)))`)
var g_man = new sp.SParser(` 
  (and ((or ((s "Pure Blood") 
             (k "Lore - Strain - Pure Blood"))) 
        (xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        (k Literacy) 
        (k "Lore - Pre-Fall History Modern") 
        (k (Torture Interrogate))))`)
var gear_head = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50) 
        ((or (p (Caravan Driver "Hook-Up" Merchant Engineer "Mad Scientist")) 
             (s ("Diesel Jock" Rover)))) 
        (k ("Building Tomorrow" Brewing "Forging the Future"))))`)
var grave_robber = new sp.SParser(` 
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50)
        (p (Doctor Sawbones)) 
        (p (Scavenger Thief Assassin Jones))))`)
var marksman = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50)
        (p (Sniper "Gun Slinger"))))`)
var mercenary = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum hp_or_mp 50)
        (p (Soldier Guard Officer Hunter))))`)
var merican_badass = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum hp 50) 
        (s Merican)
        (p Priest) 
        (p (Guard Officer "Gun Slinger" Hunter Primitive Pugilist Soldier Thug))))`)
var mind_killer = new sp.SParser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 50) 
        (k "Mind Resistance")))`)
var monk = new sp.SParser(` 
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Martial Artist" Priest))))`)
var mountebank = new sp.SParser(` 
  (and ((xp_sum 100) 
        (stat_sum mp 100) 
        (p (Charlatan Gambler Merchant Politician))))`)
var nephilim = new sp.SParser(` 
  (and ((xp_sum 200) 
        (stat_sum mp 50) 
        (s ("Nation of Accensor" Remnant))))`)
var oni = new sp.SParser(` 
  (and ((xp_sum 100)  
        (stat_sum hp_or_mp 50)
        (s "Red Star") 
        (p Priest) 
        (p (Guard Officer "Gun Slinger" Primitive Soldier))))`)
var overlord = new sp.SParser(`
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p (Assassin Doctor Gambler "Mad Scientist" "Ring Leader" Engineer)) 
        (p (Charlatan Entertainer Politician Priest Teacher))))`)
var reaper = new sp.SParser(` 
  (and ((xp_sum 100)
        (p ("Gun Slinger" Hunter Primitive Soldier))))`)
var sage = new sp.SParser(`
  (and ((xp_sum 100) 
        (stat_sum mp 50) 
        (p (Jones Printer Teacher)) 
        (lore_type 4)))`);
var saint = new sp.SParser(` 
  (and ((xp_sum 100)
        (or ((p (Cook Doctor Priest Teacher))  
             (s "Nation of Accensor"))) 
        ((not (s "The Red Star")))))`)
var shadow = new sp.SParser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 50)
        (p (Assassin Thief Spy))))`)
var shepherd = new sp.SParser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_or_mp 100) 
        (p (Cook Brewer Teacher Entertainer Farmer Fishmonger))))`)
var survivor = new sp.SParser(` 
  (and ((xp_sum 200) 
        (stat_sum hp_and_mp 100)))`)
var techno_savant = new sp.SParser(`
  (and ((xp_sum 100)
        (stat_sum hp_or_mp 50) 
        (p ("Mad Scientist" Tinker Engineer))))`)
var thought_bender = new sp.SParser(` 
  (and ((xp_sum 100)  
        (stat_sum mp 50) 
        (p Psionist) 
        (psionic_type advanced 2)))`)
var veteran = new sp.SParser(` 
  (and ((xp_sum 200)
        (k "Lore - Local Area")))`)

var villon = new sp.SParser(`
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

overlord
  .expect(false, plain_200_overlord)
  .expect(true,  plain_200_overlord
                   .add_profession('Mad Scientist')
                   .add_profession('Politician'))
  .expect(false, plain_200_overlord
                   .add_profession('Charlatan'))

gear_head
  .expect(false, plain_200_gearhead)
  .expect(true,  plain_200_gearhead
                   .modify('skills', ['Brewing'])
                   .add_profession('Merchant'))
  .expect(true,  plain_200_gearhead
                   .modify('skills', ['Brewing'])
                   .modify('strain', 'Rover'))
  .expect(false, plain_200_gearhead
                   .modify('skills', ['Forging the Future']))

thought_bender
  .expect(false, psionist_200_thoughtbender)
  .expect(true,  psionist_200_thoughtbender
                   .modify('psionic_advanced', 4))
  .expect(false, psionist_200_thoughtbender
                   .modify('psionic_intermediate', 4))
  .expect(false,  psionist_200_thoughtbender
                   .modify('psionic_advanced', 3)
                   .modify('hp', 50)
                   .modify('mp', 30))

sage
  .expect(false, printer_200_sage)
  .expect(true,  printer_200_sage
                   .modify('lore_count', 4))

entrepreneur
  .expect(false, plain_200_gearhead)
process.exit(0);