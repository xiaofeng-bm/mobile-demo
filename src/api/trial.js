import request from "@/utils/request";

// 获取试算数据
export function GetTrialData(params, cancelToken) {
  return request({
    url: "trial/get_zailab_trial_argv",
    method: "get",
    cancelToken,
    params,
  });
}
// 火球产品单价
export function GetSlipTrialArgv(params) {
  return request({
    url: "trial/get_slip_trial_argv",
    method: "get",
    params,
  });
}

// 试算详情
export function GetTrialRunCalc({ headers, data }) {
  return request({
    url: "trial/run_calc",
    method: "post",
    headers,
    data,
  });
}
export function GetCsrfTokenData(params) {
  return request({
    url: "slip/api/appeal/get_csrf_token",
    method: "get",
    params,
  });
}

