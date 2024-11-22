import express, {Express} from "express"
import path from "path"
import router from "./src/index"

const app: Express = express()
const port: number = 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.use("/", router)


app.use(express.static(path.join(__dirname, "../public")))