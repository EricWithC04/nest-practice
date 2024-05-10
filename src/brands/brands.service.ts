import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Array<Brand> = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: Date.now()
    },
    {
      id: uuid(),
      name: 'Jeep',
      createdAt: Date.now()
    },
    {
      id: uuid(),
      name: 'Honda',
      createdAt: Date.now()
    },
  ]

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: Date.now()
    }

    this.brands.push(newBrand)

    return {
      message: 'New brand created successfully',
      newBrand
    };
  }

  findAll() {
    return this.brands;
  }

  findById(id: string) {
    const brand = this.brands.find(brand => brand.id === id)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: string) {
    return `This action removes a #${id} brand`;
  }
}
