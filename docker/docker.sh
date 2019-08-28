export APPLICATION___NAME=${APPLICATION___NAME:-nextjs-rest-mongodb}
export NODE_PORT=${NODE_PORT:-3000}

MONGO_DB_NAME=${MONGO_DB_NAME:-nextjsrest}
export MONGODB_URL=${MONGO_URL:-mongodb://mongo:27017/$MONGO_DB_NAME}
