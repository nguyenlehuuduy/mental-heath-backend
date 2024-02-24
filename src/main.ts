import { NestFactory } from "@nestjs/core";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";
declare const module: any;
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.enableCors({ origin: "*" });
  app.setGlobalPrefix("api");
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log("status server: ", process.env.NODE_ENV);
}
bootstrap();
