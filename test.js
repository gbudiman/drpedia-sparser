var sp = require('./SParser.js');
var ag = require('agentgirl');

sp.log_human_readable_result(false);

var lascarian_guard_75_villon = new ag.AgentGirl({
  xp_sum: 75,
  hp: 35,
  mp: 120,
  professions: ['Guard'],
  strain: 'Lascarian'
})
var genjian_cook_fisher_150_shepherd = new ag.AgentGirl({
  xp_sum: 150,
  hp: 10,
  mp: 10,
  professions: ['Cook', 'Fishmonger'],
  strain: 'Genjian'
})
var plain_200_overlord = new ag.AgentGirl({
  xp_sum: 200,
  hp: 60
})
var plain_200_gearhead = new ag.AgentGirl({
  xp_sum: 200,
  hp: 100
})
var psionist_200_thoughtbender = new ag.AgentGirl({
  xp_sum: 200,
  mp: 50,
  professions: ['Psionist']
})
var plain_200_veteran = new ag.AgentGirl({
  xp_sum: 200
})
var printer_200_sage = new ag.AgentGirl({
  xp_sum: 200,
  mp: 50,
  professions: ['Jones']
})
var mericans_200_gman = new ag.AgentGirl({
  xp_sum: 200,
  hp: 80,
  skills: ['Literacy']
})


var defs = new sp.load_defaults();

defs.shepherd
  .expect(false, genjian_cook_fisher_150_shepherd)
  .expect(true,  genjian_cook_fisher_150_shepherd
                   .modify('xp_sum', 200)
                   .modify('hp', 100))

defs.villon
  .expect(false, lascarian_guard_75_villon)
  .expect(true,  lascarian_guard_75_villon
                   .modify('xp_sum', 125)
                   .modify('add_profession', 'Spy'))
  .expect(false, lascarian_guard_75_villon
                   .modify('xp_sum', 101));

defs.overlord
  .expect(false, plain_200_overlord)
  .expect(true,  plain_200_overlord
                   .add_profession('Mad Scientist')
                   .add_profession('Politician'))
  .expect(false, plain_200_overlord
                   .add_profession('Charlatan'))

defs.gear_head
  .expect(false, plain_200_gearhead)
  .expect(true,  plain_200_gearhead
                   .modify('skills', ['Brewing'])
                   .add_profession('Merchant'))
  .expect(true,  plain_200_gearhead
                   .modify('skills', ['Brewing'])
                   .modify('strain', 'Rover'))
  .expect(false, plain_200_gearhead
                   .modify('skills', ['Forging the Future']))

defs.thought_bender
  .expect(false, psionist_200_thoughtbender)
  .expect(true,  psionist_200_thoughtbender
                   .modify('psionic_advanced', 4))
  .expect(false, psionist_200_thoughtbender
                   .modify('psionic_intermediate', 4))
  .expect(false,  psionist_200_thoughtbender
                   .modify('psionic_advanced', 3)
                   .modify('hp', 50)
                   .modify('mp', 30))

defs.sage
  .expect(false, printer_200_sage)
  .expect(true,  printer_200_sage
                   .modify('lore_count', 4))

defs.entrepreneur
  .expect(false, plain_200_gearhead)

defs.g_man
  .expect(false, mericans_200_gman)

defs.survivor
  .expect(false, mericans_200_gman)
  .expect(true,  mericans_200_gman
                   .modify('mp', 20)
                   .modify('hp', 80))

var x = defs.thought_bender
          .test(psionist_200_thoughtbender
                  .modify('psionic_advanced', 4))

sp.display_human_readable_result(x);

process.exit(0);