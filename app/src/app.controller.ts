import {Controller, Get, Header, Res, StreamableFile, UseGuards} from "@nestjs/common";
import {Response} from "express";
import {createReadStream} from "fs";
import {join} from 'path';
import {AuthGuard, RequirePermissions, RequireRole} from "../../users-management/src/infrastructure/security/AuthGuard";
import {SesamePermissions, SesameRoleType} from "../../users-management/src/domain/entities/SesameRole";

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

  @RequireRole(SesameRoleType.Student)
  @UseGuards(AuthGuard)
  @Get('test')
  async testAuthStudent() {
    console.log("test log")
      return "ok"
  }


  @RequireRole(SesameRoleType.Teacher)
  @RequirePermissions(SesamePermissions.USER_VIEW_PROFILE,SesamePermissions.USER_UPDATE_PROFILE)
  @UseGuards(AuthGuard)
  @Get('test2')
  async testAuthTeacher() {
    console.log("test log2")
    return "ok"
  }


  @UseGuards(AuthGuard)
  @Get('test3')
  async testAuth() {
    console.log("test log2")
    return "ok"
  }
}
