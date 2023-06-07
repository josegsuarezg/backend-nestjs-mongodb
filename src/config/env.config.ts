
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_URI,
    port: process.env.PORT || 3001,
    jwt_secret: process.env.JWT_SECRET,
});