import axios from "axios"
import React, { useState } from "react"
import {showErrMsg,showSuccessMgs} from "../utils/notification/Notification"
import {isEmail} from "../utils/validation/Validation"
const initialState = {
    email:'',
    err:'',
    success:''
}
function ForgotPassword(){
    const [data,setData] = useState(initialState)
    const {email,err,success} = data

    const handleChangeInput = (e) =>{
        const {name,value} = e.target
        setData({...data,[name]:value,err:'',success:''})
    }

    const forgotPassword=async()=>{
        if(!isEmail(email))
            return setData({...data,err:"Invalid emails",success:''})
        try {
            const res = await axios.post('/user/forgot',{email})
            return setData({...data,err:'',success:res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data,err:err.response.data.msg,success:''})
        }
    }

    return(
        <div className="fg_pass">
            <h2>Forgot Your Password</h2>
            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMgs(success)}

                <label htmlFor="email">Enter your email</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChangeInput} />
                <button onClick={forgotPassword}>Verify your email</button>
            </div>
        </div>
    )
}
export default ForgotPassword;