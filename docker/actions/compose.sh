#!/bin/bash

. ./docker.sh
docker-compose -p ${APPLICATION___NAME} -f ./docker-compose.yml $@
