package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Admin;
import com.example.springapp.repository.AdminRepository;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> getAdminByUserName(String userName) {
        return adminRepository.findByUserName(userName);
    }

    public boolean passwordMatch(String adminId, String providedPassword) {

        Optional<Admin> adminOptional = adminRepository.findById(Long.parseLong(adminId));

        if (adminOptional.isEmpty()) {
            return false;
        }

        Admin admin = adminOptional.get();

        // Compare the provided password with the stored password as plain strings
        return providedPassword.equals(admin.getPassword());
    }
  
}
