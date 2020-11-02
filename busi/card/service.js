import axiosWrap from "./../../common/axiosWrap"
import apis from "./../../common/apis"
export function EmployeeWishByCompany(params) {
  return axiosWrap.get(`${apis.getUrls().EmployeeWishByCompany}`, {params})
}
export function EmployeeCareUploadFile(data) {
  return axiosWrap.post(`${apis.getUrls().EmployeeCareUploadFile}`, data)
}
export function shareParam(params) {
  return axiosWrap.get(`${apis.getUrls().shareParam}`, {params})
}
export function SavaShareOperate(data) {
  return axiosWrap.post(`${apis.getUrls().SavaShareOperate}`, data)
}
