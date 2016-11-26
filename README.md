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
