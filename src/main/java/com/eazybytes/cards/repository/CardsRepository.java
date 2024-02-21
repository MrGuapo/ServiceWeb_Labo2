package com.eazybytes.cards.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eazybytes.cards.model.Cards;

@Repository
public interface CardsRepository extends JpaRepository<Cards, Integer> {
    List<Cards> findByCustomerId(int customerId);

    Cards findByCardNumber(String cardNumber);

    void deleteByCardNumber(String cardNumber);

    void deleteCardsByCustomerId(int customerId);

    List<Cards> findByCardType(String cardType);
}