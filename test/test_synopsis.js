const sp = require('drpedia-sparser');
const ag = require('agentgirl');

// Set up FactoryGirl
// In practice, your app is responsible in providing
//   FactoryGirl object to the SParser
var genjian_cook = new ag.AgentGirl({
  xp_sum      : 50,
  mp          : 35,
  professions : ['Cook', 'Fishmonger', 'Spy'],
  strain      : 'Genjian'
})

// Create the SParser 
var saint = new sp.SParser(` 
  (and ((xp_sum 100)
        (or ((p (Cook Doctor Priest Teacher))  
             (s "Nation of Accensor"))) 
        ((not (s "The Red Star")))))`)

// Test the FactoryGirl against SParser
// It will fail because xp_sum must be >= 100
var out = saint.test(genjian_cook);
sp.display_human_readable_result(out);
console.log(out.result);

// Now we fix it
out = saint.test(genjian_cook.modify('xp_sum', 100))
sp.display_human_readable_result(out);
console.log(out.result);

// Use the defaults specific to Dystopia Rising
var oni = sp.load_defaults().oni;
console.log(oni.preset);

out = oni.test(genjian_cook);
sp.display_human_readable_result(out);
console.log(out.result);

out = oni.test(genjian_cook
                 .set_professions('Guard', 'Priest')
                 .modify('strain', 'The Red Star')
                 .modify('hp', 85)
                 .modify('xp_sum', 121))
sp.display_human_readable_result(out);
console.log(out.result);