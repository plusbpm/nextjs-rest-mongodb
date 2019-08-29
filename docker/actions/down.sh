#!/bin/bash

actions/compose.sh down --remove-orphans --rmi local $@
