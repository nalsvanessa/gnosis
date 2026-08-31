package com.example.api;
import org.springframework.stereotype.Service;



import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;



@Service
public class ChallengeService {

    public final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    
    public Challenge findChallengeById(short id) {
        return challengeRepository.findById(id).orElseThrow();
    }

    public List<Challenge> findCompletedChallengesByMonth(int month) {
         List<Challenge> allChallenges = challengeRepository.findAll();
         List<Challenge> challengesForTheMonth = allChallenges.stream()           
                         .filter(i -> i.getCompleted() &&  i.getCompletedAt().getMonthValue() == month)
                         .collect(Collectors.toList());
         return challengesForTheMonth;
    }

    public List<Challenge> findIncompleteChallenges() {
         List<Challenge> allChallenges = challengeRepository.findAll();
         List<Challenge> incompletedChallenges = allChallenges.stream()           
                         .filter(i -> !i.getCompleted())
                         .collect(Collectors.toList());
         return incompletedChallenges;
    }

    public Map<Integer, Long> findProgressOverTime() {
         List<Challenge> allChallenges = challengeRepository.findAll();
         Map<Integer, Long> progress = allChallenges.stream()           
                           .filter(i -> i.getCompleted())
                           .collect(Collectors.groupingBy(i -> i.getCompletedAt().getMonthValue() ,  Collectors.counting() ));
         return progress;
    }

    public Map<String, List<Challenge>> findChallengesByCategory() {
         List<Challenge> allChallenges = challengeRepository.findAll();
         Map<String, List<Challenge>> category = allChallenges.stream()           
                           .filter(i -> i.getCompleted())
                           .collect(Collectors.groupingBy(i -> i.getCategory() , Collectors.toList()));
                           
         return category;
    }

    public Challenge createChallenge(Challenge challenge) {
         java.time.LocalDate date = LocalDate.now();
         challenge.setCreatedAt(date);
         challengeRepository.save(challenge);
         return challenge;
     }
    
    public Challenge updateChallenge(Challenge updatedChallenge, Challenge originalChallenge) {
         java.time.LocalDate date = LocalDate.now();
         originalChallenge.setTitle(updatedChallenge.getTitle());
         originalChallenge.setDescription(updatedChallenge.getDescription());
         originalChallenge.setReflection(updatedChallenge.getReflection());
         originalChallenge.setCategory(updatedChallenge.getCategory());
         if(!originalChallenge.getCompleted() && updatedChallenge.getCompleted()
     ){
            originalChallenge.setCompletedAt(date);
            originalChallenge.setCompleted(true);
         } else if (originalChallenge.getCompleted() && !updatedChallenge.getCompleted()){
           originalChallenge.setCompleted(false);
           originalChallenge.setCompletedAt(null);
         }

         

         challengeRepository.save(originalChallenge);
         
         return originalChallenge;
     }
     
    public void deleteChallenge(short id) {
         challengeRepository.deleteById(id);
     }
   
    }
  

