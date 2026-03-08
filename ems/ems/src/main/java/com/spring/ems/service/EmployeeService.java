package com.spring.ems.service;

import com.spring.ems.dao.EmployeeRepository;
import com.spring.ems.dao.EmployeeRoleRepository;
import com.spring.ems.entity.Employee;
import com.spring.ems.entity.EmployeeRequest;
import com.spring.ems.entity.EmployeeRole;
import com.spring.ems.exception.EmployeeException;
import com.spring.ems.mapper.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private EmployeeRoleRepository employeeRoleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder,EmployeeRoleRepository employeeRoleRepository) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.employeeRoleRepository = employeeRoleRepository;
    }

    public Page<EmployeeDto> findAll(Pageable pageable) {
        return employeeRepository.findAll(pageable).map(this::convertToDto);
    }

    public EmployeeDto convertToDto(Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();

        employeeDto.setId(employee.getId());
        employeeDto.setFirstName(employee.getFirstName());
        employeeDto.setLastName(employee.getLastName());
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setRole(employee.getEmployeeRole().getRole());

        return employeeDto;
    }

    public Employee convertToEntity(EmployeeDto employeeDto) {
        Employee employee = new Employee();

        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        return employee;
    }

    public EmployeeDto save(EmployeeRequest request) {
        Employee employee = new Employee();
        EmployeeRole employeeRole = new EmployeeRole();

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());

        employeeRole.setEmail(request.getEmail());
        employeeRole.setPassword(passwordEncoder.encode(request.getPassword()));
        employeeRole.setRole("ROLE_EMPLOYEE");
        employeeRole.setEnabled(true);

        employeeRole.setEmployee(employee);
        employee.setEmployeeRole(employeeRole);

        employeeRepository.save(employee);
        return convertToDto(employee);
    }

    public EmployeeDto update(Long employeeId, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EmployeeException("Employee not found with id: " + employeeId));
        EmployeeRole employeeRole = employeeRoleRepository.findById(employeeId)
                .orElseThrow(() -> new EmployeeException("Employee role not found with id: " + employeeId));

        if (employeeDto.getFirstName() != null) {
            employee.setFirstName(employeeDto.getFirstName());
        }
        if (employeeDto.getLastName() != null) {
            employee.setLastName(employeeDto.getLastName());
        }
        if (employeeDto.getEmail() != null) {
            employee.setEmail(employeeDto.getEmail());
            employeeRole.setEmail(employeeDto.getEmail()); // keep email in sync
        }

        employeeRole.setEmployee(employee);
        employee.setEmployeeRole(employeeRole);

        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDto(savedEmployee);
    }

    public void delete(Long employeeId) {
        Optional<Employee> employee =  employeeRepository.findById(employeeId);
        if (employee.isPresent()) {
            employeeRepository.delete(employee.get());
        }
        else {
            throw new EmployeeException("Employee with id " + employeeId + " does not exist");
        }
    }

    public List<EmployeeDto> findByEmail(String email) {
        return employeeRepository.findByEmail(email).stream().map(this::convertToDto).toList();
    }

    public void promote(Long  employeeId) {
        Optional<EmployeeRole> employeeRole =  employeeRoleRepository.findById(employeeId);
        if (employeeRole.isPresent()) {
            employeeRole.get().setRole("ROLE_ADMIN");
            employeeRoleRepository.save(employeeRole.get());
        }
        else {
            throw new EmployeeException("Employee with id " + employeeId + " does not exist");
        }
    }
}
