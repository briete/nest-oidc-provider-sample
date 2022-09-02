import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OidcService } from './oidc.service';

@Controller('oidc')
export class OidcController {
  constructor(private oidcService: OidcService) {}

  @All('/*')
  public mountedOidc(@Req() req: Request, @Res() res: Response): void {
    req.url = req.originalUrl.replace('/oidc', '');
    const callback = this.oidcService.oidcProvider.callback();
    return callback(req, res);
  }
}
