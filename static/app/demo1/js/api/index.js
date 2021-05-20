
/**
 * pt 审核详情接口，wiki：https://wiki.changingedu.com/pages/viewpage.action?pageId=183042948
 */
export function fetchVerifyDetailByIdByPt(data, user_type = 'ta_user') {
  return axios({
    method: 'POST',
    url: `${base.config.apigw}/taordersvc/api/h5pt/v1/online_course_refund_audit/audit_detail.json`,
    params: {
      user_type
    },
    data
  });
}
