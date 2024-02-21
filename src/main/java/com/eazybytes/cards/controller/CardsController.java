package com.eazybytes.cards.controller;

import com.eazybytes.cards.model.Cards;
import com.eazybytes.cards.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Eazy Bytes
 */

@RestController
public class CardsController {

    @Autowired
    private CardService cardService;


    @Operation(summary = "get card by id")
    @GetMapping("/myCard/{id}")
    public Cards getCardDetails(@PathVariable("id") int id) {
        return cardService.getCardById(id);
    }


    @Operation(summary = "get all cards")
    @GetMapping("/AllCards")
    public List<Cards> getAllCards() {
        return cardService.getAllCards();
    }

    @Operation(summary = "create a new card")
    @PostMapping("/newCard")
    public String newCard(@RequestBody Cards card) {
        return cardService.saveCard(card);
    }

    @Operation(summary = "update card by id")
    @PutMapping("/update/{id}")
    public String updateCard(@PathVariable("id") int id, @RequestBody Cards updateCard) {
        return cardService.updateCard(id, updateCard);
    }

    @Operation(summary = "delete card by id")
    @DeleteMapping("/deleteCard/{id}")
    public String deleteCard(@PathVariable("id") int id) {
        return cardService.deleteCard(id);
    }

    @Operation(summary = "Supprime une carte spécifique à l'aide de son numéro")
    @DeleteMapping("/deleteCardByNumber/{cardNumber}")
    public ResponseEntity<String> deleteCardByNumber(@PathVariable("cardNumber") String cardNumber) {
        return cardService.deleteCardByNumber(cardNumber);
    }

    @Operation(summary = "Supprime toutes les cartes associés à un client donné")
    @DeleteMapping("/deleteCardsByCustomerId/{customerId}")
    public ResponseEntity<String> deleteCardsByCustomerId(@PathVariable("customerId") String customerId) {
        return cardService.deleteCardsByCustomerId(Integer.parseInt(customerId));
    }

    @Operation(summary = "Supprime un ensemble de cartes spécifiées par leurs IDs")
    @DeleteMapping("/deleteMultipleCardsByCardIds")
    public ResponseEntity<String> deleteCardsByCardIds(@RequestBody List<Integer> cardIds) {
        return cardService.deleteMultipleCardsByCardIds(cardIds);
    }

    @Operation(summary = "Met à jour la limite de crédit d'une carte spécifique")
    @PutMapping("/updateCardLimit/{cardId}")
    public ResponseEntity<String> updateCardLimit(@PathVariable("cardId") int cardId, @RequestBody int newCardLimit) {
        return cardService.updateCardLimit(cardId, newCardLimit);
    }

    @Operation(summary = "Récupère toutes les cartes d'un type spécifié")
    @GetMapping("/AllCardsByCardType/{cardType}")
    public ResponseEntity<List<Cards>> getAllCardsByCardType(@PathVariable("cardType") String cardType) {
        return cardService.getAllCardsByCardType(cardType);
    }
}