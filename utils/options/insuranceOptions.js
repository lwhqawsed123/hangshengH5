/**
 * label : label名称
 * model : 绑定参数名
 * model1 : 绑定参数为嵌套对象时 model1为子对象的参数名
 * model2 : 绑定参数为嵌套对象时 model1为子对象的子对象的参数名
 * show  : 是否始终显示 true为显示 false为不显示
 * hasIcon : 是否显示展开按钮	 true为显示  默认不显示
 * messages : 展开按钮文字描述	 默认为绑定值
 * 
 * 
 * */
// 基本信息配置
export const basicInformation = [{
		label: "车主",
		model: "parties",
		model1:"owner",
		model2:"name",
		show: true
	},
	{
		label: "车牌号",
		model: "vehicle",
		model1:"licenseNo",
		show: true
	},
	{
		label: "车架号",
		model: "vehicle",
		model1: "vin",
		show: true
	},
	{
		label: "投保人/被投险人",
		model: "",
		messages: "详情",
		hasIcon: true,
		show: true
	},
	{
		label: "投保人",
		model: "parties",
		model1: "applicant",
		model2: "name",
		show: false
	},
	{
		label: "被保人",
		model: "parties",
		model1: "insured",
		model2: "name",
		show: false
	},
	{
		label: "证件类型",
		model: "parties",
		model1: "applicant",
		model2: "certificateType",
		show: false
	},
	{
		label: "证件号码",
		model: "parties",
		model1: "applicant",
		model2: "certificateNo",
		show: false
	},
	
]
// 交强险
export const CLIVTAInsurance = [{
		label: "保险期间",
		model: "ctpPolicy",
		model1: "startDate_endDate",
		show: false
	},
	{
		label: "保费",
		model: "ctpPolicy",
		model1: "actualPremium",
		hasIcon: true,
		show: true
	},
	// {
	// 	label: "机动车交通事故强制责任保险",
	// 	model: "VIN",
	// 	show: true
	// },
	{
		label: "车船税金额",
		model: "ctpPolicy",
		model1: "vehicleTaxAmount",
		show: false
	},
	// {
	// 	label: "保额",
	// 	model: "ctpPolicy",
	// 	model1: "vehicleTaxAmount",
	// 	hasIcon: true,
	// 	show: true
	// },
	{
		label: "保单号",
		model: "ctpPolicy",
		model1: "applicationNo",
		show: false
	}
]
// 商业险
export const vehicleInsurance = [{
		label: "保险期间",
		model: "bizPolicy",
		model1: "startDate_endDate",
		show: false
	},
	{
		label: "保费",
		model: "bizPolicy",
		model1: "actualPremium",
		hasIcon: true,
		show: true
	},
	{
		label:"子险列表-保费",
		model: "bizPolicy",
		model1: "coverages",
		show:false
	},
	
	{
		label: "保额",
		model: "bizPolicy",
		model1: "actualPremium",
		messages:"详情",
		hasIcon: true,
		show: true
	},
	{
		label:"子险列表-保额",
		model: "bizPolicy",
		model1: "coverages",
		show:false
	},
	{
		label: "保单号",
		model: "bizPolicy",
		model1: "policyNo",
		show: true
	},
]


// 证件类型
export const certificateTypeOptions = [{
    value: "1",
    label: "居民身份证"
  },
  {
    value: "2",
    label: "驾驶证"
  },
  {
    value: "3",
    label: "军官证"
  },
  {
    value: "4",
    label: "军人证"
  },
  {
    value: "5",
    label: "户口薄"
  },
  {
    value: "6",
    label: "护照"
  },
  {
    value: "7",
    label: "中国护照"
  },
  {
    value: "8",
    label: "外国护照"
  },
  {
    value: "9",
    label: "组织机构代码"
  },
  {
    value: "10",
    label: "工商注册号码"
  },
  {
    value: "11",
    label: "港澳台同胞证"
  },
  {
    value: "12",
    label: "统一社会信用代码证"
  },
  {
    value: "13",
    label: "税务登记证"
  },
  {
    value: "14",
    label: "返乡证"
  },
  {
    value: "15",
    label: "其它"
  },
  {
    value: "16",
    label: "台胞证"
  },
  {
    value: "17",
    label: "港澳居民来往内地通行证"
  },
  {
    value: "18",
    label: "港澳身份证"
  },
  {
    value: "19",
    label: "外国人永久居留身份证"
  },
  {
    value: "20",
    label: "台湾居民来往内地通行证"
  },
  {
    value: "21",
    label: "港澳台居民居住证"
  }
]