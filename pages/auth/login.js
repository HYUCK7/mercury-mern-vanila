import React, {useState} from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginRequest, loginCancell, logoutRequest } from '@/modules/auth/login';
import { Login } from '@/components/auth/Login';

const LoginPage = () => {
    const [user, setUser] =useState({
        userid:'', password:''
    })
    const dispatch = useDispatch()
    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setUser({...user,[name]: value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('로그인 정보:' + JSON.stringify(user))
        dispatch(loginRequest(user))
    }
  return (
    <Login onChange = {onChange} onSubmit = {onSubmit}
    />
  );
};

const mapStateToProps = state => ({isLoggined : state.login.isLoggined, loginUser : state.login.loginUser}) 
const loginActions = {loginRequest, loginCancell, logoutRequest }
export default connect(mapStateToProps, loginActions)(LoginPage)