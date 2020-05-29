export function mapToObj(objs, maps, filter) {
    const newObjs = []
    objs.map(item => {
        console.log(item)
        if (filter === undefined || filter(item)) {
            const obj = Object()
            maps.forEach(m => {
                console.log(m)
                if (Array.isArray(m)) {
                    console.log(item[m[0]])
                    obj[m[1]] = item[m[0]]
                } else {
                    obj[m] = item[m]
                }
            });
            newObjs.push(obj)
        }
    })
    return newObjs
}