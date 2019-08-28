#!/bin/bash

actions/compose.sh up -d --remove-orphans $@
actions/log.sh $@
