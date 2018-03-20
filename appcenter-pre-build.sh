#!/bin/sh
if [ ! -L ~/Documents/FacebookSDK ]; then
    echo 'Symlinking ~/Documents/FacebookSDK to Facebook SDK in repo'
    ln -s $(cd ./ios/Frameworks; pwd) ~/Documents/FacebookSDK
fi