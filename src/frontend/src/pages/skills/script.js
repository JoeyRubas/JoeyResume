// This file is a workaround to get vanilla JS working in a React application.
export const initializeVanillaJS = () => {
  // this call to setTimeout will execute the following JavaScript after a 100 millisecond delay, to give React time to render the HTML.
  // this is only necessary because we are building a site that can leverage both vanilla JS and React for building pages.
  // this file will not be used in the Reactify portion of the class but is essential for understanding how websites work under the hood
  // Your code will go inside the body of setTimeout, where the below comments are written to guide your code placement.
  setTimeout(() => {
    console.log('initializeVanillaJS')
    // Select HTML Elements
    let addButton = document.getElementById("submitButton");
    let skillsList = document.getElementById("skillCardList");
    let skillNameInput = document.getElementById("sname");
    let skillLevelInput = document.getElementById("slevel");
    let skillDescriptionInput = document.getElementById("sdesc");

    // Primary Function
    function handleAddSkill(event) {
        event.preventDefault();
        
      
      // Get Form Values (Inside Primary Function)
      var skillName = skillNameInput.value;
      var skillLevel = skillLevelInput.value;
      var skillDescription = skillDescriptionInput.value;
      if (!skillName || !skillLevel || !skillDescription) {
        alert("Please fill out all fields.");
        return;
      }

      // Create new skill element (Inside Primary Function)
      var skillCard = document.createElement("li");

      // Add CSS classes (Inside Primary Function)
      skillCard.classList.add("skill-card");

     // Build HTML (Inside Primary Function)
      var skillTitle = document.createElement("h1");
        skillTitle.innerHTML = `${skillName}<span class="skill-level ${skillLevel}">${skillLevel}</span>`;
        skillCard.appendChild(skillTitle);
        var skillDescriptionDiv = document.createElement("div");
        skillDescriptionDiv.innerText = skillDescription;
        skillCard.appendChild(skillDescriptionDiv);
        skillsList.appendChild(skillCard);

      // Clear form (Inside Primary Function)
      skillNameInput.value = "";
      skillLevelInput.value = "";
      skillDescriptionInput.value = "";
    }
      // Clear form (Inside Primary Function)
      addButton.addEventListener("click", handleAddSkill);

    }, 100);

    // Wire up event listeners
    
  }
