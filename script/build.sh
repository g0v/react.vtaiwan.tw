#!/bin/sh
rm -rf build
git clone --depth 1 -b gh-pages git@github.com:g0v/react.vtaiwan.tw.git build
rm -rf build/.git
git checkout build/.gitignore
perl -pi -e 's![^"]*(" // auto-updated on static build)!localtime().$1!e' src/utils/request.js
env NODE_ENV=production webpack
babel-node script/gen-static.js /
#ls build/*/*/index.html | perl -pe 's/build/babel-node script\/gen-static.js /; s/index.html/ | grep -v "WDS\\|HMR\\|DevTools"/' | sh
grep -lr iframe build | xargs perl -pi -e 's!<iframe.*localhost.*none.*/iframe>!!'
