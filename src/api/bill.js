import request from "@/utils/request";


export function GetBonusListData(params) {
  return request({
    url: 'bigtable/query_ajax',
    method: 'get',
    params
  })
}

export function GetMonthData(params, cancelToken) {
  return request({
    url: 'trial/get_month_qty_by_year',
    method: 'get',
    cancelToken,
    params
  })
}

export function GetBigTableListData(params) {
  return request({
    url: 'bigtable/get_bigtable_json_list',
    method: 'get',
    params
  })
}

export function GetBigTableDetailData(params) {
  return request({
    url: 'bigtable/get_bigtable_json_detail',
    // url: 'https://www.fastmock.site/mock/593a78e6d6c639866f31c726bfbe24fb/base/bigtable/query_ajax',
    method: 'get',
    params
  })
}

