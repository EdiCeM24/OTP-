import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
  PORT, 
  NODE_ENV, 
  JWT_SECRET_KEY, 
  JWT_REFRESH_SECRET_KEY, 
  JWT_EXPIRES_IN, 
  EMAIL_USER, 
  EMAIL_PASS,
  DATABSE_NAME,
  DATABSE_USERNAME,
  DATABSE_PASSWORD,
} = process.env