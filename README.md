# Parsing Example

```javascript
const sp = require('./SParser.js');
const fg = require('./FactoryGirl.js');

// Set up FactoryGirl
// In practice, your app is responsible in providing
//   FactoryGirl object to the SParser
var genjian_cook = new fg.FactoryGirl({
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
```

The first test above will yield the following

```
✗ All of the following:
   ✓ None of the following:
       ✗ Strain: The Red Star
   ✓ Any one of the following:
       ✗ Strain: Nation of Accensor
       ✓ Profession: Cook, Doctor, Priest, Teacher
   ✗ XP >= 100
false
```

Once we fix it:
```
✓ All of the following:
   ✓ None of the following:
       ✗ Strain: The Red Star
   ✓ Any one of the following:
       ✗ Strain: Nation of Accensor
       ✓ Profession: Cook, Doctor, Priest, Teacher
   ✓ XP >= 100
true
```

# BNF Grammar

```
list ::
  true
  false
  and           list                 -> bool
  or            list                 -> bool
  not           bool                 -> bool
  xp_sum        num                  -> bool
  stat_sum      enum                 -> bool
                :: hp
                :: hp_or_mp
                :: mp
  s             lit/list             -> bool
  p             lit/list             -> bool
  k             lit/list             -> bool
  psionic_type  enum           num   -> bool
                ::basic
                ::intermediate
                ::advanced
  lore_type     num                  -> bool
