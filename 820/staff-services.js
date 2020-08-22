import {
  get
} from './serve';

/**
 * 获得供应方岗位人员
 *
 * @export
 * @param {*} params
 * job_id: 1                   # 可缺省，根据岗位id查询
   job_name: 前端开发,         # 可缺省，岗位名模糊查询
   name: 1             # 可缺省，姓名
   province: 广东省       # 省份, 缺省或者空则默认全部
   city: 佛山市           # 城市, 缺省或者空则默认全部
   state: 0                # 可缺省，默认全部，状态(0.到岗. 1.需求方释放, 待供应方确认, 2. 供应方释放, 待需求方确认. 3. 已释放, 4. 申请续期. 5.即将到期(暂设置为离岗时间前10天内))
   salary_min: 0           # 可缺省，最低薪资
   salary_max: 30000       # 可缺省，最高薪资
   group_by: 0             # 可缺省，分组，1.供应方分组 2.岗位分组 3.地区分组
   sort_by:create_time     #可缺省，排序可选项： arrival_date,expire_date,release_date,release_start_date,renew_date,renew_start_date, create_time, modify_time
   ordering: DESC                 # 可缺省，ASC、DESC, 默认倒序 ,sort_by缺省时无效
   size: 10                         # 可缺省，单页记录数, 默认20
   page: 0                           # 页码, 从0开始
 */
export function getSupplierStaff(params) {
  return get('/cu/list_for_supplier', params);
}

/**
 * 获得需求方岗位人员
 *
 * @export
 * @param {*} params
 * supplier_id: 1               # 可缺省，根据供应方id查询
   supplier_name: 南方           # 可缺省，供应方名模糊查询
   job_id: 1                   # 可缺省，根据岗位id查询
   job_name: 前端开发,         # 可缺省，岗位名模糊查询
   name: 1             # 可缺省，姓名
   province: 广东省       # 省份, 缺省或者空则默认全部
   city: 佛山市           # 城市, 缺省或者空则默认全部
   state: 0                # 可缺省，默认全部，状态(0.到岗. 1.需求方释放, 待供应方确认, 2. 供应方释放, 待需求方确认. 3. 已释放, 4. 申请续期. 5.即将到期(暂设置为离岗时间前10天内))
   salary_min: 0           # 可缺省，最低薪资
   salary_max: 30000       # 可缺省，最高薪资
   group_by: 0             # 可缺省，分组，1.供应方分组 2.岗位分组 3.地区分组
   sort_by:create_time     #可缺省，排序可选项： arrival_date,expire_date,release_date,release_start_date,renew_date,renew_start_date, create_time, modify_time
   ordering: DESC                 # 可缺省，ASC、DESC, 默认倒序 ,sort_by缺省时无效
   size: 10                         # 可缺省，单页记录数, 默认20
   page: 0                           # 页码, 从0开始
 */
export function getDemanderStaff(params) {
  return get('/cu/list_for_demander', params);
}


/**
 * 供应方姓名列表
 *
 * @export
 * @param {*} params
 * name: 周                           # 可缺省，姓名模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getNamesForSupplier(params) {
  return get('/cu/list_name_for_supplier', params);
}

/**
 * 需求方姓名列表
 *
 * @export
 * @param {*} params
 * name: 周                           # 可缺省，姓名模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getNamesForDemander(params) {
  return get('/cu/list_for_demander', params);
}

/**
 * 供应方岗位名列表
 *
 * @export
 * @param {*} params
 * name: angular                           # 可缺省，姓名模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getJobNamesForSupplier(params) {
  return get('/cu/list_job_name_for_supplier', params);
}

/**
 * 需求方岗位名列表
 *
 * @export
 * @param {*} params
 * name: angular                           # 可缺省，姓名模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getJobNamesForDemander(params) {
  return get('/cu/list_job_name_for_demander', params);
}

/**
 * 需求方的简称列表
 *
 * @export
 * @param {*} params
 * shortcut: 门                       # 可缺省，部门简称模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getDemanderNames(params) {
  return get('/cu/list_demander_shortcut', params);
}

/**
 * 供应的简称列表
 *
 * @export
 * @param {*} params
 * shortcut: 门                       # 可缺省，部门简称模糊查询   
   state: 0                            # 可缺省，状态：0.计费人员，1.离岗人员。缺省时为全部人员
 */
export function getSupplierNames(params) {
  return get('/cu/list_supplier_shortcut', params);
}
