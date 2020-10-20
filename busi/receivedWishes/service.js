import axiosWrap from "./../../common/axiosWrap"
import apis from "./../../common/apis"
export function EmployeeWishHistoryList(params) {
  return axiosWrap.get(`${apis.getUrls().EmployeeWishHistoryList}`, {params})
}