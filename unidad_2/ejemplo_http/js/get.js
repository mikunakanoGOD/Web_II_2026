const API_URL = "http://localhost:3001/posts";
const getData=()=>{
    fetch(API_URL)//conexion a servidor
        .then(Response =>{
            if(!Response.ok){
                throw new Error(`HTTP error! estado: ${Response.status}`);
            }
            return Response.json();
        }).then(data => showResult(data)).catch(error =>showResult(error.message,true));
}