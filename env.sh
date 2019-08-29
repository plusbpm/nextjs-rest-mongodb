MONGO_DB_NAME=${MONGO_DB_NAME:-nextjsrest}

export PORT=${PORT:-4000}
export NODE_ENV=development
export MONGODB_URL=${MONGO_URL:-mongodb://mongo:27017/$MONGO_DB_NAME}
