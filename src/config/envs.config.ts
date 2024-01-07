import 'dotenv/config';

import { get } from 'env-var';

export const envs = {
  NODE_ENV: get('NODE_ENV').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  MYSQL_ROOT_PASSWORD: get('MYSQL_ROOT_PASSWORD').required().asString(),
  MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  ACCESS_TOKEN_SECRET_KEY: get('ACCESS_TOKEN_SECRET_KEY').required().asString(),
  ACCESS_TOKEN_EXPIRATION_TIME: get('ACCESS_TOKEN_EXPIRATION_TIME').required().asInt(),
  REFRESH_TOKEN_SECRET_KEY: get('REFRESH_TOKEN_SECRET_KEY').required().asString(),
  REFRESH_TOKEN_EXPIRATION_TIME: get('REFRESH_TOKEN_EXPIRATION_TIME').required().asInt(),
};
