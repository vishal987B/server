const express = require("express");
const router = express.Router();
const employee = require("../model/empModel");

// create employee details
router.post("/create-emp", async (req, res) => {
  const { empId , name , status , joiningDate , dob, skills , salary , address } = req.body;
  if (!empId || !name || !status || !joiningDate || !dob || !skills || !salary || !address) {
    res.status(400).json("Please fill all the fields");
  } else {
    try {
      const isAlreadyExists = await employee.findOne({ empId: empId });
      if (isAlreadyExists) {
        res.status(403).json({ message: "Employee Already Exists!!" });
      } else {
        const newEmp = new employee({
          empId, 
          name, 
          status,
          joiningDate,
          dob,
          skills,
          salary,
          address
        });
        await newEmp.save();
        res
          .status(201)
          .json({ data: newEmp, message: "Record Created Successfully" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//####################### TO FETCH ALL DETAILS ##########################

router.get("/get-emp", async (req, res) => {
  const empData = await employee.find().select("-__v");
  res.status(200).json({ data: empData})
});

//####################### TO FETCH INDIVIDUAL EMPLOYEE ##########################

router.get("/get-single-emp/:id", async (req, res) => {
  const singleEmpData = await employee.findOne({ _id : req.params.id }).select("-__v");
  singleEmpData
    ? res.status(200).json({ data: singleEmpData })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
    res.status(400).json({ error: "Oops, Something went wrong!!" });
});

//####################### TO UPDATE INDIVIDUAL EMPLOYEE ##########################

router.patch("/update/:id", async (req, res) => {
  try{

  
  const updatedEmpData = await employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updatedEmpData
    ? res.status(200).json({ data: updatedEmpData, message:"Details Updated Successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
  }catch (err){
    res.status(404).json({ error: err.message });
  }
});

//####################### TO DELETE INDIVIDUAL EMPLOYEE ##########################

router.delete("/delete/:id", async (req, res) => {
  try{

  
  const { id } = req.params;
  const deletedEmpData = await employee.findByIdAndDelete({ _id : id });
  deletedEmpData
    ? res.status(200).json({ data: deletedEmpData,message:"Employee Deleted Successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });

  }catch(err){
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;