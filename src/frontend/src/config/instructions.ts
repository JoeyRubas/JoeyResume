import {
  InstructionConfig,
  InstructionListType,
  ProfileInstructionsConfig,
  ProfileRoutes
} from "../types/config.ts";

const HomeInstructions: InstructionConfig = {
  heading: 'Home Instructions',
  goalImgSrc: '/finished/home.png',
  topics: [{
    name: 'Instructions',
    listType: InstructionListType.Bulleted,
    instructions: [
      'Replace the photo with your own :)',
      'Add a bio about yourself',
      'You can also add a link to your social media if you\'d like',
    ],
  }],
}

const HobbiesInstructions: InstructionConfig = {
  heading: 'Hobbies Instructions',
  topics: [{
    name: 'Instructions',
    listType: InstructionListType.Bulleted,
    instructions: [
      'Replicate what has been done with the skills page here, with the correct hobby information'
    ],
  }],
}

const SkillsInstructions: InstructionConfig = {
  heading: 'Skills Instructions',
  topics: [
    {
      name: 'HTML',
      listType: InstructionListType.Bulleted,
      topicGoalImgSrc: '/finished/html.png',
      instructions: [
        'Create a basic HTML page that will display the skill information for a single skill from your C#/.Net class\' API',
        'Be thoughtful in how you structure your display as we will be reusing and styling it in the next lesson',
        'Display the details for a skill that would be returned by your API.',
        'This includes the skill\'s: Title, Skill Level, and Description',
        'Note: For right now, simply key in all the details for your skill directly into the HTML. In the Javascript lesson later, we will write code to do it for us',
        'Next, reuse your structure to build out the remaining skills from the api results',
        'If you finish early, attempt to create a form that accepts all of the needed skill attributes, and allows for a submit!',
        'Additional goal: Can your form only accept the allowed skill levels? Investigate how to create a dropdown component in HTML'
      ],
    },
    {
      name: 'CSS',
      listType: InstructionListType.Bulleted,
      topicGoalImgSrc: '/finished/css.png',
      instructions: [
        'We are going to prettify the HTML from the prior lesson',
        'You may style your skills displays however you wish, but take a look at the end goal for an idea',
        'First, create a new class in the styles.css folder for the div "skills-container", which should wrap all of your content, and style that to have padding',
        'Then, try to add styling to the header element using the class named "skills-header"',
        'After that, attempt to style one of the skill cards in whatever way you would like',
        'Then, make this design reusable and apply it to all of the skill cards',
        'After that, make sure all of the content is centered in the screen through any means necessary',
        'Attempt this again but by using flexboxes!',
        'If you have extra time, make it so that whenever you hover over an individual skill card, it appears to pop out! This can be done by adding a shadow underneath it using box shadows and transforming it slightly'
      ],
    },
    {
      name: 'JavaScript Part 1',
      listType: InstructionListType.Numbered,
      topicGoalImgSrc: '/finished/javascript_part_1.png',
      instructions: [
        'Ensure you have already built an HTML form with a button for adding skills and a UL for displaying your list of skills.',
        'Comment out, but do not delete, your HTML from the earlier lesson.  You will reference it in JavaScript Part 2.',
        'In vanillaScript.js, create a variable named addButton that links to your Add Skill button via document.getElementById()',
        'Create a second variable that links to your skills-list in the same way',
        'Create a function named `handleAddSkill` with a single parameter named "event".  Your first line should be "event.preventDefault()". Your second line is console.log(event.target).',
        'Add an event handler to addButton, and use `click` as the first parameter for the event type. Use handleAddSkill as a callback for the second parameter.',
        'Verify it is wired up properly -- Run the website with `npm run start`, navigate to the "skills" page, click your addSkill button, open the dev tools with F12, and see if there is a console.log from your button click.',
        'In handleAddSkill() create a variable named skill using document.createElement to build a new "li" element.',
        'Assign the word "test" to the textContent property of your new skill variable',
        'On your skillsList, use the appendChild() function to add the skill to your list',
        'Refresh your website.  Click the Add Skill button.  Your new list item should be visible.',
      ],
    },
    {
      name: 'JavaScript Part 2',
      listType: InstructionListType.Numbered,
      topicGoalImgSrc: '/finished/javascript_part_2.png',
      instructions: [
        'Look at the HTML structure of the skills you built in the HTML lesson.  We are going to use document.createElement one line at a time to create each HTML tag, just as you did for the "li".',
        'Create new variables for skillName, skillLevel, and skillDescription that link to their respective form elements.  Place them by your addButton and skillsList variables.',
        'Assign skillName.value, skillLevel.value, and skillDescription.value to the textContent of their respective HTML element.  Ex: skillHeading.textContent = skillName.value;',
        'Use appendChild on the correct element and in the correct order to rebuild your skill element properly.  Start by appending your innermost child to its parent first.  If multiple children have the same parent, add the topmost element first.',
        'Refresh your website, fill out the form, and submit it.  Right-click the page and "Inspect" the elements.  Find your skills and verify that the structure resembles what you built in the HTML section.',
        'You can set the CSS classes on your new HTML variables with the classList.add() function.  Ex: myVariable.classList.add("myClassName")',
        'Create a "formElement" variable that connects to the HTML form.  Place it with the addSkill button variable. Call formElement.reset() at the bottom of your click handler to wipe the form.',
      ],
    },
    {
      name: 'React & Material UI',
      listType: InstructionListType.Numbered,
      topicGoalImgSrc: '/finished/react_material.png',
      instructions: [
        'Using your knowledge of React, convert the re-used/duplicated HTML on the skills page to a React component using JSX',
        'Add the interactivity needed to add a new skill to the list using React state and event handlers',
        'Render the skills list using a map function to iterate over the skills array',
        'Add validation to the form to prevent submission if any of the fields are empty',
        'Integrate the newly built React skills form with the API using onSubmit handlers',
        'After successful submission, style the form using Material UI components',
        '**BONUS** - Add a snackbar alert to notify the user of successful skill addition',
      ],
    },
  ],
};

const INSTRUCTIONS_CONFIG: ProfileInstructionsConfig = {
  [ProfileRoutes.Home]: HomeInstructions,
  [ProfileRoutes.Hobbies]: HobbiesInstructions,
  [ProfileRoutes.Skills]: SkillsInstructions
}

export default INSTRUCTIONS_CONFIG;
