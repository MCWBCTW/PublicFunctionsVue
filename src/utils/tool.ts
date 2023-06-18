
/**
 * @function 格式化日期为 yyyy-mm-dd hh:mm:ss
 * @param data = 日期对象
 */
 export function formatDate(date: Date) {
	//日期
	const dd = String(date.getDate()).padStart(2, '0'); // 获取日
	const MM = String(date.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
	const yyyy = date.getFullYear(); // 获取年
	// 时间
	const hh = String(date.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
	const mm = String(date.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
	const ss = String(date.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
	return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}


/**
     * 二分查找法
     * 
     * @param arr 目标数组
     * @param target 需要查询的目标值
     * @return 查询目标的下标
     */

function binarySearch(arr: Array<number>, target: number): number {
	let start: number = 0; // 当前查询的起始位
	let end: number = arr.length - 1; // 当前查询的结束位
	while (start <= end) {
		let half: number = Math.floor((start + end) / 2); // 查询的中间位次
		if (arr[half] == target) {
			return half
		} else if (arr[half] > target) {
			end = half - 1;
		} else {
			start = half + 1;
		}
	}
	return -1
}