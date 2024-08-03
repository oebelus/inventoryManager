package dev.server.item;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ItemRepository extends JpaRepository<Product, Long> {

    List<Product> findByUserId(Long userId);

    void deleteByIdAndUserId(Long productId, Long userId);

    Optional<Product> findByIdAndUserId(Long productId, Long userId);
}
