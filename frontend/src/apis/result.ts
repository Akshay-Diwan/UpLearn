export async function submitQuiz(){
    const data = localStorage.getItem("learningTypeQuiz")
    const username = localStorage.getItem("username");
    if(!username) return;
    const fetchAI = fetch(import.meta.env.AI_BACKEND_URL +"/result", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "X-username": username
        },
        body: data
    })
    const fetchDB = fetch(import.meta.env.BACKEND_URL+"/quiz", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "X-username": username
        }
    })
    const [res, dbRes] = await Promise.all([fetchAI, fetchDB])
    const responseData = await res.json();
    console.log("Db response : " + dbRes);
    console.log(responseData)
}

export async function getResult(){
    const username = localStorage.getItem("username");
    if(!username) return;
    const res = await fetch(import.meta.env.BACKEND_URL + "/learningStyle", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "X-username": username
        }
    })
    const responseData = await res.json();
    console.log(responseData)
}