function save (user){
sessionStorage.setItem('user', JSON.stringify(user))
}

function get (){
    return JSON.parse(sessionStorage.getItem('user'))
}


function isconnected (){
    return sessionStorage.getItem('user') != null
}

function logout (){
    sessionStorage.removeItem('user')
}


export default {save, get, isconnected, logout}