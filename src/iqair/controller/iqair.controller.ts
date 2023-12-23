import { Controller, Get, Query } from '@nestjs/common';
import { IqairService } from '../service/iqair.service';
import { NearestCityDto } from '../dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('iqair')
export class IqairController {
  constructor(private iqairService: IqairService) {}

  /**
     * @api {get} /air-quality Returns Air Quality with respect to zone
     * @apiName GetAirQuality
     * @apiGroup NearestCity
     *
     * @apiParam {Number} latitude.
     * @apiParam {Number} longitude.

     *
     * @apiSuccess {Object} pollutionData City pollution data.
    */
  @Get('/air-quality')
  getAirQualityByCoordinates(@Query() coordinatesDto: NearestCityDto) {
    return this.iqairService.getAirQualityByCoordinates(coordinatesDto);
  }

  /**
     * @api {get} /highly-polluted Returns datetime when the city has high pollution
     * @apiName GetDateTime
     * @apiGroup NearestCity
     *
    
     *
     * @apiSuccess {Date} the dateTime when the pollution in city is highly populated
    */
  @Get('/highly-polluted')
  getMostPollutedDateTime() {
    return this.iqairService.getMostPollutedDateTime();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async getAirQuality() {
    const parisCoordinate: NearestCityDto = {
      latitude: '48.856613',
      longitude: '2.352222',
    };

    this.iqairService
      .getAirQualityByCoordinates(parisCoordinate)
      .subscribe((data) => {
        this.iqairService.savePollutionData(data);
      });
  }
}
