const fs=require("fs")

// const data=fs.readFileSync("assets/poem.txt", {encoding:"utf8"})
// console.log(data)

// fs.readFile("assets/poem.txt", {encoding:"utf8"},(err,data)=>{
//     console.log(data)
// })

// const fsPromise=require("fs/promises")

// async function main(){
//     const data=await fsPromise.readFile("assets/poem.txt",{encoding:"utf8"})
//     console.log(data)
// }

// main();

// fs.writeFileSync("assets/output.txt","Hello, freeCodeCamp!");

// fs.appendFileSync("assets/output.txt","\nSecond line");

// const exist=fs.existsSync("assets/output.txt");

// console.log(exist)

// const entries=fs.readdirSync("assets");
// console.log(entries)

// const buf=Buffer.from("Hello, Node!")
// console.log(buf)
// console.log(buf.toString("hex"))
// console.log(buf.toString("base64"))

// const buf2=Buffer.alloc(8,0xff)
// console.log(buf2)

// const decoded=Buffer.from("ZnJlZUNvZGVDYW1w","base64").toString("utf8")
// console.log(decoded)

const crypto=require("crypto")
// const hash=crypto.createHash('sha256').update('freeCodeCamp!').digest("hex")
// console.log(hash)

// const random=crypto.randomBytes(16).toString("hex")
// console.log(random)

// const id=crypto.randomUUID()
// console.log(id)

const os=require("os")

// console.log(os.platform())
// console.log(os.arch())
// console.log(os.hostname())

// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.uptime())

// console.log(os.cpus().length)

const path=require("path")
const fullpath=path.join(__dirname,"assets","poem.txt")
// console.log(fullpath)

// console.log(path.basename(fullpath))
// console.log(path.dirname(fullpath))
// console.log(path.extname(fullpath))

// console.log(path.join("assets","..","server.js"))
// console.log(path.resolve("assets","..","server.js"))

// const parts=path.parse(fullpath)
// console.log(parts)

// console.log(process.version)
// console.log(process.platform)
// console.log(process.env.NODE_ENV)

// console.log(process.argv)

// process.stdout.write("Hello ")
// process.stdout.write("from stdout\n")
// process.stderr.write("Hello from stderr\n")

const readable=fs.createReadStream("assets/poem.txt",{encoding:"utf8"})

// readable.on("data",(chunk)=>{
//     console.log(chunk)
// })

// readable.on("end",()=>{
//     console.log("Done reading")
// })

const writable=fs.createWriteStream("assets/stream-output.txt")

// writable.write("First Chunk\n")
// writable.write("Second chunk")
// writable.end

readable.pipe(writable)