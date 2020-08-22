const avatarSlots = { customRender: 'avatar'};
const sexSlots = { customRender: 'sex'};
const citySlots = { customRender: 'city'};
const dateSlots = { customRender: 'date' };
const stateSlots = { customRender: 'state' };
const releaseReasonSlots = { customRender: 'releaseReason' };
const salarySlots = { customRender: 'salary' };

export const supplierStaffColumns = [
	{ title: '人员姓名', dataIndex: 'name',  width: 140, fixed: 'left', scopedSlots: avatarSlots },
	{ title: '性别', dataIndex: 'sex', width: 150, scopedSlots: sexSlots },
	{ title: '岗位名称', dataIndex: 'job_name', width: 180 },
	{ title: '需求方简称', dataIndex: 'demander_organization_name', width: 200},
	{ title: '工作城市', dataIndex: 'city', width: 200, scopedSlots: citySlots },
	{ title: '计费开始时间', dataIndex: 'arrival_date', width: 200, sorter: true, scopedSlots: dateSlots },
	{ title: '离岗时间', dataIndex: 'release_date', width: 200, sorter: true, scopedSlots: dateSlots },
	{ title: '申请人', dataIndex: 'release_by', width: 200},
	{ title: '申请离岗时间', dataIndex: 'release_start_date', width: 180, scopedSlots: dateSlots },
	{ title: '状态', dataIndex: 'state', width: 180, scopedSlots: stateSlots },
	{ title: '释放理由', dataIndex: 'release_reason', width: 120, scopedSlots: releaseReasonSlots },
	{ title: '计费金额 (元/月)', dataIndex: 'salary', width: 120, scopedSlots: salarySlots },
];

export const demanderStaffColumns = [
	{ title: '人员姓名', dataIndex: 'name',  width: 140, fixed: 'left', scopedSlots: avatarSlots },
	{ title: '性别', dataIndex: 'sex', width: 150, scopedSlots: sexSlots },
	{ title: '岗位名称', dataIndex: 'job_name', width: 180 },
	{ title: '供应方简称', dataIndex: 'supplier_organization_name', width: 200},
	{ title: '工作城市', dataIndex: 'city', width: 200, scopedSlots: citySlots },
	{ title: '计费开始时间', dataIndex: 'arrival_date', width: 200, sorter: true, scopedSlots: dateSlots },
	{ title: '离岗时间', dataIndex: 'release_date', width: 200, sorter: true, scopedSlots: dateSlots },
	{ title: '申请离岗时间', dataIndex: 'release_start_date', width: 200, sorter: true, scopedSlots: dateSlots },
    { title: '状态', dataIndex: 'state', width: 180, scopedSlots: stateSlots },
    { title: '申请人', dataIndex: 'release_by', width: 200},
	{ title: '释放理由', dataIndex: 'release_reason', width: 120, scopedSlots: releaseReasonSlots },
	{ title: '计费金额 (元/月)', dataIndex: 'salary', width: 120, scopedSlots: salarySlots },
];

const supplierTabKey = 'a'; // TODO 待后端提供
export const supplierStaffTableTabs = [
    { title: '全部', value: '', key: supplierTabKey},
    { title: '只看我提出的释放申请', value: '', key: supplierTabKey},
    { title: '只看我收到的释放申请', value: '', key: supplierTabKey},
    { title: '只看我收到的续期申请', value: '', key: supplierTabKey},
];

const demanderTabKey = 'a'; // TODO 待后端提供
export const demanderStaffTableTabs = [
    { title: '全部', value: '', key: demanderTabKey},
    { title: '只看我收到的释放申请', value: '', key: demanderTabKey},
    { title: '只看我提出的释放申请', value: '', key: demanderTabKey},
    { title: '只看我提出的续期申请', value: '', key: demanderTabKey},
];
