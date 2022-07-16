/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const startTime = performance.now();

let sections = [
  {title: 'Section 1', firstParagraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', secondParagragh: 'Aliquam a convallis justo.'},
  {title: 'Section 2', firstParagraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', secondParagragh: 'Aliquam a convallis justo.'},
  {title: 'Section 3', firstParagraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', secondParagragh: 'Aliquam a convallis justo.'},
  {title: 'Section 4', firstParagraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', secondParagragh: 'Aliquam a convallis justo.'}
];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// self invoking the 2 functions when adding js file link at the end of the body
window.onload = () => {
  renderSections();
  renderNavigationList();
}

renderSections = () => {
  // const parentElement = document.getElementsByClassName("sections-container")[0];
  const parentElement = document.querySelector("div.sections-container");
  // Append Sections
  for(let i=0; i < sections.length; i++) {     
    let section = document.createElement('section');
    section.innerHTML = `
      <div class="landing__container">
        <h2>${sections[i].title}</h2>
        <p>${sections[i].firstParagraph}</p>
        <p>${sections[i].secondParagragh}</p>
      </div>`
    parentElement.appendChild(section);
    // Adding Attributes
    section.setAttribute('id',`section${i + 1}`);
    section.setAttribute('data-nav',`section ${i + 1}`);
    if(i === 0) {
      section.classList.add('active-section');
    }
  }
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
renderNavigationList = () => {
  const parentElement = document.getElementById("navbar__list");
  // Append list items
  for(let i=0; i < sections.length; i++) {     
    let item = document.createElement('li');
    item.innerHTML = `<a class="menu__link" href="#section${i + 1}">Section ${i + 1}</a>`
    parentElement.appendChild(item);
    // Add Styling
    item.classList.add('nav-item');
    if(i === 0) {
      item.classList.add('active');
    }
    // Scroll to section on link click
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let activeSection = document.getElementById(`section${i + 1}`);
      activeSection.scrollIntoView({behavior: 'smooth', block: "start"})
    });
  }
};


// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', () => {
  let sections = document.getElementsByTagName('section');
  for(let i = 0; i < sections.length; i ++) {
    let position = getPosition(sections[i]);
    if(position < 100) {
      sections[i].classList.add('active-section');
      // Scroll Down
      if(i !== 0) {
        sections[i - 1].classList.remove('active-section');
      }
      // Scroll Top
      if(i !== -1) {
        sections[i + 1]?.classList.remove('active-section');
      }
      // Activate list item that pointing to this section
      const items = document.getElementsByClassName('nav-item');
      for(let x = 0; x < items.length; x++){
        items[x].classList.remove('active');
      }
      items[i].classList.add('active');
    }
  }
});

getPosition = (section) => {
  let position = 0;
  while(section) {
    position += (section.offsetTop - section.scrollTop + section.clientTop);
    section = section.offsetParent;
  }
  return position;
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

// Handling Move to the top action
onMoveUp = () => {
  // Update Active Section
  let sections = document.getElementsByTagName('section');
  for(let i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active-section');
  }
  sections[0].classList.add('active-section');
  // Update Active List Item
  let items = document.getElementsByTagName('li');
  for(let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
  }
  items[0].classList.add('active');  
}

// Test Performance
const endTime = performance.now();
console.log(`this code took ${endTime - startTime} milliseconds`)