$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.pet-button').click(clickedPetButton);
    $('.drink-button').click(clickedDrinkButton);

    setInterval(decay, 5000);  
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {
      name:"Mothra", 
      weight:50, 
      happiness:50,
      thirst:50
    };

    // used for weight status and effects, feel free to change values and add more stages
    const weightStages = [
      { max: 25, status: "Underweight", effect: 0.8, decay: 2 },
      { max: 45, status: "Fit",         effect: 2, decay: 1 },
      { max: 65, status: "Normal",      effect: 1.5, decay: 1 },
      { max: 75, status: "Overweight",  effect: 0.8, decay: 2 },
      { max: 100, status: "Obese",      effect: 0.5, decay: 3 }
    ];

    var default_pet_image = 'images/mothra_default.png';

    let treatSound = new Audio('sounds/treat_sound.mp3');
    let playSound = new Audio('sounds/play_sound.mp3');
    let exerciseSound = new Audio('sounds/exercise_sound.mp3');
    let petSound = new Audio('sounds/pet_sound.mp3');
    let drinkSound = new Audio('sounds/drink_sound.mp3');
  
    function clickedTreatButton() {
      pet_info.happiness += Math.round(10 * applyWeightEffects());
      pet_info.weight += 5;
      treatSound.play();

      // .attr() is used to change the image source dynamically 
      $('.pet-image').attr('src', 'images/mothra_treat.png');

      // waits 5 seconds to change image back to default and ends action
      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You gave " + pet_info.name + " a treat! Yummy!");

      checkAndUpdatePetInfoInHtml();

      lockButton();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += Math.round(6 * applyWeightEffects());
      pet_info.weight -= 3;
      playSound.play();

      $('.pet-image').attr('src', 'images/mothra_default.png');
      // up and down animation for 5 seconds
      for (let i = 0; i < 12; i++) {
        $('.pet-image')
          .animate({ top : "-=20px" }, 200)
          .animate({ top : "+=20px" }, 200);
      }

      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You played with " + pet_info.name + "! Fun!");

      checkAndUpdatePetInfoInHtml();

      lockButton();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= Math.round(5 * applyWeightEffects());
      pet_info.weight -= 6;
      pet_info.thirst -= 10;
      exerciseSound.play();

      $('.pet-image').attr('src', 'images/mothra_exercise.png');
      
      // left to right animation for 5 seconds
      for (let i = 0; i < 12; i++) {
        $('.pet-image')
          .animate({ left : "-=20px" }, 200)
          .animate({ left : "+=20px" }, 200);

      }

      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You exercised " + pet_info.name + "! Sweaty!");

      checkAndUpdatePetInfoInHtml();

      lockButton();
    }

    function clickedPetButton() {
      pet_info.happiness += 1 * applyWeightEffects();
      pet_info.weight += 0.5; // lazy weight added
      petSound.play();

      $('.pet-image').attr('src', 'images/mothra_pet.gif');
      
      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You pet " + pet_info.name + "! So cute!");

      checkAndUpdatePetInfoInHtml();

      lockButton();
    }

    function clickedDrinkButton() {
      pet_info.thirst += 20;
      pet_info.weight += 1;
      pet_info.happiness += 2 * applyWeightEffects();
      drinkSound.play();
      
      $('.pet-image').attr('src', 'images/mothra_drink.png');
      
      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You gave " + pet_info.name + " a drink! Refreshing!");
      checkAndUpdatePetInfoInHtml();
      lockButton();
    }

    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional for weight to be between 15 and 100
      if (pet_info.weight < 15) {
        pet_info.weight = 15;
      }

      if (pet_info.weight > 100) {
        pet_info.weight = 100;
      }

      // Add conditional so if happiness is lower than zero.
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

      // add conditional for thirst to be between 0 and 100
      if (pet_info.thirst < 0) {
        pet_info.thirst = 0;
      }
      if (pet_info.thirst > 100) {
        pet_info.thirst = 100;
      }
    }

    // takes messages (string) and adds it to the message container in HTML
    function updateMessage(message) {
      const container = $('.message-container');

      // .append() adds a new message to the message container without removing old messages
      container.append("<p>" + message + "</p>");
    
      // remove old messages if there are more than 10
      if (container.find('p').length > 10) {
        container.find('p').first().remove();
      }

      // auto-scroll to newest message
      container.scrollTop(container[0].scrollHeight);
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.weight-status').text(getWeightStatus());
      $('.happiness').text(pet_info['happiness']);
      $('.effect').text(applyWeightEffects());
      $('.thirst').text(pet_info.thirst);
    }
    
    function lockButton() {
      // disable all buttons
      $('.button-container button').prop('disabled', true);

      setTimeout(function() {
        // enable all buttons after 5 seconds
        $('.button-container button').prop('disabled', false);
      }, 5000);
    }

    function getWeightStage() {
      for (let stage of weightStages) {
        if (pet_info.weight <= stage.max) {
          return stage;
        }
      }
    }

    function getWeightStatus() {
      return getWeightStage().status;
    }

    function applyWeightEffects() {
      return getWeightStage().effect;
    }

    function getThirstPenalty() {
      if (pet_info.thirst <= 20) return 2;
      if (pet_info.thirst <= 40) return 1;
      return 0;
    }

    function decay() {
      pet_info.happiness -= getWeightStage().decay + getThirstPenalty();
      pet_info.thirst -= 3;

      updatePetStatus();

      if (!$('.button-container button').first().prop('disabled')) { // only update if buttons are not locked
         $('.pet-image').attr('src', default_pet_image); // update image in case pet becomes sad or happy
      }

      checkAndUpdatePetInfoInHtml();
    }

    function updatePetStatus() {
      if (pet_info.happiness >= 75) {
        default_pet_image = 'images/mothra_happy.png';
      }
      else if (pet_info.happiness <= 25) {
        default_pet_image = 'images/mothra_sad.png';
      }
      else {
        default_pet_image = 'images/mothra_default.png';
      }
    }