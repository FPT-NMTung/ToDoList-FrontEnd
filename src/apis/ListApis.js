export const UserApi = {
  create: '/api/user/create',
  login: '/api/user/login',
  changePassword: '/api/user/change-password',
  resetPassword: '/api/user/reset-password',
  changePasswordByReset: '/api/user/reset-password/submit',
  checkTokenResetPassword: '/api/user/reset-password/check-token',
  checkTokenActiveAccount: '/api/user/active-account/check-token',
  activeAccount: '/api/user/active-account',
  getInformation: '/api/user/information',
  changeAvatar: '/api/user/change-avatar',
}

export const GroupApi = {
  create: '/api/group/create',
  getInfo: '/api/group/getInfo',
  checkOwnerGroups: '/api/group/check-owner-groups',
  getAllGroups: '/api/group/getAllGroups',
  getAllMember: '/api/group/getAllMember',
  delete: '/api/group/delete',
  addMember: '/api/group/addMember',
  deleteMember: '/api/group/removeMember',
}

export const TaskApi = {
  create: '/api/task/create',
  getAllTasks: '/api/task/getAllTasks',
  getAllTasksForAdmin: '/api/task/get-all-tasks-for-admin',
}