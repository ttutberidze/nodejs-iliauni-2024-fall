
// setTimeout(() => {
//     console.log('Hello')
// }, 2000)

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Resolved')
//     }, 2000)
// })

const printAsync = (user) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(user.name)
            } catch(error) {
                reject(error)
            }
        }, 2000)
    })
}

// printAsync({name: "James Bond"})
//     .then((result) => {
//         console.log(result)
//         printAsync({name: "Agent 007"})
//             .then((result) => console.log(result))
//             .catch((error) => console.log(error.message))
//     })
//     .catch((error) => console.log(error.message))
    // .finally(() => console.log('finally'))


const main = async () => {
    const user1 = await printAsync({name: "James Bond"})
    console.log(user1);
    const user2 = await printAsync({name: "Agent 007"})
    console.log(user2)
    return user2;
}

main().then(console.log)