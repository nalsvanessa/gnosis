package com.example.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    // Spring injects the repository here automatically
    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Challenge getChallenge(@PathVariable short id) {
        return challengeService.findChallengeById(id);
    }

    @GetMapping(value = "/month/{month}", produces = "application/json")
    public List<Challenge> getCompletedChallengesByMonth(@Min(1) @Max(12) @PathVariable int month) {
        return challengeService.findCompletedChallengesByMonth(month);
    }

    @GetMapping(value = "/incomplete", produces = "application/json")
    public List<Challenge> getIncompleteChallenges() {
        return challengeService.findIncompleteChallenges();
    }

    @GetMapping(value = "/completed", produces = "application/json")
    public List<Challenge> getCompletedChallenges() {
       return challengeService.findCompletedChallenges();
   }


    @GetMapping(value = "/progress", produces = "application/json")
    public Map<Integer, Long> getProgressOverTime() {
        return challengeService.findProgressOverTime();
    }

    @GetMapping(value = "/category", produces = "application/json")
    public Map<String, List<Challenge>> getCompletedChallengesByCategory() {
        return challengeService.listChallengesByCategory();

    }

    @PostMapping(value = "/addChallenge")
    public Challenge postChallenge(@Valid @RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @PutMapping(value = "/{id}", produces = "application/json")
    public Challenge updateChallenge(@PathVariable short id, @Valid @RequestBody Challenge updatedChallenge) {
        Challenge originalChallenge = challengeService.findChallengeById(id);
        return challengeService.updateChallenge(originalChallenge, updatedChallenge);
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public void deleteChallenge(@PathVariable short id ) {
           challengeService.deleteChallenge(id);
    }

    

    

}