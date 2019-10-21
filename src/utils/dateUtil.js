/*
实用工具
*/

// 格式化日期和时间的函数工具模块
export function formatDate(time) {
    if (!time) return ''
    // new Date() 的结果为  Sun Oct 06 2019 09:09:34 GMT+0800 (中国标准时间)
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour= date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return (
        year + '-' + (month > 9 ? month: '0' + month ) + '-' + (day > 9 ? day : '0' + day ) + ' '
        + (hour > 9 ? hour: '0'+ hour) + ':' + ( minutes > 9 ? minutes: '0' + minutes ) + ':' + (seconds > 9 ? seconds: '0' + seconds )
    )
}