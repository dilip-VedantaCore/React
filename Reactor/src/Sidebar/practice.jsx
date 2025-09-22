import React from 'react'
import { useState } from "react";
export default function Practice() {
    const [fname, setFname] = useState('');
    const [lname,setLname]=useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [gender,setGender]=useState('male');
    //const [subject,setSubject]=useState({english:false,maths:false,science:true});
    const [resume,setResume]=useState('');
    const [url,setUrl]=useState('');
    const [selection,setSelection]=useState('Python Programming');
    const [about,setAbout]=useState('');
    function handleSubmit(event) {
        event.preventDefault();
        console.log(fname,lname,email,contact,gender
            ,resume,url,selection,about);

    }
    const handleReset=()=>{
        setFname('');
        setLname('');
        setEmail('');
        setContact(''); 
        setGender('');
        //setSubject({english:false,maths:false,science:true});
        setResume('');
        setUrl('');
        setSelection('Python Programming');
        setAbout('');
    };
//     const handleSubjectChange=(subj)=>{
// setSubject((prevSubj)=>({...prevSubj,[subj]:!prevSubj[subj]}));
//     };
  return(
    <>
    <form action="#" method="get" >
        <h1>Form in React</h1>
    FirstName:<input type="text" value={fname} onChange={(e)=>setFname(e.target.value)} placeholder='Enter first name' /><br/><br/>

    LastName:<input type={"text"}  placeholder='Enter Last Name' 
    value={lname} onChange={(e)=>setLname(e.target.value)} /><br/><br/>

    Enter Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="ENter emailID"/><br/><br/>
    
    Contact:<input type="number" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Enter Mobile Number"/><br/><br/>
    
    Gender:
    <label>
        <input type="radio" name="gender" value="male" checked={gender==='male'}
        onChange={(e)=>setGender(e.target.value)} /> Male
    </label>

    <label>
        <input type="radio" name="gender" value="female"
        checked={gender==='female'} onChange={(e)=>setGender(e.target.value)} /> Female
    </label><br/><br/>
    
    
    {/* Your Best Subject:<checkbox name="subject" value="Maths">Maths</checkbox>
   <checkbox name="subject" value="Science">Science</checkbox>
   <checkbox name="subject" value="English">English</checkbox><br/><br/>     */}
    
    Upload Resume:<input type="file" onChange={(e)=>setResume(e.target.value)}placeholder="upload your resume here"/><br/><br/>
   
    Enter Project Link:<input type="url" onChange={(e)=>setUrl(e.target.value)} placeholder="Enter project Drive Link"/><br/><br/>
    
 Search:<input type="search" placeholder="Search here"/><br/><br/>
    
    Select your Coding Internship:
     <select name="internship" id="internship">
    <option value="Python Programming">Python Programming</option>
    <option value="Java Development">Java Development</option>
    <option value="Web Developer">Web Developer</option>
    <option value="Data Science">Data Science</option>
    <option value="AI/ML">AI/ML</option>
    <option value="App Development">App Development</option>
    </select><br/><br/>

    About:<textarea name="about" id="about" cols="30" rows="10"
    onChange={(e)=>setAbout(e.target.value)}
    placeholder="Write about yourself here"></textarea><br/><br/>
    agree to terms and conditions:<input type="checkbox" name="terms" value="agree"/>I agree to all the terms and conditions<br/><br/>

    <input type="reset" value="reset"  onClick={()=>handleReset()} />

    <input type="submit" value="submit" onChange={(e)=>handleSubmit(e)} />
    </form>
        
    </>
  );
}
