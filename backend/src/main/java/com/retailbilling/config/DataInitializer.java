package com.retailbilling.config;

import com.retailbilling.entity.*;
import com.retailbilling.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .email("admin@retail.com")
                    .phone("1234567890")
                    .address("Retail HQ, Street 1")
                    .build());
        }
        if (customerRepository.count() == 0) {
            customerRepository.save(Customer.builder().name("Rahul").phone("9876543210").build());
            customerRepository.save(Customer.builder().name("Priya").phone("9876543211").build());
        }
        if (productRepository.count() == 0) {
            productRepository.save(Product.builder().name("Gaming Laptop").price(new BigDecimal("95000")).stock(5).build());
            productRepository.save(Product.builder().name("Wireless Mouse").price(new BigDecimal("1200")).stock(50).build());
            productRepository.save(Product.builder().name("Mechanical Keyboard").price(new BigDecimal("4500")).stock(20).build());
            productRepository.save(Product.builder().name("Smartphone S24").price(new BigDecimal("75000")).stock(15).build());
            productRepository.save(Product.builder().name("Noise Cancelling Headphones").price(new BigDecimal("15000")).stock(10).build());
            productRepository.save(Product.builder().name("USB-C Hub").price(new BigDecimal("2500")).stock(30).build());
            productRepository.save(Product.builder().name("Monitor 27 inch").price(new BigDecimal("22000")).stock(8).build());
            productRepository.save(Product.builder().name("External SSD 1TB").price(new BigDecimal("8000")).stock(25).build());
            productRepository.save(Product.builder().name("Webcam 1080p").price(new BigDecimal("3500")).stock(12).build());
            productRepository.save(Product.builder().name("Blue Light Glasses").price(new BigDecimal("999")).stock(100).build());
            productRepository.save(Product.builder().name("Desk Mat").price(new BigDecimal("1500")).stock(40).build());
            productRepository.save(Product.builder().name("Laptop Stand").price(new BigDecimal("2800")).stock(15).build());
        }
    }
}
