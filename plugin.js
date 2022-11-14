//the value of userId which should be passed into the collect.js
async function getUserId() {
    const resp = await fetch('https://www.uuidtools.com/api/generate/v4')
    const uids = await resp.json()
    return uids[0]
}

//your code goes here
