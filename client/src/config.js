const config = {
    apiUrl: process.env.NODE_ENV === "production" ? "https://book-nugget.herokuapp.com/" : "http://localhost:8000",
    apiConfig: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

export default config