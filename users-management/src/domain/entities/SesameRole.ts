

export enum SesameRoleType{
  Student,Teacher
}


export  class SesameRole{
  type : SesameRoleType
  id : string
  permissions : {
      permission:SesamePermissions,
      description : string,
      state: SesamePermissionState,
  }[]

    constructor(type: SesameRoleType, id: string, permissions: { description: string; permission: SesamePermissions; state: SesamePermissionState }[]) {
    this.type = type
    this.id = id
    this.permissions = permissions
  }

}

export enum SesamePermissionState{
    DENIED,REQUIRES_AUTH,GRANTED
}
export enum SesamePermissions{
   USER_LOGIN,USER_VIEW_PROFILE,USER_VIEW_SELF_PROFILE,
    USER_UPDATE_SELF_PROFILE,USER_UPDATE_PROFILE,USER_DELETE,USER_CREATE
}

