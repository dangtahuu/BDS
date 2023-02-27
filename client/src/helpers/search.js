export const searchValues = (state)=>{
    const values = Object.entries(state).filter(item => item[1])
    values.forEach(item => {
        if (typeof item[1] === 'string') {
            item[1] = item[1].split('$')[0]
        }
    })
    return Object.fromEntries(values)
}
export const searchPath = (state)=>{
    const values = Object.entries(state).filter(item => item[1])
    values.forEach(item => {
        if (typeof item[1] === 'string'&& item[1].includes('$')) {
            item[1] = item[1].split('$')[1]
        }
    })
    return Object.fromEntries(values)
}