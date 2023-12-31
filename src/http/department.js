//统一api管理
import instance from "./axios";
//data json
const userLogin=(data)=>{
    //返回Prommise对象
     return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data
    })
} 
const adminLogin=(data)=>{
    return instance.request({
        url:'', //url=baseURL+url
        method:'post',
        data
    })
}
const departmentPage=(params)=>{
    return instance.request({
        url:'/api/department/all',
        params
    })
}
const departmentDelId=(params)=>{
    return instance.request({
        url:'/api/department/delete',
        params
    })
}
const departmentAdd=(data)=>{
    return instance.request({
        url:'/api/department/add',
        method:'post',
        data
    })
}
const departmentEdit=(data)=>{
    return instance.request({
        url:'/api/department/edit',
        method:'post',
        data
    })
}
export {
    userLogin,
    adminLogin,
    departmentPage,
    departmentDelId,
    departmentAdd,
    departmentEdit
} //多个输出