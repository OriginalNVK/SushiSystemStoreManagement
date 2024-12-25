import { useEffect, useState } from "react";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getEmployees, deleteEmployee } from "../service/Services"; // Ensure `deleteEmployee` is imported
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [searchEmployee, setSearchEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
      setAllEmployees(data);
    };

    loadEmployees();
  }, []); // Added dependency array to prevent infinite re-rendering

  
  const handleEditEmployee = (employeeID) => {
    navigate(`/employee/${employeeID}`);
  };

  const handleDeleteEmployee = async (employeeID) => {
    if (!window.confirm(`Are you sure you want to delete employee ${employeeID}?`)) {
      return;
    }

    try {
      const response = await deleteEmployee(employeeID);
      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.EmployeeID !== employeeID)
        );
      } else {
        alert("Failed to delete employee");
        const message = await response.text();
        console.error(message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const searchEmployees = () => {
  let filtered = allEmployees;

  // Lọc theo tên nhân viên nếu có giá trị tìm kiếm
  if (searchEmployee) {
    filtered = employees.filter((employee) =>
      employee.EmployeeName.toLowerCase().includes(searchEmployee.toLowerCase())
    );
  }

  // Lọc theo phòng ban nếu có giá trị
  if (filterDepartment && filterDepartment !== "all") {
    filtered = filtered.filter((employee) =>
      employee.DepartmentName.toLowerCase() === filterDepartment.toLowerCase()
    );
  }

  // Cập nhật danh sách nhân viên
  setEmployees(filtered);
};

// Gọi `searchEmployees` khi `searchEmployee` hoặc `filterDepartment` thay đổi
useEffect(() => {
  searchEmployees();
}, [searchEmployee, filterDepartment]);

  const handleReset = async () => {
    setSearchEmployee("");
    setFilterDepartment("all");
    const data = await getEmployees();
    setEmployees(data);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold ">
            LIST EMPLOYEE
          </p>
          <Decorate />
        </div>
        <div className="flex items-center justify-between pb-4 w-8/12">
          <button className="border p-2 rounded-lg font-bold font-play text-xl bg-green text-white hover:bg-white hover:text-green transition-all duration-300"
                  onClick={() => navigate("/add-employee")}>Add employee</button>
          <div className="flex gap-2 lg:text-xl text-base font-play">
            <input
              type="text"
              placeholder="🔍 Employee Name"
              className="border rounded-md px-2 font-bold lg:w-52 w-[125px]"
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
            />
            <select
              className="border rounded-md font-bold px-2"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department.toLowerCase()}>
                  {department}
                </option>
              ))}
            </select>
            <div className="min-w-24">
              <button className="border p-2 rounded-lg font-bold font-play bg-green text-white hover:bg-white hover:text-green transition-all duration-300" onClick={handleReset}>🔄 Reset</button>
            </div>
          </div>
        </div>
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
          <thead className="table-header-group md:text-xl text-lg text-white">
            <tr className="table-row">
              <th key="No" className="table-cell border h-12 bg-red border-black">
                No
              </th>
              <th className="table-cell border h-12 bg-red border-black">Name</th>
              <th className="table-cell border h-12 bg-red border-black">Birthdate</th>
              <th className="table-cell border h-12 bg-red border-black">Gender</th>
              <th className="table-cell border h-12 bg-red border-black">Mobile Phone</th>
              <th className="table-cell border h-12 bg-red border-black">Address</th>
              <th className="table-cell border h-12 bg-red border-black">BranchID</th>
              <th className="table-cell border h-12 bg-red border-black">DepartmentID</th>
              <th className="table-cell border h-12 bg-red border-black">Entry date</th>
              <th className="table-cell border h-12 bg-red border-black">Salary</th>
              <th className="table-cell border h-12 bg-red border-black">History Employee</th>
              <th className="table-cell border h-12 bg-red border-black">Actions</th>
            </tr>
          </thead>
          <tbody className="md:text-lg text-base">
            {employees.map((employee) => (
              <tr key={employee.EmployeeID}>
                <td className="border p-1">{employee.EmployeeID}</td>
                <td className="border px-1">{employee.EmployeeName}</td>
                <td className="border px-1">{employee.EmployeeBirth}</td>
                <td className="border px-1">{employee.EmployeeGender}</td>
                <td className="border px-1">{employee.EmployeePhone}</td>
                <td className="border px-1">{employee.EmployeeAddress}</td>
                <td className="border px-1">{employee.BranchID}</td>
                <td className="border px-1">{employee.DepartmentID}</td>
                <td className="border px-1">{employee.EntryDate}</td>
                <td className="border px-1">{employee.Salary}</td>
                <td className="border px-1">
                  <button
                    type="button"
                    className="border text-yellow px-2 py-1 rounded hover:opacity-80 text-center"
                  >
                    Check history
                  </button>
                </td>
                <td className="border p-1">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                      onClick={() => handleEditEmployee(employee.EmployeeID)}
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteEmployee(employee.EmployeeID)}
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Employee;