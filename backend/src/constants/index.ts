import logger from '../utils/logger';

export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  logger.error('No mongo connection string. Set MONGODB_URL environment variable.');
  process.exit(1);
}
