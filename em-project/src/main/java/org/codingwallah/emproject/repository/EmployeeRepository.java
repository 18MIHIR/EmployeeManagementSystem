package org.codingwallah.emproject.repository;

import org.codingwallah.emproject.entity.EmployeeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    
    // Search by name (case-insensitive)
    List<EmployeeEntity> findByNameContainingIgnoreCase(String name);
    
    // Search by email
    List<EmployeeEntity> findByEmailContainingIgnoreCase(String email);
    
    // Search by phone
    List<EmployeeEntity> findByPhoneContaining(String phone);
    
    // Search by name with pagination
    Page<EmployeeEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    // Combined search query
    @Query("SELECT e FROM EmployeeEntity e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "e.phone LIKE CONCAT('%', :keyword, '%')")
    List<EmployeeEntity> searchEmployees(@Param("keyword") String keyword);
    
    // Combined search with pagination
    @Query("SELECT e FROM EmployeeEntity e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "e.phone LIKE CONCAT('%', :keyword, '%')")
    Page<EmployeeEntity> searchEmployees(@Param("keyword") String keyword, Pageable pageable);
}
