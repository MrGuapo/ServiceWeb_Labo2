package com.eazybytes.cards.service;

import com.eazybytes.cards.model.Cards;
import com.eazybytes.cards.repository.CardsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CardService {
    @Autowired
    private CardsRepository cardsRepository;

    public List<Cards> getAllCards() {
        return new ArrayList<>(cardsRepository.findAll());
    }

    public Cards getCardById(int id) {
        return cardsRepository.findById(id).get();
    }

    public String saveCard(Cards card) {

        card.setCreateDt(LocalDate.now());
        cardsRepository.save(card);
        return "saved";
    }

    public String deleteCard(int id) {
        Cards cardFind = cardsRepository.findById(id).orElse(null);
        if (cardFind != null) {
            cardsRepository.deleteById(id);
            return "deleted!";
        } else {
            return "card not found!";
        }
    }

    public String updateCard(int id, Cards updateCard) {
        Cards cardFind = cardsRepository.findById(id).orElse(null);
        if (cardFind != null) {
            updateCard.setCardId(id);
            updateCard.setCreateDt(LocalDate.now());
            cardsRepository.save(updateCard);
            return "update successful!";
        } else {
            return "card not found!";
        }
    }

    public ResponseEntity<String> deleteCardByNumber(String cardNumber) {
        try {
            Cards cardFind = cardsRepository.findByCardNumber(cardNumber);

            if (cardFind != null) {
                cardsRepository.deleteByCardNumber(cardNumber);
                return ResponseEntity.status(HttpStatus.OK).body("Succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Carte non trouvée");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne");
        }
    }

    public ResponseEntity<String> deleteCardsByCustomerId(int customerId) {
        try {
            List<Cards> customerCards = new ArrayList<>(cardsRepository.findByCustomerId(customerId));

            if (!customerCards.isEmpty()) {
                cardsRepository.deleteCardsByCustomerId(customerId);
                return ResponseEntity.status(HttpStatus.OK).body("Succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aucune carte trouvée");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne");
        }
    }

    public ResponseEntity<String> deleteMultipleCardsByCardIds(List<Integer> cardIds) {
        try {
            if (!cardIds.isEmpty()) {
                for (Integer cardId : cardIds) {
                    cardsRepository.deleteById(cardId);
                }
                return ResponseEntity.status(HttpStatus.OK).body("Succès");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Échec de suppression");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne");
        }
    }

    public ResponseEntity<String> updateCardLimit(int cardId, int newCardLimit) {
        try {
            Cards cardFind = cardsRepository.findById(cardId).orElse(null);

            if (cardFind != null) {
                cardFind.setTotalLimit(newCardLimit);
                cardsRepository.save(cardFind);
                return ResponseEntity.status(HttpStatus.OK).body("Mise à jour réussie");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Carte non trouvée");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Données invalides");
        }
    }

    public ResponseEntity<List<Cards>> getAllCardsByCardType(String cardType) {
        try {
            List<Cards> cards = new ArrayList<>(cardsRepository.findByCardType(cardType));

            if (!cards.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).header("OK", "Liste de cartes").body(cards);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).header("NOT_FOUND", "Aucune carte trouvée").body(new ArrayList<>());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}