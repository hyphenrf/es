#!/usr/bin/es

# /a/b/c.exe -> c
fn getname path {
   fin <={
     %split / <={~~ $path *.exe}
   }
}

find $(path) -maxdepth 1 -name '*.exe' -print0 >[2] /dev/null |
  for (x = ``''{cat})
  let (c = <={getname $x}) {
      whatis $c >/dev/null >[2=1] || # if a function is defined for it, do nothing
      echo fn-$c '=' \'$x\' # paths need to be quoted in case of spaces
  } >> .es-win

sed 's/=.*/=/' <.es-win >.es-win-unset # source unset when you want to remove all .exe aliases
