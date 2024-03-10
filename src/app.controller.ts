import { Controller, Get, Header, Res, StreamableFile } from "@nestjs/common";
import { AppService } from './app.service';
import { Response } from "express";
import * as fs from "fs";
import { join } from 'path';
import { createReadStream } from "fs";

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
