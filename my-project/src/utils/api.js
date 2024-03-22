import { apiResquest } from './request.js'

// 获取密码管理器中所有密码的相关信息
export const getOtherInfo = () => {
	return apiResquest({
		url: '/queryAll',
		method: 'GET'
	})
}
// 插入主密钥
export const insertHashPwd = (query) => {
	return apiResquest({
		url: '/insertHashPwd',
		method: 'POST',
		query: {...query}
	})
}
// 插入某个密码的相关信息
export const insertOtherInfo = (params) => {
	return apiResquest({
		url: '/insertOtherInfo',
		method: 'POST',
		query: {...params}
	})
}
// 删除某个密码的相关信息
export const delectOtherInfo = (params) => {
	return apiResquest({
		url: '/delectOtherInfo',
		method: 'POST',
		query: {...params}
	})
}
// 更新密码
export const updatePassword = (params) => {
	return apiResquest({
		url: '/updatePassword',
		method: 'POST',
		query: {...params}
	})
}
// 校验主密钥是否一致
export const isMasterKeySame = (params) => {
	return apiResquest({
		url: '/isMasterKeySame',
		method: 'GET',
		query: {...params}
	})
}
