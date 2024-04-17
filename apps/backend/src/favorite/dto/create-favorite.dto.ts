import { IsNotEmptyString } from "src/validators/IsNotEmptyString";

export class CreateFavoriteDto 
{
    @IsNotEmptyString()
    readonly doctor_id : string;
  
    @IsNotEmptyString()
    readonly patient_id: string;
}
