import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string ) {
        return this.carsService.findById(id)
    }

    @Post()
    createCar( @Body() body: any ) {
        return body
    }

    @Patch(":id")
    updateCar(@Body() body: any) {
        return body
    }

    @Delete(":id")
    deleteCar(@Param('id') id: string) {
        return {
            message: `Car with id '${id}' was deleted`,
        }
    }
}
