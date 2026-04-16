package com.retailbilling.controller;

import com.retailbilling.entity.Bill;
import com.retailbilling.entity.Product;
import com.retailbilling.repository.BillRepository;
import com.retailbilling.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BillController {
    private final BillRepository billRepository;
    private final ProductRepository productRepository;

    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        bill.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        bill.setCreatedAt(LocalDateTime.now());
        
        if (bill.getItems() != null) {
            bill.getItems().forEach(item -> {
                Product p = productRepository.findById(item.getProduct().getId()).orElseThrow();
                p.setStock(p.getStock() - item.getQuantity());
                productRepository.save(p);
            });
        }
        
        return billRepository.save(bill);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}
