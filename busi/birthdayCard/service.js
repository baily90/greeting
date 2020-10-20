import axiosWrap from "./../../common/axiosWrap"
import apis from "./../../common/apis"
export function EmployeeWishByCompany(params) {
  return axiosWrap.get(`${apis.getUrls().EmployeeWishByCompany}`, {params})
}