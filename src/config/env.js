import detenv from 'dotenv';
detenv.config();

const config = {
    port: process.env.PORT || 4000, 
};

export default config;
