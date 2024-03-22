const base_url='http://localhost:3000'
export const apiResquest = (prams) => { 

//prams是调用的接口API的参数

	//请求头设置
	let headerData = {
		'content-type': 'application/json'
	}

	
	return new Promise((resolve, reject) => {
		let url = base_url + prams.url; //请求的网络地址和局地的api地址组合
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		return uni.request({
			url: url,
			data: prams.query,
			method: prams.method,
			header: headerData,
			success: (res) => {
				uni.hideLoading()
                 //这里是成功的返回码，根据自己的实际情况调整
				if (res.data.code == '200') {
					console.log('请求成功:' + res.data.msg)
				}else{
                    console.log('请求失败:' + res.data.msg)
                }
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
				console.log(err)
				uni.hideLoading()
			},
			complete: () => {
				console.log('请求完成')
				uni.hideLoading()
			}
		});
	})
}