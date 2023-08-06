import { useState } from "react";
import memContext from "./memContext";


const MemState = (props) => {
  const host = "http://localhost:5000"
  const memInitial = [];
  const [mem, setMem] = useState(memInitial);
  const reqmemInitial=[]
  const [reqmem, setreqMem]=useState(reqmemInitial)
  // Get all Notes
  const getMema = async () => {
    // API Call 
    const response = await fetch(`${host}/api/Adminfun/getappmembers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      }
      
    });
    const json = await response.json() 
    setMem(json)
  }
  const getMemm = async () => {
    // API Call 
    const response = await fetch(`${host}/api/Mem/getappmembers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      }
      
    });
    const json = await response.json() 
    setMem(json)
  }
  //Approve
  const requestmem =async (id,memberid,parentid)=>{
    const response = await fetch(`${host}/api/Adminfun/approvemember/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": window.localStorage.getItem('token')
        },
        body: JSON.stringify({id, memberid, parentid})
      }
      
      );
      const newappmember=await response.json();
      

    }

    const getrequest = async ()=>{
        const response = await fetch(`${host}/api/Adminfun/getmember/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": window.localStorage.getItem('token')
            },
            
          }
          
          );
          const json =await response.json();
          setreqMem(json);

    }
   // Add a Note
  

  // Delete a Note
  const deleteMem = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/Mem/deletemember/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    const newMem = mem.filter((mem) => { return mem._id !== id })
    setMem(newMem)
  }

  const deleteMemm = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/Mem/deleterequest/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    const newreqMem = reqmem.filter((reqmem) => { return reqmem._id !== id })
    setreqMem(newreqMem)
  }

  // Edit a Note
  const editMem = async (id, memberid,Lastmonthsales,dailysales,Monthsales,GPG,rank,childranks) => {
    // API Call 
    const response = await fetch(`${host}/api/Mem/updateappmembers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      },
      body: JSON.stringify({memberid,Lastmonthsales,dailysales,GPG,Monthsales,rank,childranks})
    });
    const json = await response.json(); 

     let newMem = JSON.parse(JSON.stringify(mem))
    // Logic to edit in client
    for (let index = 0; index < newMem.length; index++) {
      const element = newMem[index];
      if (element._id === id) {
        newMem[index].memberid = memberid;
        newMem[index].Lastmonthsales = Lastmonthsales;
        newMem[index].dailysales = dailysales; 
        newMem[index].Monthsales = Monthsales;
        newMem[index].GPG = GPG;
        newMem[index].rank = rank;
        newMem[index].childranks = childranks;
        break; 
      }
    }  
    setMem(newMem);
  }
  
  return (
    <memContext.Provider value={{ mem,reqmem, getMema, deleteMem,editMem,getMemm,getrequest,requestmem,deleteMemm}}>
      {props.children}
    </memContext.Provider>
  )

}
export default MemState;