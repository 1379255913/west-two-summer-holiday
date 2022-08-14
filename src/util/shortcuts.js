const list = [
    {
        text: '10分钟',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 60 * 1000 *10)
            return date
        },
    },
    {
        text: '1小时',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000)
            return date
        },
    },
    {
        text: '1天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '7天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
        },
    },
]
export default list
