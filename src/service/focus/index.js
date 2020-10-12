import api from '../api'
import axiosWrap from '../../commons/axiosWrap'
export function getSignature (params) {
  return axiosWrap.get(api.home.getSignature, { params })
}
