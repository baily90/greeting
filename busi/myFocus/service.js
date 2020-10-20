import axiosWrap from "./../../common/axiosWrap"
import apis from "./../../common/apis"
export function FocusList(params) {
  return axiosWrap.get(`${apis.getUrls().FocusList}`, {params})
}

export function UpdateStatus(params) {
  return axiosWrap.get(`${apis.getUrls().UpdateStatus}`, {params})
}