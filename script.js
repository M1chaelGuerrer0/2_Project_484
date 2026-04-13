$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.pet-button').click(clickedPetButton);
  
    setInterval(decayHappiness, 5000);  
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {
      name:"Mothra", 
      weight:50, 
      happiness:50
    };

    var default_pet_image = 'images/mothra_default.png';
  
    function clickedTreatButton() {
      pet_info.happiness += Math.round(10 * applyWeightEffects());
      pet_info.weight += 5;

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

      $('.pet-image').attr('src', 'images/mothra_pet.gif');
      
      setTimeout(function() {
        updatePetStatus();
        $('.pet-image').attr('src', default_pet_image);
      }, 5000);

      updateMessage("You pet " + pet_info.name + "! So cute!");

      checkAndUpdatePetInfoInHtml();

      lockButton();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.weight > 100) {
        pet_info.weight = 100;
      }

      // Add conditional so if happiness is lower than zero.
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.happiness > 100) {
        pet_info.happiness = 100;
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
      $('.happiness').text(pet_info['happiness']);
      $('.effect').text(applyWeightEffects());
    }
    
    function lockButton() {
      // disable all buttons
      $('.button-container button').prop('disabled', true);

      setTimeout(function() {
        // enable all buttons after 5 seconds
        $('.button-container button').prop('disabled', false);
      }, 5000);
    }

    function applyWeightEffects() {
      if (pet_info.weight <= 25) return 2.0;
      if (pet_info.weight < 40) return 1.5;
      if (pet_info.weight <= 60) return 1.0;
      if (pet_info.weight <= 75) return 0.5;
      return 0.25;
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

    function decayHappiness() {
      pet_info.happiness -= 1;
    
      updatePetStatus();

      if (!$('.button-container button').first().prop('disabled')) { // only update if buttons are not locked
         $('.pet-image').attr('src', default_pet_image); // update image in case pet becomes sad or happy
      }

      checkAndUpdatePetInfoInHtml();
    }