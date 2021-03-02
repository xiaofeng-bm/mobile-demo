import request from "@/utils/request";

// 政策列表
export function GetSlipPolicyList(params, cancelToken) {
  return request({
    url: "slip/get_slip_policy_list_json",
    method: "get",
    cancelToken,
    params,
  });
}


// 政策详情
export function GetSlipPolicyInfo(params) {
  return request({
    url: "slip/get_slip_policy_info_json",
    method: "get",
    params,
  });
}

