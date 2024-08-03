package dev.server.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ItemService {
    @Autowired
    private final ItemRepository itemRepository;

    public Product createItem(Product product) {
        return itemRepository.save(product);
    }

    public List<Product> getItems(Long userId) {
        return itemRepository.findByUserId(userId);
    }

    public void deleteItem(Long userId, Long productId) {
        itemRepository.deleteByIdAndUserId(productId, userId);
    }

    public Product editItem(Long userId, Long productId, Product product) {
        Product existingProduct = itemRepository.findByIdAndUserId(productId, userId).orElseThrow();

        existingProduct.setName(product.getName());
        existingProduct.setCount(product.getCount());
        existingProduct.setExpiration(product.getExpiration());
        existingProduct.setCategory(product.getCategory());

        return itemRepository.save(existingProduct);
    }
}
