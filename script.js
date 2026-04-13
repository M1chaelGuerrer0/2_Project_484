$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.pet-button').click(clickedPetButton);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {
      name:"Mothra", 
      weight:0, 
      happiness:0
    };
  
    function clickedTreatButton() {
      pet_info.happiness += 10;
      pet_info.weight += 5;

      updateMessage("You gave " + pet_info.name + " a treat! Yummy!");

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += 5;
      pet_info.weight -= 3;

      updateMessage("You played with " + pet_info.name + "! Fun!");

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 5;
      pet_info.weight -= 6;

      updateMessage("You exercised " + pet_info.name + "! Sweaty!");

      checkAndUpdatePetInfoInHtml();
    }

    function clickedPetButton() {
      pet_info.happiness += 1;
      pet_info.weight += 0.5; // lazy weight added

      updateMessage("You pet " + pet_info.name + "! So cute!");

      checkAndUpdatePetInfoInHtml();
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
      // Add conditional so if happiness is lower than zero.
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
    }

    // takes messages (string) and adds it to the message container in HTML
    function updateMessage(message) {
      const container = $('.message-container');
      
      // add new message to container
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
    }
  