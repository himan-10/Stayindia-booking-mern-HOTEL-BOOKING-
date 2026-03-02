// A curated collection of high-quality Unsplash image URLs specifically for Indian Heritage, Palaces, Resorts, and Landscapes.

export const heritageImages = [
    "https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Jaipur Palace
    "https://images.unsplash.com/photo-1615836245337-f589c36d2e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Udaipur Lake Palace
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Jaipur Fort
    "https://images.unsplash.com/photo-1587478640870-13f50800fa88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Indian Architecture (Orange)
    "https://images.unsplash.com/photo-1574182465136-2313620db4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Rajasthan Desert Fort
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Taj Mahal
    "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // coastal resort
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // kerala backwaters
    "https://images.unsplash.com/photo-1561361513-2d000a50f0ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Palace interior/arches
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Heritage fort walls
    "https://images.unsplash.com/photo-1598324789736-4861f89564a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Palace evening
    "https://images.unsplash.com/photo-1627894483216-2138af692e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"  // Luxury tent/desert
];

export const getRandomHeritageImage = (seed) => {
    // If seed is provided, reliably return the same image for that seed (like flat ID)
    if (seed) {
        const sum = String(seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return heritageImages[sum % heritageImages.length];
    }
    return heritageImages[Math.floor(Math.random() * heritageImages.length)];
};
