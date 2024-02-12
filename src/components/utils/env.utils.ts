export enum EnvProp {
    ACTIVE_USER_EMAIL = 'ACTIVE_USER_EMAIL',
    INNACTIVE_USER_ACCOUNT= 'INNACTIVE_USER_ACCOUNT',
    DEFAULT_PASS = 'DEFAULT_PASS',
    SOLVER_API_KEY = 'SOLVER_API_KEY',
    ASSIGNED_DEFAULT_MEMBER = 'ASSIGNED_DEFAULT_MEMBER',
    EMAIL_FROM='EMAIL_FROM'
}

export default function getEnvProperty(prop: EnvProp) {
    const envProp = process.env[prop];

    if (!envProp || envProp === '') {
        throw new Error(`Cannot find env prop [${prop}]. Make sure .env file exists with this prop.`);
    }

    return envProp;
}