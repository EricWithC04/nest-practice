import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Array<Car> = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Compass'
        },
    ]

    findAll() {
        return this.cars
    }

    findById(id: string) {
        const car = this.cars.find(car => car.id === id)
        
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`)
    
        return car    
    }

    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( newCar )

        return {
            message: 'New car created successfully',
            newCar
        }
    }

    update(id: string, updateCarDto: UpateCarDto) {
        let updatedCar = this.findById(id)

        if (!updatedCar) throw new NotFoundException(`Car with id '${id}' not found`)

        if (updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`The ids are differents`)

        this.cars = this.cars.map( car => {
            if (car.id === id) {
                return {
                    ...car,
                    ...updateCarDto
                }
            }
            return car
        })

        return updatedCar
    }
}
