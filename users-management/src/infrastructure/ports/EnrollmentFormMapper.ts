import {EnrollmentForm, EnrollmentStatus} from "../../domain/entities/EnrollmentForm";
import {EnrollmentFormDTO} from "../../application/requestsPayloads/EnrollmentFormDTO";
import {
    DomainToExternalEntityMapper,
    EntityMappingException
} from "../../../../core/src/infrastructure/ports/DomainToExternalEntityMapper";
import {UserSex} from "../../domain/entities/SesameUser";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EnrollmentFormMapper implements DomainToExternalEntityMapper<EnrollmentForm,EnrollmentFormDTO> {

    toDomainEntity(external: EnrollmentFormDTO): EnrollmentForm {
        let hasValidSex : boolean = external.sex.toLowerCase() == 'm' || external.sex.toLowerCase() == 'f'
        if (!hasValidSex) {
            throw new EntityMappingException("sex","external.sex","parse error !");
        }
       return new EnrollmentForm(
           external.personalEmail,
           external.phone,
           external.sex.toLowerCase() == "m" ? UserSex.Male :  UserSex.Female,
           new Date(external.birthDate),
           external.firstName,
           external.lastName,
           external.programId,
           EnrollmentStatus.Pending
       );
    }

    toExternalEntity(domain: EnrollmentForm): EnrollmentFormDTO {
        return new EnrollmentFormDTO(
            domain.personalEmail,
            domain.phone,
            domain.sex.toString(),
            domain.birthDate.toISOString(),
            domain.firstName,
            domain.lastName,
            domain.programId,
        );
    }

}