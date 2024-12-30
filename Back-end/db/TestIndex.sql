USE SUSHISTORE_MANAGEMENT
Go

select EmployeeName,EmployeeGender,EmployeeBirth,BranchName 
from EMPLOYEE e
join BRANCH b on b.BranchID = e.BranchID
where EmployeePhone Like '1%'
group by EmployeeName,EmployeeGender,EmployeeBirth,BranchName 

CREATE NONCLUSTERED INDEX IX_Employee
ON EMPLOYEE(BranchID,EmployeePhone) 
INCLUDE(EmployeeName,EmployeeGender,EmployeeBirth)

CREATE NONCLUSTERED INDEX IX_DISH_DishName 
ON DISH(DishName)
INCLUDE (Price);

DROP INDEX IX_Employee ON EMPLOYEE;

select* from EMPLOYEE
where DepartmentID = 1

UPDATE EMPLOYEE
SET Salary = NULL;
WITH SalaryByDepartment AS (
    SELECT 
        DepartmentID,
        MIN(EmployeeID) AS RepresentativeEmployee, 
        FLOOR(8000000 + (15000000 - 8000000) * (DepartmentID % 100) / 99.0) AS Salary 
    FROM [SUSHISTORE_MANAGEMENT].[dbo].[EMPLOYEE]
    GROUP BY DepartmentID
)
UPDATE E
SET Salary = S.Salary
FROM [SUSHISTORE_MANAGEMENT].[dbo].[EMPLOYEE] E
JOIN SalaryByDepartment S
ON E.DepartmentID = S.DepartmentID;