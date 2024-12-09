export function validateEnv() {
    const requiredEnvVars = ['OPENAI_API_KEY'];
    
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}