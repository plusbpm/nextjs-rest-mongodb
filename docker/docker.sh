APP_NAME=`python -c 'import json; print(json.loads(open("../package.json", "r").read()).get("name", ""))'`

export APPLICATION___NAME=${APP_NAME:-unnamed-app}

. ../env.sh
