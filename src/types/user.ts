interface RoleInt {
  role:number,
  roleName:string,
}
export interface ListInt{
  id:number,
  nikeName:string,
  userName:string,
  role:RoleInt[]
}
interface SelectDataInt {
  role:number,
  nikeName:string
}

interface RoleListInt{
  roleName:string,
  roleId:number,
  authority:number[]
}
export class InitData {
  selectData:SelectDataInt ={
    role:0,
    nikeName:''
  }
  list:[ListInt][] = []
  listData:[ListInt][] = []
  roleList:RoleListInt[] = []
  active:ListInt ={
    id: 0,
    nikeName: "",
    userName: "",
    role: []
  }
}