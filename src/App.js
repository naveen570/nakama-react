import logo from './logo.svg';
import './App.css';
import { Client } from '@heroiclabs/nakama-js';
const HTTP_KEY="testkey"
const END_POINT="ec2-3-109-250-52.ap-south-1.compute.amazonaws.com"
const PORT="7350"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// async function  connection(){
//   try{
//     let client =new Client(HTTP_KEY,END_POINT,PORT);
//     client.useSSL=true;
//     let create=false;
//     let email = "testfinal@final.com";
//     let password = "Password123";

//     console.log(client.authenticateEmail)
//     const session = await client.authenticateEmail(
//       email, password,create,"test",null);
//     console.info(session);

//   }
//   catch(err){
//     console.log(err)
//   }
// }
const createAccount=async(username,email,password)=>{
 try{ let client =new Client(HTTP_KEY,END_POINT,PORT);
  client.useSSL=true;
  let create=true;
  client.timeout = 10;
  const session = await client.authenticateEmail(
    email, password,create,username,null);
  // console.table("session created:",session);
  getAccount(session)
  return session;
}
  catch(err){
    console.log("err in createAccount",err)
  }
}
const getAccount=async(session)=>{
  try{let client =new Client(HTTP_KEY,END_POINT,PORT);
  client.useSSL=true;
  client.timeout = 10;
  const account=await client.getAccount(session);
  console.log(account)}
  catch(err){
    console.log("err at getAccount",err)
  }
}
 const x=async()=>{
  const a= await createAccount("naveen","test@final.com","password")
  const b= await createAccount("naveen","test@final.com","password")
  console.log(a)
  console.log(b)
  console.log(a===b)
 }

const createSocket=async ()=>{
  let client =new Client(HTTP_KEY,END_POINT,PORT);
  const session=await createAccount("naveen","test@final.com","password")
  const socket = client.createSocket();
  let appearOnline = true;
  let connectionTimeout = 30;
  await socket.connect(session, appearOnline, connectionTimeout);
  console.log("socket created",socket)
}
createSocket()
export default App;
