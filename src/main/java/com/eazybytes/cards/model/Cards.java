package com.eazybytes.cards.model;


import java.time.LocalDate;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "Cards", uniqueConstraints = {@UniqueConstraint(columnNames = {"card_id"})})
@Data
public class Cards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private int cardId;

    @Column(name = "customer_id")
    private int customerId;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "total_limit")
    private int totalLimit;

    @Column(name = "amount_used")
    private int amountUsed;

    @Column(name = "available_amount")
    private int availableAmount;

    @Column(name = "create_dt")
    private LocalDate createDt;

}
