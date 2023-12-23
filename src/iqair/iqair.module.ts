import { Module } from '@nestjs/common';
import { IqairController } from './controller/iqair.controller';
import { IqairService } from './service/iqair.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitySchema,
      },
    ]),
  ],
  controllers: [IqairController],
  providers: [IqairService],
})
export class IqairModule {}
