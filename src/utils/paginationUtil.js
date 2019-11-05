

// 统一风格的分页标识

// 视频7-7讲解  自定义分页

// 要保持数据的格式完全一致，才能使得读取这些数据
export function paginationUtil(result, callback) {
    return {
        onChange: (current) => {
            callback(current)
        },
        current: result.data.page,
        pageSize: result.data.page_size,
        total: result.data.total,
        showTotal: () => { return `共${result.data.total}条数据` },
        showQuickJumper: true,
    }
}
