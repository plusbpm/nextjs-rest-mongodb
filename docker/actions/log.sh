#!/bin/bash

actions/compose.sh logs -f --tail=2 $@
