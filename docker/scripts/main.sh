#!/bin/bash

ACTION_NAME=$1
ACTION_NAME=${ACTION_NAME:-up}

[[ $# -gt 0 ]] && shift

actions/$ACTION_NAME.sh $@
