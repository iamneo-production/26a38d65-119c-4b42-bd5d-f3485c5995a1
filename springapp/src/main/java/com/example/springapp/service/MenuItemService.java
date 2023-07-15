package com.example.springapp.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.MenuItem;
import com.example.springapp.repository.MenuItemRepository;

import java.util.List;
import java.util.Optional;

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

    public boolean updateMenuItem(MenuItem menuItem) {
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findById(menuItem.getId());

        if (optionalMenuItem.isPresent()) {
            MenuItem existingMenuItem = optionalMenuItem.get();
            existingMenuItem.setName(menuItem.getName());
            existingMenuItem.setDescription(menuItem.getDescription());
            existingMenuItem.setPrice(menuItem.getPrice());
            existingMenuItem.setTags(menuItem.getTags());

            menuItemRepository.save(existingMenuItem);
            return true; 
        }

        return false; 
    }
}