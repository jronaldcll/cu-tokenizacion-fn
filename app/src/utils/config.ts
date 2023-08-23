require('dotenv').config();
const env = process.env.ENVIRONMENT || 'local'
const configsEnviroment = {
  dev: {
    SECRET_JWT: process.env.SECRET_JWT,
  },
  pre: {
  },
  pre1a: {
  },
  prod: {
  }
}

export class ConfigService {
  get(key: string): string {
    const configs = configsEnviroment[env === 'local' ? 'dev' : env]
    if (configs.hasOwnProperty(key)) {
      return configs[key]
    }
  }
}

