#!/bin/bash

docker-compose -p ${APPLICATION___NAME} -f ./docker-compose.yml $@
