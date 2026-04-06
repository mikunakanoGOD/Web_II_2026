const postData = () => {
    const newPost = {
        titulo: "nuevo post",
        descripcion: "es un nuevo post creado",
        fecha: new Date().toISOString(),
    };
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newPost),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! estado: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => showResult(data))
        .catch((error) => showResult(error.message, true));
};