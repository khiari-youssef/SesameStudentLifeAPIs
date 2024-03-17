

export class SesameRole{
  id : string
  permissions : []

  constructor(id : string,permissions : []) {
    this.id = id
    this.permissions = permissions
  }

  static StudentRole : string = "StudentRole"
  static TeacherRole : string = "TeacherRole"
}