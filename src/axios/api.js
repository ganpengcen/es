const Host = 'http://acapi.bjjtza.com/';
// const Host = 'http://quickcq.com:8001/';

export default {
  hostname: Host,
  authcode:Host+'api/wx/authcode?url=',//静默获取openid鉴权
  signinbyopenid:Host+'api/wx/signinbyopenid',//通过openid登陆
  userwxbind:Host+'api/wx/userwxbind',//用户绑写微信
  userwxunbind: Host+'api/wx/userwxunbind/', //解除绑定s

  //app端s
  getDangerLevels:Host+'api/app/getDangerLevels',//获取风险等级
  getDangerPointsPage:Host+'api/app/getDangerPointsPage',//根据风险点ID
  getCtrMenu:Host+'api/app/getCtrMenu',//获取统计管控菜单
  getTroubleCtrsPage:Host+'api/app/getTroubleCtrsPage',//分页获取管控项
  getTimeOutTask:Host+'api/app/getTimeOutTask',//当前人组织架构下 获取所有超期任务
  gettasklist:Host+'api/app/gettasklist',//获取当前用户的任务列表
  getdocinslist:Host+'api/app/getdocinslist',//获取公示公告制度
  getdocins:Host+'api/app/getdocins',//根据制度ID获取制度
  getvideolist:Host+'api/app/getvideolist',//获取摄像头列表
  gettimetask:Host+'api/app/gettimetask',// 获取超期任务列表
  addbill:Host+'api/app/addbill',// 获新建任务单
  getcurrentlist:Host+'api/app/getcurrentlist',//获取当前作业单
  getoverlist:Host+'api/app/getoverlist',//获取已完成作业单
  getopreateflowmodel:Host+'api/app/getopreateflowmodel',//根据作业单ID，获取带处理节点的单据模型
  billflowset:Host+'api/app/billflowset',//处理作业单流程节点
  gettaskbills:Host+'api/app/gettaskbills',//获取当前任务单据列表
  gettaskbillsover:Host+'api/app/gettaskbillsover',//获取历史任务单据列表
  getsubjects:Host+'api/app/getsubjects',//根据任务单id获取待检查主体
  gettasksubover:Host+'api/app/gettasksubover',//根据任务单id获取已检查主体
  getTroubleCtr:Host+'api/app/getTroubleCtr',//获取管控信息详情
  getfiles:Host+'api/attachfile/getfiles',//根据业务id获取电子文件
  addTroubleCtrFlow:Host+'api/app/addTroubleCtrFlow',//新建申请/验收
  quickHandleCtr:Host+'api/app/quickHandleCtr',//快速处理
  filed:Host+'api/app/filed',//归档
  getTroubleLevel:Host+'api/dict/getTroubleLevel',//获取隐患等级
  getdangerdict:Host+'api/dict/getdangerdict',//获取风险等级词典
  gettree:Host+'api/orgemp/gettree',//获取组织架构的树形结构
  getemplist:Host+'api/orgemp/getemplist',//根据组织ID获取人员模型列表
  getposts:Host+'api/postmanage/getposts',//获取岗位模型列表
  getDangerPointSelector:Host+'api/dangerpoint/getDangerPointSelector',//风险点选择器
  getDangerPointRelationSelector:Host+'api/dangerpoint/getDangerPointRelationSelector',//巡查主体类型
  subjecttype:Host+'api/enum/subjecttype',//根据风险点ID和主体类型的主体选择器
  handleCtr:Host+'api/app/handleCtr',//处理管控项
  transferPrincipal:Host+'api/app/transferPrincipal',//转让责任人
  taskbillover:Host+'api/app/taskbillover',//完成任务单据
  deltaskbill:Host+'api/app/deltaskbill',//删除任务单据
  gettasksubover:Host+'api/app/gettasksubover',//根据任务单id获取已检查了的主体的集合
  delsubresult:Host+'api/app/delsubresult',//根据结果ID，删除检查结果
  getsubresult:Host+'api/app/getsubresult',//获取检查结果模型
  getdangerselector:Host+'api/app/getdangerselector',//获取风控项选择器信息
  addtemptask:Host+'api/app/addtemptask',//移动端新建临时任务
  taskresulttype:Host+'api/enum/taskresulttype',//任务检查结果

  addtasksubject:Host+'api/app/addtasksubject',//新建任务主体检查结果

  getfiles:Host+'api/attachfile/getfiles',//根据业务id获取电子文件

  delfile:Host+'api/attachfile/delfile',//删除文件

  changepwd:Host+'api/auth/changepwd',//修改密码

  setprofile:Host+'api/auth/setprofile',//设置用户Profile


  // getsubjects:Host+'api/app/getsubjects',//根据任务单id获取待检查主体

  //词典
  evaluatemethod:Host+'api/enum/evaluatemethod',//隐患等级计算方法
  getEval_LECD_L:Host+'api/dict/getEval_LECD_L',//获取LECD_L词典
  getEval_LECD_E:Host+'api/dict/getEval_LECD_E',//获取LECD_E词典
  getEval_LECD_C:Host+'api/dict/getEval_LECD_C',//获取LECD_C词典

  getEval_LSD_L:Host+'api/dict/getEval_LSD_L',//获取LSD_L词典
  getEval_LSD_S:Host+'api/dict/getEval_LSD_S',//获取LSD_S词典

  getevealwhys:Host+'api/dict/getevealwhys',//危害因素
  getevealsglx:Host+'api/dict/getevealsglx',//获取事故类型词典
  getevealsyhg:Host+'api/dict/getevealsyhg',//获取事故后果词典
  getevealyxfw:Host+'api/dict/getevealyxfw',//获取影响范围词典

  //审批流程
  mytask:Host+'api/flow/mytask',//获取待审批
  approve:Host+'api/flow/approve',//业务单据审批
  getlogs:Host+'api/flow/getlogs',//获取审批日志


  //作业申请
  getmodel:Host+'api/opreatebill/getmodel',//获取作业申请单模型


  //巡检任务
  getmodels:Host+'api/insptask/getmodel',//获取巡检任务模型

  //培训管理

  getdts:Host+'api/doctrainmanage/getdts',//分页获取训练项模型，可根据训练项主题查询
  adddt:Host+'api/doctrainmanage/adddt',//新建训练项模型
  editdt:Host+'api/doctrainmanage/editdt',//修改训练项模型
  deldt:Host+'api/doctrainmanage/deldt',//删除训练项模型
  getdtemps:Host+'api/doctrainmanage/getdtemps',//分页获取参加训练的人员
  getdt:Host+'api/doctrainmanage/getdt',//根据ID，获取训练项模型

  //
  //组织架构
  getorg: Host + "api/orgemp/getorg",   //获取子组织


  //微信
  wxjscfg:Host+'api/wx/wxjscfg',//微信
  getEmpTaskByQRCoder:Host+'api/app/getEmpTaskByQRCoder/',//根据二维码获取任务
  getTaskBillMastersOverByQRCoder:Host+'api/app/getTaskBillMastersOverByQRCoder/',//根据二维码获取历史

  getlist: Host + 'api/userdf/getlist', //获取用户自定义项
  getdms: Host + 'api/docmeeting/getdms',  //获取安全会议数据详情
  adddm: Host + 'api/docmeeting/adddm',  //新建安全会议
  deldm: Host + 'api/docmeeting/deldm/',
  getdm: Host + 'api/docmeeting/getdm/',
  editdm: Host + 'api/docmeeting/editdm',
  getitems:Host + 'api/userdf/getitems',  //获取用户自定义项
  getfiles:Host + 'api/attachfile/getfiles/', //获取用户上传文件详情
  delfile:Host + 'api/attachfile/delfile/',//删除文件
  getdicts:Host + 'api/dict/getdicts',

//作业申请
  addnewOpreatebill:Host+'api/opreatebill/addnew',//新建作业申请单
  getOpreateBilllist:Host+'api/opreatebill/getlist',//分页获取
  opreatebillApprove:Host+'api/opreatebill/approve/',//业务单据审核
  opreatebillDelbill:Host+'api/opreatebill/delbill/',//删除业务单据
  opreatebillEditbill:Host+'api/opreatebill/editbill',//修改作业申请单
  opreatebillGetmodel:Host+'api/opreatebill/getmodel/',//获取作业申请单模型
  startflow:Host+'api/opreatebill/startflow/',//发起审批流程
  getbillflowmodel:Host+'api/opreatebill/getbillflowmodel/',//获取带作业节点的作业单模型
  opreatebillBillflowset:Host+'api/opreatebill/billflowset',//处理作业申请单流程节点
  getFlowMasterSelector:Host+'api/flow/getFlowMasterSelector/',//根据业务类型ID获取Master选择器
  getOpreationSelectorByUser:Host+'api/opreatinflow/getOpreationSelectorByUser',//获取流程选择器
  getparents:Host+'api/orgemp/getparents/',//获取组织架构父级
}
