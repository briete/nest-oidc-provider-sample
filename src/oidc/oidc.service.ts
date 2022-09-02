import { Injectable } from '@nestjs/common';
import { EnvService } from '../config/env.service';
import { Provider } from 'oidc-provider';
import { DynamoDBAdapter } from '../adapter/dynamodb-adapter';
import { configuration } from '../config/support/oidc-configuration';

@Injectable()
export class OidcService {
  constructor(private envService: EnvService) {}

  get oidcProvider(): Provider {
    return new Provider(`http://localhost:${this.envService.Port}`, {
      adapter: DynamoDBAdapter,
      ...configuration,
    });
  }
}
