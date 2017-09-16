#!/usr/bin/env bash
cd dist
echo "OK"
git init
git config user.name "ivan tsai"
git config user.email "oscar60310@gmail.com"
git add .
git commit -m "Deploy commit $ID to github page $DATE"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
