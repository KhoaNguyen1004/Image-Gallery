const apiKey = 'upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk'; 
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=10`;
const searchApiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        loadImages(query, true); 
    }
});

const tags = ['dog', 'cat', 'puppy', 'art', 'natural', 'universe', 'AI', 'computer', 'wolf', 'kids'];
const tagContainer = document.querySelector('.tag-container');

tags.forEach(tag => {
    let button = document.createElement('button');
    button.textContent = tag;
    button.addEventListener('click', () => {
        loadImages(tag, true);
    });
    tagContainer.appendChild(button);
});

function loadImages(query, isSearch = false) {
    const url = isSearch ? `${searchApiUrl}&query=${query}&per_page=10` : apiUrl;
    axios.get(url)
        .then(response => {
            const images = isSearch ? response.data.results : response.data; // Axios automatically accesses `.data`
            displayImages(images);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = ''; // Clear existing images
    images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        if (index >= 3) {
            imgElement.loading = "lazy";  // Lazy load for images starting from the 4th
        }
        imageGrid.appendChild(imgElement);
    });
}

window.onload = () => {
    loadImages(); 
};
