package com.example.emp_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    // List<Employee> employees = new ArrayList<>();
    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return "Saved Successfully!";
    }

    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();
        for(EmployeeEntity emp : employeeEntities){
            Employee e = new Employee();
            BeanUtils.copyProperties(emp, e);
            employees.add(e);
        }
        return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        // employees.remove(id);
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp);
        return true;
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity existingEmployeeEntity = employeeRepository.findById(id).get();
        existingEmployeeEntity.setName(employee.getName());
        existingEmployeeEntity.setPhone(employee.getPhone());
        existingEmployeeEntity.setEmail(employee.getEmail());
        employeeRepository.save(existingEmployeeEntity);
        return "update Successfully!";
    }

    @Override
    public Employee readEmployee(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        Employee emp = new Employee();
        BeanUtils.copyProperties(employeeEntity, emp);
        return emp;
    }

}
