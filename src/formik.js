import React, { useEffect,useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Formik} from "formik";
import DatePicker from "react-datepicker";  
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "react-datepicker/dist/react-datepicker.css";  

function Formikcomponent(){
    
    const [userStateData,setUserStateData]=useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());  
    const validateform=(formdata)=>{
        var errors={};
        if(formdata.firstname==='') errors.firstname=("firstname is required"); 
        if(formdata.lastname==='') errors.lastname=("lastname is required"); 
        if(formdata.email==='') errors.email=("email is required"); 
        if(formdata.mobilenumber==='') errors.mobilenumber=("mobilenumber is required"); 
        if(formdata.gender==='') errors.gender=("gender is required");
        if(formdata.bookname==='') errors.gender=("book name is required");
        if(formdata.issuedate==='') errors.issuedate=("issue date is required");
        if(formdata.returndate==='') errors.returndate=("return date is required");
        return errors;
       };

       useEffect(()=>{
        async function getData()
        {
            const response= await axios.get("https://632f42ebb56bd6ac45adc26a.mockapi.io/libraryuser");
            setUserStateData(response.data);
            
        }
        getData();
    },[]);
    
       const handleSubmit=async (formdata, { resetForm })=>{
        console.log(formdata);
        const response= await axios.post("https://632f42ebb56bd6ac45adc26a.mockapi.io/libraryuser",
       
        {
         fristname: formdata.fristname,
         lastname: formdata.lastname,
         email: formdata.email,
         mobilenumber: formdata.mobilenumber,
         gender: formdata.gender,
         issuedate: formdata.issuedate,
         returndate: formdata.returndate,
         bookname: formdata.bookname,
        });
        setUserStateData([...userStateData,response.data]);
        resetForm();
     
    };


    return(
       
         <div>
           
           <Formik
       initialValues={{
        firstname:"",   
        lastname:"",
        email:"",
        bookname:"",
        startDate:"",
        endDate:"",
        mobilenumber:"",
        gender:"",
       }}
       validate={(formdata)=>validateform(formdata)}
       onSubmit={handleSubmit}
     >
         {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         handleReset,
         isSubmitting,
       }) =>(
       
       <Box
       component="form"
       sx={{
         '& > :not(style)': { m: 1, width: '25ch' },
       }}
       noValidate
       autoComplete="off"
       onSubmit={handleSubmit}
       >
        {/* firtsname */}
       
       <TextField id="Firstname" 
       label="First Name" 
       variant="filled"
       name="firstname" 
       value={values.firstname}     
        onChange={handleChange}
        onBlur={handleBlur} /><br/>
        <span style={{color:"red"}}>{touched.firstname && errors.firstname}</span><br/>
       {/* Lastname */}
       <TextField id="Lastname" 
       label="Last Name" 
       name="lastname" 
       variant="filled"
       value={values.lastname}    
       onChange={handleChange}
       onBlur={handleBlur}   /><br/>
        <span style={{color:"red"}}>{touched.lastname && errors.lastname}</span><br/>
        {/* Email */}
       <TextField id="Email" 
       label="Email address" 
        name="email" 
       value={values.email}
       type="email"
       variant="filled"       
       onChange={handleChange}
       onBlur={handleBlur}/><br/>
        <span style={{color:"red"}}>{touched.email && errors.email}</span><br/>
     
      {/* Mobilenumber */}
       <TextField id="Mobilenumber" 
       label="Mobile number"
        name="mobilenumber"
        type="number"  
       value={values.mobilenumber}
       variant="filled"             
       onChange={handleChange}
       onBlur={handleBlur}/><br/>
        <span style={{color:"red"}}>{touched.mobilenumber && errors.mobilenumber}</span><br/>
       {/* gender */}
       <FormControl>
       <FormLabel id="demo-radio-buttons-group-label">Gender  </FormLabel>
       <RadioGroup
         aria-labelledby="demo-radio-buttons-group-label"
         name="gender"
         value={values.gender}
         onChange={handleChange}
         onBlur={handleBlur}
       >
         <FormControlLabel value="male" control={<Radio />} label="male" />
         <FormControlLabel value="female" control={<Radio />} label="female" />
         </RadioGroup>
         <span style={{color:"red"}}>{touched.gender && errors.gender}</span><br/>
     </FormControl><br/>
     {/* bookname */}
     <TextField id="Bookname" 
       label="Book Name" 
       name="bookname" 
       variant="filled"
       value={values.bookname}    
       onChange={handleChange}
       onBlur={handleBlur}   /><br/>
        <span style={{color:"red"}}>{touched.bookname && errors.bookname}</span><br/>
          {/* issuedate */}
          <span>Issue date</span>
         <DatePicker selected={startDate} value={values.startDate} onChange={(date:Date) => setStartDate(date)} /> <br/>

         {/* returndate */}   
         <span>return date</span>  
        <DatePicker selected={endDate}  value={values.endDate} onChange={(date:Date) => setEndDate(date)} /><br/>

     <Button variant="contained" type="submit" disabled={isSubmitting} >Submit</Button>
       </Box>
       )}
       </Formik>

       <h4> User data</h4>
        <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">mobile number</TableCell>
            <TableCell align="right">gender</TableCell>
            <TableCell align="right">bookname</TableCell>
            <TableCell align="right">Issue date</TableCell>
            <TableCell align="right">Return date</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {userStateData.map((row) => (
              <TableRow
                key={row.id}
                
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.firstname}</TableCell> 
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.mobilenumber}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                 <TableCell align="right">{row.bookname}</TableCell>
                 <TableCell align="right">{row.issuedate}</TableCell>
                 <TableCell align="right">{row.returndate}</TableCell>
                <TableCell>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

        </div>
       
    );
}
export default Formikcomponent;