import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

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

  /**
   * Configuración del ORM para la base de datos
   * 
   * @readonly
   * @type {DataSourceOptions}
   * @memberof ConfigServer
   */
  public get typeORMConfig(): DataSourceOptions{
    return {
      type: "mysql",
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnv("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    }
  }

  public createPathEnv(path: string): string{
    const envFileName = `.env.${path}`
    return envFileName;
  }
}


