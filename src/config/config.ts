import * as dotenv from "dotenv";

export abstract class ConfigServer {
  constructor() {
    // Obtener el entorno actual
    const nodeEnv = this.nodeEnv;
    
    // Construir la ruta del archivo .env correspondiente al entorno actual
    const envPath = this.createPathEnv(nodeEnv);

    // Cargar las variables de entorno desde el archivo .env
    dotenv.config({ path: envPath });
  }

  public getEnvironment(k: string): string | undefined {
    return process.env[k];
  }

  public getNumberEnv(k: string): number {
    const value = this.getEnvironment(k);
    if (value === undefined) {
      throw new Error(`Environment variable ${k} is not defined`);
    }
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error(`Environment variable ${k} is not a valid number`);
    }
    return numValue;
  }

  /* public get nodeEnv(): 'development' | 'production' {
    const env = process.env.NODE_ENV?.trim().toLowerCase();
    if (env === 'development' || env === 'production') {
      return env;
    }
    throw new Error(`Invalid NODE_ENV value: ${env}`);
  } */

  /* public createPathEnv(path: 'development' | 'production'): string {
    const envFileName = `.env.${path}`;
    return envFileName;
  } */

  public get nodeEnv(): string{
    const env = process.env.NODE_ENV?.trim().toLowerCase()
    if (env) {
        return env
    }
    throw new Error(`NODE_ENV is not defined`)
  }

  public createPathEnv(path: string): string{
    const envFileName = `.env.${path}`
    return envFileName;
  }
}


