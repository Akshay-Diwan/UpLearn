export async function postSignUpCred(data: {name: string, age: number, class: string}){
    const res = await fetch('http://localhost:3000/signup',{
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const responseData = await res.json();
    if(!responseData.error){
        localStorage.setItem('username', data.name) 
        return {
            status: "success",
            message: "Registered and logged in!"
        }
    }
    return {
        status: "error",
        message: responseData.message
    }
    
    
}

export async function login(data: {name: string}){
      const res = await fetch('http://localhost:3000/login',{
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const responseData = await res.json();
    console.log(responseData);
    if(!responseData.error){
        localStorage.setItem('username', data.name) 
        return {
            status: "success",
            message: "Logged in successfully!"
        }
    }
    return {
        status: "error",
        message: responseData.message
    }
        
}