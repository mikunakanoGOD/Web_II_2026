const putData=()=>{
    const updateData={
        titulo: "ACTUALIZADO",
        descripcion: "ACTUALIZADO",
        fecha: new Date().toISOString()
    };
    fetch(`${API_URL}/1`,{
        method:"PUT",
            headers:{"Content-type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(updateData)
    })
    .then(Response =>{
            if(!Response.ok){
                throw new Error(`HTTP error! estado: ${Response.status}`);
            }
            return Response.json();
        }).then(data => showResult(data)).catch(error =>showResult(error.message,true));
}