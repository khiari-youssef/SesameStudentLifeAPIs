

export  class EntityMappingException extends Error {
     attribute : string
     value : string
     message : string
     constructor(attribute : string,
     value : string,message : string) {
          super(message);
          this.attribute = attribute;
          this.value = value;
     }
}

export  interface DomainToExternalEntityMapper<Domain,External> {

     toExternalEntity(domain : Domain) : External;

     toDomainEntity(external : External) : Domain;


}