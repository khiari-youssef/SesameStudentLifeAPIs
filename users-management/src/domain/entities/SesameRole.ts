

export enum SesameRoleLabel{
  Student,Teacher
}

export abstract class SesameRole{
  id : string
  permissions : []

  protected constructor(id : string, permissions : []) {
    this.id = id
    this.permissions = permissions
  }

  abstract getRoleName() : SesameRoleLabel

}

export  class  StudentRole extends SesameRole {
  constructor(id : string, permissions : []) {
    super(id,permissions);
  }
 getRoleName(): SesameRoleLabel {
   return SesameRoleLabel.Student;
 }

}

export  class  TeacherRole extends SesameRole {
  constructor(id : string, permissions : []) {
    super(id,permissions);
  }
  getRoleName(): SesameRoleLabel {
    return SesameRoleLabel.Teacher;
  }
}