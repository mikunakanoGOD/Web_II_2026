const deleteData=()=>{
    fetch(`${API_URL}/1`,{
        method:"DELETE"
    })
    .then(Response =>{
            if(!Response.ok){
                throw new Error(`HTTP error! estado: ${Response.status}`);
            }
            showResult({
            message:"Post con el id 1 eliminado",
            status:Response.status
        });
    })
    .catch(error =>showResult(error.message,true));
}