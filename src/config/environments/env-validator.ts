import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * ①
 * バリデーションしたい環境変数がある場合はここに記載してください。
 * バリデーションに失敗するとアプリケーションは起動しません。
 */
export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNotEmpty()
  @IsString()
  DB_URL: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;
}

/**
 * ②
 * @param config バリデーション対象の Record<string, any>。今回は .env.development.local と 環境変数が合体したもの
 * @returns バリデーション済の Record<string, any>
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
