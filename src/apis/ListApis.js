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
  getAllGroups: '/api/group/getAllGroups',
  delete: '/api/group/delete',
}

export const TaskApi = {
  create: '/api/task/create',
  getAllTasks: '/api/task/getAllTasks',
}