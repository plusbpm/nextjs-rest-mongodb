#!/bin/bash

APP_NAME_FROM_PACKAGE_JSON=`python -c 'import json; print(json.loads(open("../package.json", "r").read()).get("name", ""))'`
APP_NAME_FALLBACK=${APP_NAME_FROM_PACKAGE_JSON:-unnamed-app}
export APPLICATION___NAME=${APPLICATION___NAME:-$APP_NAME_FALLBACK}

ACTION_NAME=$1
ACTION_NAME=${ACTION_NAME:-up}

[[ $# -gt 0 ]] && shift

actions/$ACTION_NAME.sh $@
