import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, map, Observable } from 'rxjs';
import { NearestCityDto } from '../dto';
import { City, CityDocument } from '../schemas';

@Injectable()
export class IqairService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {}

  /**
   * Get the air quality with respect to longitude and latitude
   * @param nearestCityDto
   * @returns
   */
  getAirQualityByCoordinates = (
    coordinatesDto: NearestCityDto,
  ): Observable<any> => {
    const baseUrl = this.configService.get('IQAIR_API_URL');
    const apiKey = this.configService.get('API_KEY');

    return this.httpService
      .get(
        `${baseUrl}?lat=${parseInt(coordinatesDto.latitude)}&lon=${parseInt(
          coordinatesDto.longitude,
        )}&key=${apiKey}`,
      )
      .pipe(
        map((response) => ({
          Result: {
            Pollution: response.data.data.current.pollution,
          },
        })),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  };

  /**
   * Save city pollution's data
   * @param pollutionData
   */
  savePollutionData = (pollutionData: object) => {
    this.cityModel
      .create({
        pollutionData: pollutionData,
      })
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
  };

  getMostPollutedDateTime = async () => {
    const data = await this.cityModel.find();
    let maxAqicn = data[0].pollutionData.Result.Pollution.aqicn;
    let dateTimeMax = data[0].createdAt;
    data.forEach((p) => {
      const currentAqicn = p.pollutionData.Result.Pollution.aqicn;
      if (currentAqicn > maxAqicn) {
        maxAqicn = currentAqicn;
        dateTimeMax = p.createdAt;
      }
    });

    return dateTimeMax;
  };
}
