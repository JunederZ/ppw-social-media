import * as getUserPost from './getUserPost.mjs';

// Get the form element
const searchForm = document.querySelector('form[id="searchId"]');

// Add event listener for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form input named "search"
    const searchInput = document.querySelector('input[name="search"]');
    const searchValue = searchInput.value;

    // Call your function here
    getUserPost.getBasicPost(searchValue);
});