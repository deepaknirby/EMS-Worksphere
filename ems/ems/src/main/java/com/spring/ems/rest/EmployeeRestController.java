package com.spring.ems.rest;

import com.spring.ems.entity.EmployeeRequest;
import com.spring.ems.mapper.EmployeeDto;
import com.spring.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EmployeeRestController {
    private EmployeeService employeeService;

    @Autowired
    public EmployeeRestController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/employees")
    public Page<EmployeeDto> findAll(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return employeeService.findAll(pageable);
    }

    @PostMapping("/employees")
    public EmployeeDto save(@RequestBody EmployeeRequest employeeRequest) {
        return employeeService.save(employeeRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/employees/{employeeId}")
    public EmployeeDto update(@PathVariable Long employeeId, @RequestBody EmployeeDto employeeDto) {
        return employeeService.update(employeeId, employeeDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/employees/{employeeId}/promote")
    public void promote(@PathVariable Long employeeId) {
        employeeService.promote(employeeId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employees/{employeeId}")
    public void deleteById(@PathVariable Long employeeId) {
        employeeService.delete(employeeId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/employees/me")
    public EmployeeDto getMe(Authentication authentication) {
        return employeeService.findByEmail(authentication.getName()).get(0);
    }
}
