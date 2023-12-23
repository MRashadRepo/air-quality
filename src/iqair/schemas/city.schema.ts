import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

export interface PollutionDataType {
  Result: {
    Pollution: {
      aqicn: number;
      mainus: string;
      ts: Date;
      aqius: number;
      maincn: string;
    };
  };
}
@Schema()
export class City {
  @Prop({ type: Object })
  pollutionData: PollutionDataType;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
