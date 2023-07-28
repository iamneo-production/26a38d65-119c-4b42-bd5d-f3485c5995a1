package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.model.MenuItem;
import com.example.springapp.service.MenuItemService;

import java.util.List;

@RestController
@RequestMapping("/menu-item")
public class MenuItemController {
    private MenuItemService menuItemService;

    @Autowired
    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService= menuItemService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createMenuItem(@RequestBody MenuItem menuItem) {
        menuItemService.createMenuItem(menuItem);
    }

    @GetMapping
    public List<MenuItem> getAllMenuItem() {
        return menuItemService.getAllMenuItem();
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id);
    }

    @PutMapping
    public ResponseEntity<String> updateMenuItem(@RequestBody MenuItem menuItem) {
        boolean updated = menuItemService.updateMenuItem(menuItem);

         if (updated) {
          return ResponseEntity.ok("Menu item updated");
         } else {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update menu item");
    }
}
}