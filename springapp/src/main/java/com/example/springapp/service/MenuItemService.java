package main.java.com.example.springapp.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.java.com.example.springapp.model.MenuItem;
import com.example.springapp.repository.MenuItemRepository;

import java.util.List;

@Service
public class MenuItemService {
    private MenuItemRepository menuItemRepository;

    @Autowired
    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public boolean createMenuItem(MenuItem menuItem) {
        menuItemRepository.save(menuItem);
        return true;
    }

    public List<MenuItem> getAllMenuItem() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id).orElse(null);
    }
}