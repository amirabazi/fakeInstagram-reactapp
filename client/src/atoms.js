import { atom } from 'recoil'

const loggedState = atom({
    key: 'loggedState',
    default: false,
})

const registeredState = atom ({
    key: 'registeredState',
    default: false,
})

const userDataAll = atom ({
    key: 'userDataAll',
    default: [],
})

export{
    loggedState,
    registeredState,
    userDataAll,
}