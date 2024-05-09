import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars = ['Toyota', 'Honda', 'Jeep'] 

    @Get()
    getAllCars() {
        return this.cars
    }

    @Get(':id')
    getCarById( @Param('id') id: string ) {
        if (+id >= this.cars.length || +id < 0) {
            return { message: 'Car not found' }
        } else {
            return this.cars[+id]
        }
    }

}
