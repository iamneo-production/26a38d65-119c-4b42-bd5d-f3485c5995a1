package main.java.com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import main.java.com.example.springapp.model.MenuItem;
import com.example.springapp.repository.MenuItemRepository;

import java.util.List;

@RestController
@RequestMapping("/menu-item")
public class MenuItemController {
    private MenuItemRepository menuItemRepository;

    @Autowired
    public MenuItemController(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createMenuItem(@RequestBody MenuItem menuItem) {
        menuItemRepository.save(menuItem);
    }

    @GetMapping
    public List<MenuItem> getAllMenuItem() {
        return menuItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {
        return menuItemRepository.findById(id).orElse(null);
    }
}