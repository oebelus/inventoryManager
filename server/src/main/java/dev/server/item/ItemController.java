package dev.server.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin
@RequestMapping(path = "api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping()
    public ResponseEntity<Product> postMethodName(@RequestBody Product product) throws Exception {
        Product createdProduct = itemService.createItem(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Product>> getItems(@PathVariable Long userId) {
        List<Product> products = itemService.getItems(userId);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/delete/{userId}/{productId}")
    public void removeItem(@PathVariable Long userId, @PathVariable Long productId) {
        itemService.deleteItem(userId, productId);
    }

    @PutMapping("edit/{userId}/{productId}")
    public Product editItem(@PathVariable Long userId, @PathVariable Long productId, @RequestBody Product product) {
        return itemService.editItem(userId, productId, product);
    }
}
