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

    images.forEach((img) => {
        const link = document.createElement('a');
        link.className = 'lightbox-trigger';

        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        imgElement.dataset.highres = img.urls.regular; // Store high-res URL in data attribute
        imgElement.alt = 'Thumbnail'; // Adding alt for accessibility

        link.appendChild(imgElement);
        imageGrid.appendChild(link);

        // Add event listener to each link for opening the lightbox
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the browser from following the href
            const highResUrl = imgElement.dataset.highres;
            const lightboxImage = document.querySelector('.lightbox img');
            lightboxImage.src = highResUrl;
            lightbox.style.display = 'flex'; // Show the lightbox
        });
    });
}
// Assume a single lightbox element exists in the HTML:
// <div class="lightbox" style="display:none;">
//   <img src="" alt="Lightbox Image">
//   <a href="#" class="close-lightbox" style="color: white; position: absolute; top: 10px; right: 20px; font-size: 24px;">Close</a>
// </div>

const lightbox = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.close-lightbox');

closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    lightbox.style.display = 'none'; // Hide the lightbox
});

window.onload = () => {
    loadImages(); // Load initial images
};
