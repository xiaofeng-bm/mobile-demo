import request from "@/utils/request";

export function GetCsrfTokenData(params) {
  return request({
    url: 'slip/api/appeal/get_csrf_token',
    method: 'get',
    params
  })
}

export function getAppealData(params){
  return request({
    url: 'slip/api/appeal/data_list',
    // url: 'https://www.fastmock.site/mock/593a78e6d6c639866f31c726bfbe24fb/base/slip/api/appeal/data_list',
    method: 'get',
    params
  })
}

export function SubmitAppealData({ headers, data }) {
  return request({
    url: 'slip/appeal/new',
    // url: 'https://www.fastmock.site/mock/593a78e6d6c639866f31c726bfbe24fb/base/slip/api/appeal/new',
    method: 'post',
    headers,
    data
  })
}

export function GetBonusListData(params) {
  return request({
    url: 'bigtable/query_ajax',
    // url: 'https://www.fastmock.site/mock/593a78e6d6c639866f31c726bfbe24fb/base/bigtable/query_ajax',
    method: 'get',
    params
  })
}

export function GetBigTableFirstData(params) {
  return request({
    url: 'bigtable/get_bigtable_first_data',
    method: 'get',
    params
  })
}

// 获取窗口期状态
export function GetSlipWinTimeStatus(params) {
  return request({
    url: 'bigtable/get_slip_win_time_status',
    method: 'get',
    params
  })
}

// 试算列表
export function GetTrialData(params) {
  return request({
    url: 'https://www.fastmock.site/mock/593a78e6d6c639866f31c726bfbe24fb/base/api/get-trial-list',
    method: 'get',
    params
  })
}

