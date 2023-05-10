import { AccidentUploadImage } from "src/accident-upload-image/accident-upload-image.entity";
import { AccidentUploadThirdParty } from "src/accident-upload-third-party/accident-upload-third-party.entity";

export class CreateAccidentUploadDto {
        id:number;
        dateTime: Date;
        location:String;
        withnessStatement: number;
        accidentDescription:String;
        status: Boolean;
        filename:any;
        accidentImages: AccidentUploadImage[];
        accidentThirdParty: AccidentUploadThirdParty[];
}
