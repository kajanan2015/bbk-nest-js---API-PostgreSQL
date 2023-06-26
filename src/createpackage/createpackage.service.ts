import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreatepackageDto } from './create-createpackage.dto';
import { UpdateCreatepackageDto } from './update-createpackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Createpackage } from './createpackage.entity';
import { Repository } from 'typeorm';
import { ModuledetailsofpackageService } from 'src/moduledetailsofpackage/moduledetailsofpackage.service';
import { Paymenttype } from './paymenttype.entity';
@Injectable()
export class CreatepackageService {
  constructor(
    @InjectRepository(Createpackage)
    private createpkgRepository: Repository<Createpackage>,
    @InjectRepository(Paymenttype)
    private paymenttyperepository: Repository<Paymenttype>,
    private readonly moduledetailspackageservice: ModuledetailsofpackageService,
  ) { }
  async create(data) {

    const response = this.createpkgRepository.create(data);

    const packageresponse = await this.createpkgRepository.save(response);

    let detailsdata;
    for (const value of data.modules) {
      console.log(value.details, 66789)
      detailsdata = {
        module: value.details.id,
        packages: packageresponse['id'],
        NoOfRecords: value.details.noOfRecords,
        CostPerRecord: value.details.costPerRecord,
        PackagePrice: value.details.packagePrice,
      }
      console.log(detailsdata, 8998)
      await this.moduledetailspackageservice.create(detailsdata)
    }
    if (packageresponse) {
      return {
        statusCode: HttpStatus.OK,
        message: "successs"
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "failed"
      };
    }

  }



  async update(id: number, updateCreatepackageDto) {
    // {
    //   id: '2',
    //   userId: '1',
    //   packagename: 'heart',
    //   existlogo: 'https://intaap.s3.amazonaws.com/1687168097836_Screenshot%20from%202023-06-07%2013-45-46.png',
    //   status: 1,
    //   modules: [
    //     [Object: null prototype] { details: [Object: null prototype] },
    //     [Object: null prototype] { details: [Object: null prototype] }
    //   ],
    //   packagelogo: undefined,
    //   pkgcreate: '1'

    //   } 
    console.log(updateCreatepackageDto, 88889)
    console.log(id, 818889)
    const currentDateTime = new Date(); // Current date and time
    const updateexistpackage = {
      enddate: currentDateTime,
      validity: true,
      ...(updateCreatepackageDto.packagelogo ? { packagelogo: updateCreatepackageDto.packagelogo } : {}),
      updatedat: currentDateTime,
      pkgupdate: updateCreatepackageDto.userId,
    }
    let packagenameexist;
    if (updateCreatepackageDto.packagename) {
      packagenameexist = await this.createpkgRepository.findOne({ where: { packagename: updateCreatepackageDto.packagename, enddate: null, validity: false } })
    }
    if(packagenameexist){
      const updateresponse = await this.createpkgRepository.update({ id },updateexistpackage);
      if(updateCreatepackageDto.status==2){
        const updateresponse = await this.createpkgRepository.update({ id },{status:2});
        return {
          statusCode: HttpStatus.OK,
          message: "successs"
        };        
      }
    }
// create new one
const newdata={
  packagename:updateCreatepackageDto.packagename,
  ...(updateCreatepackageDto.packagelogo ? { packagelogo:updateCreatepackageDto.packagelogo} : {packagelogo:updateCreatepackageDto.existlogo}),
  pkgcreate:updateCreatepackageDto.userId
}
    const response = this.createpkgRepository.create(newdata);
    const packageresponse = await this.createpkgRepository.save(response);
    let detailsdata;
    for (const value of updateCreatepackageDto.modules) {
      console.log(value.details, 66789)
      detailsdata = {
        module: value.details.id,
        packages: packageresponse['id'],
        NoOfRecords: value.details.noOfRecords,
        CostPerRecord: value.details.costPerRecord,
        PackagePrice: value.details.packagePrice,
      }
      console.log(detailsdata, 8998)
      await this.moduledetailspackageservice.create(detailsdata)
    }
    if (packageresponse) {
      return {
        statusCode: HttpStatus.OK,
        message: "successs"
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "failed"
      };
    }




    // console.log(updateresponse, 54678)
    // let passdata;

    // if (updateCreatepackageDto.newModules) {
    //   for (const item of updateCreatepackageDto.newModules) {
    //     passdata = {
    //       NoOfRecords: item.details.noOfRecords,
    //       CostPerRecord: item.details.costPerRecord,
    //       PackagePrice: item.details.packagePrice,
    //       module: item.details.id,
    //       packages: id
    //     }
    //     await this.moduledetailspackageservice.create(passdata)

    //   }
    // }

    // if (updateCreatepackageDto.deletedModules) {
    //   let deleteid;
    //   for (const item of updateCreatepackageDto.deletedModules) {
    //     deleteid = item.id
    //     await this.moduledetailspackageservice.remove(deleteid);

    //   }
    // }
    // console.log(updateCreatepackageDto.updatedModules, 888)
    // let updatedata;
    // if (updateCreatepackageDto.updatedModules) {
    //   for (const item of updateCreatepackageDto.updatedModules) {
    //     updatedata = {
    //       ...(item.details.noOfRecords ? { NoOfRecords: item.details.noOfRecords } : {}),
    //       ...(item.details.costPerRecord ? { CostPerRecord: item.details.costPerRecord } : {}),
    //       ...(item.details.packagePrice ? { PackagePrice: item.details.packagePrice } : {}),
    //     }
    //     await this.moduledetailspackageservice.update(item.details.packageId, updatedata);

    //   }
    // }

    // if (updateresponse) {
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: "successs"
    //   };
    // } else {
    //   return {
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message: "failed"
    //   };
    // }
  }


  async findAll() {
    const results = await this.createpkgRepository.find({
      relations: ['packagedetails', 'packagedetails.module', 'pkgcreate', 'pkgupdate', 'packagedetails.company'],
    });

    // Perform grouping by packagename
    const groupedResults = results.reduce((groups, item) => {
      const key = item.packagename;

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);

      return groups;
    }, {});

    // Convert grouped results to an array
    const groupedArray = Object.values(groupedResults);

    return groupedArray;
  }


  async currentlyvalidpackageonly() {
    return await this.createpkgRepository.find({
      where: { validity: false },
      relations: ['packagedetails', 'packagedetails.module', 'pkgcreate', 'pkgupdate', 'packagedetails.company']
    });
  }

  async findallreadyendedpackage() {
    return await this.createpkgRepository.find({
      where: { validity: true },
      relations: ['packagedetails', 'packagedetails.module', 'pkgcreate', 'pkgupdate', 'packagedetails.company']
    });
  }
  async findOne(id: number) {
    const packagedata = await this.createpkgRepository.findOne(id, { relations: ['packagedetails', 'packagedetails.module', 'pkgcreate', 'pkgupdate'] });
    if (!packagedata) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return packagedata;
  }


  async remove(id: number) {
    return `This action removes a #${id} createpackage`;
  }

  async getpayementtype() {
    return await this.paymenttyperepository.find()
  }
}
