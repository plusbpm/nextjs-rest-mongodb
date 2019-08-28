#!/bin/bash

actions/compose.sh stop $@
actions/compose.sh rm -f $@
actions/compose.sh build $@
