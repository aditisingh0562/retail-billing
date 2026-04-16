package com.retailbilling.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String invoiceNumber;
    
    @ManyToOne
    private Customer customer;
    
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL)
    private List<BillItem> items;
}
