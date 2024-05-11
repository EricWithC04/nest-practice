import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';

import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly carsService: CarsService
  ) {}

  populateDB() {

    this.carsService.fillCarsWithSeedData( CARS_SEED )

    return 'Seeds executed successfully'
  }

}
