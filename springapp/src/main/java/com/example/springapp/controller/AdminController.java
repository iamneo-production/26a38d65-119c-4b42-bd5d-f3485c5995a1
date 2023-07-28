package com.example.springapp.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.exception.OrderNotFinishedException;
import com.example.springapp.exception.PasswordNotMatchException;
import com.example.springapp.exception.UserAlreadyExistException;
import com.example.springapp.exception.UserNotExistException;
import com.example.springapp.model.Admin;
import com.example.springapp.service.AdminService;

import java.util.Optional;

@CrossOrigin(origins = "https://8081-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody String jsonUser)
            throws UserNotExistException, PasswordNotMatchException {
        JSONObject user = new JSONObject(jsonUser);
        String userName = user.getString("userName");
        String password = user.getString("password");
        Optional<Admin> admin = adminService.getAdminByUserName(userName);

        if (admin.isEmpty()) {
            throw new UserNotExistException("Admin doesn't exist");
        }

        if (!adminService.passwordMatch(admin.get().getId() + "", password)) {
            throw new PasswordNotMatchException("Password doesn't match");
        }

        return admin.get();
    }

    @PostMapping(path = "/logout")
  public int logoutCustomer() {
    System.out.println("logout the user");
    return 1;
  }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({UserNotExistException.class, PasswordNotMatchException.class,
      })
  public String handleException(Exception e) {
    return e.getMessage();
  }
}