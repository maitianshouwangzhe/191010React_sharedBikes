

// 统一风格的分页标识

// 请求得到的数据
export function paginationUtil(data1, callback) {
    return {
        onChange: (current) => {
            callback(current)
        },
        current: data1.data.page,
        pageSize: data1.data.page_size,
        total: data1.data.total,
        showTotal: () => {
            return `共${data1.data.total}条数据`
        },
        showQuickJumper: true,
    }
}
