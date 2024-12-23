document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for Home Button Click Event
    const homeButton = document.querySelector('.btn-home');
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth Scroll for About Button Click Event
    const aboutButton = document.querySelector('.btn-about');
    if (aboutButton) {
        aboutButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "about.html"; // This will navigate to the About page
        });
    }

    console.log('PackTrack site loaded successfully!');
});