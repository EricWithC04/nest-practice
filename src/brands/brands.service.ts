import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Array<Brand> = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: Date.now()
    // },
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
    const brand = this.brands.find(brand => brand.id === id)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        return {
          ...brand,
          ...updateBrandDto,
          updatedAt: Date.now()
        }
      }
      return brand
    })

    return {
      message: 'Brand updated successfully',
      brand
    }
  }

  remove(id: string) {
    const brand = this.brands.find(brand => brand.id === id)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    this.brands = this.brands.filter(brand => brand.id !== id)

    return {
      message: "Brand deleted successfully",
      brand
    }
  }

  fillBrandsWithSeedData( brands: Array<Brand> ) {
    this.brands = brands
  }
}
