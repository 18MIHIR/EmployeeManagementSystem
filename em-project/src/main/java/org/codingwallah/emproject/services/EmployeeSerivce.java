package org.codingwallah.emproject.services;

import java.util.List;

import org.codingwallah.emproject.model.Employee;

public interface EmployeeSerivce {
    String createEmployee(Employee employee);
    List<Employee> readEmployees();
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, Employee employee);
    Employee readEmployee(Long id);
    
    // Search and filter methods
    List<Employee> searchEmployees(String keyword);
    List<Employee> filterByName(String name);
    List<Employee> filterByEmail(String email);
    List<Employee> filterByPhone(String phone);
}
