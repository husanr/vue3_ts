import apiRequest from "@/service"
import { IDataType } from "@/service/types"

export function getPageListData(url: string, queryInfo: any) {
  return apiRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
