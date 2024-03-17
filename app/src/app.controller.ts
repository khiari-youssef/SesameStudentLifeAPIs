import {Controller, Get, Header, Res, StreamableFile, UseGuards} from "@nestjs/common";
import {Response} from "express";
import {createReadStream} from "fs";
import {join} from 'path';
import {AuthGuard, SesameRoles} from "../../users-management/src/infrastructure/security/AuthGuard";
import {SesameRole, SesameRoleLabel, StudentRole} from "../../users-management/src/domain/entities/SesameRole";

@Controller('/')
export class AppController {
  constructor() {}

  @Header('Content-Type', 'image/png; charset=none')
  @Get()
  async getSesameApp(@Res({passthrough : true}) res : Response) : Promise<StreamableFile> {
    const path = `./assets/logo.png`
    console.log(path)
    const file = createReadStream(join(process.cwd(), '/assets/logo.png'));
    if (file.errored == null) {
      res.status(200)
      return new StreamableFile(file);
    } else {
      res.status(404)
      return null
    }
  }

  @SesameRoles(SesameRoleLabel.Student)
  @UseGuards(AuthGuard)
  @Get('test')
  async testAuth() {
      return "ok"
  }
}
