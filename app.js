document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    searchImages(query);
});

const imageGallery = document.getElementById('imageGallery');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Load the image source when in view
            observer.unobserve(img); // Stop observing the image after it has loaded
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

async function searchImages(query = '') {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk`);
        imageGallery.innerHTML = ''; // Clear gallery
        response.data.results.forEach(photo => {
            const img = document.createElement('img');
            img.dataset.src = photo.urls.small;
            img.alt = photo.alt_description;
            img.classList.add('lazy');
            imageGallery.appendChild(img);
            observer.observe(img);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Optionally load random images or popular tags on initial load
searchImages('popular'); // Change 'popular' to any default or random keyword
