package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Support;
import com.example.springapp.repository.SupportRepository;

@Service
public class SupportService{

    private final SupportRepository supportRepository;

    @Autowired
    public SupportService(SupportRepository supportRepository) {
        this.supportRepository = supportRepository;
    }


    public Support saveSupport(Support support) {
        return supportRepository.save(support);
    }
}
