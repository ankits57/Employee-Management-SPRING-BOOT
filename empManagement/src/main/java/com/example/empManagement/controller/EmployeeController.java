package com.example.empManagement.controller;

import com.example.empManagement.entity.Employee;
import com.example.empManagement.service.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    public EmployeeServices employeeServices;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return ResponseEntity.ok(employeeServices.getAllEmployees());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        return ResponseEntity.ok(employeeServices.getEmployeeById(id));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/new-employee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        return ResponseEntity.ok(employeeServices.createEmployee(employee));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/update-employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        return ResponseEntity.ok(employeeServices.updateEmployee(id, employee));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id){
        employeeServices.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

}
