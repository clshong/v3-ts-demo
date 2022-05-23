export interface ListInt{
  userId:number,
  id:number,
  title:string,
  body:string
}
interface SelectDataInt {
  title:string, // 标题
  body:string, // 内容
  page:number, // 分页
  count:number //总条数
}
export class InitData {
  selectData:SelectDataInt ={
    title:'',
    body:'',
    page: 0,
    count: 0,
  }
  list:[ListInt][] = []

  dataList: ListInt[] = []
}