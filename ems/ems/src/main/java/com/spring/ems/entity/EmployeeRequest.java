package com.spring.ems.entity;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter


public class EmployeeRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
