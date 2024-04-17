import { Type } from "class-transformer"
import { ResponseWithoutRelationsUserDto } from "../../user/dto/responseWithoutRelations"

export class DoctorDto {
    id: string
    payrate: number
    about_me: string
    user_id: string
    @Type(() => ResponseWithoutRelationsUserDto)
    user: ResponseWithoutRelationsUserDto
    specialization_id: string
}