package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.model.Support;
import com.example.springapp.service.SupportService;

import org.json.JSONObject;

@CrossOrigin(origins = "https://8081-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/support")
public class SupportController {

    private final SupportService supportService;

    @Autowired
    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }

    @PostMapping
    public Support registerSupport(@RequestBody String jsonSupport) {
        JSONObject supportData = new JSONObject(jsonSupport);
        String userName = supportData.getString("userName");
        String email = supportData.getString("email");
        String mobile = supportData.getString("mobile");
        String message = supportData.getString("message");
        String query = supportData.getString("query");

        Support support = new Support(userName, email, mobile, message, query);
        return supportService.saveSupport(support);
    }
}
