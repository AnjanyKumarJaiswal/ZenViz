import { httpClient } from "./auth";


export async function OauthLogin(oauth_type: string){
    try{
        const res = await httpClient.post(`/api/oauth/${oauth_type}`);
        if(res.status === 200){
            return {"status":res.status ,"message": res.data};
        }
    } catch(error){
        return {"error": error};
    }
}

export async function exisitingGithubUser(){
    try{
        const res = await httpClient.get('/api/auth/login/github',{
            withCredentials: true
        });
        if(res.status === 200){
            return {
                success: res.status === 200,
                data:res?.data.data
            }
        }
    } catch(error){
        return {"error":error};
    }
}