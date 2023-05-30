import app from ".//utils/create.server"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listining to port at ${PORT}`)
})
