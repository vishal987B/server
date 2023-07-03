const xlsx = require('xlsx');
const employee = require('../model/empModel')
const Employee = employee;
const importEmp = async(req , res) =>{
    try{

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];
    
    const employees = data.slice(1).map((row) => {
      const employee = {};
      headers.forEach((header, index) => {
        employee[header] = row[index];
      });
      return employee;
    });
    Employee.insertMany(employees)
      .then(() => {
        res.json({ message: 'Data imported successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    console.error('Failed to import data:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
    importEmp
}