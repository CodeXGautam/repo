// Blurs navigation bar on hover
const nav = document.querySelector('nav ul');
const listItems = nav.querySelectorAll('li');

listItems.forEach(listItem => {
    listItem.addEventListener('mouseover', () => {
        listItems.forEach(otherItem => {
            if (otherItem !== listItem) {
                otherItem.style.filter = 'blur(5px)';
            }
        });
    });

    listItem.addEventListener('mouseout', () => {
        listItems.forEach(otherItem => {
            otherItem.style.filter = 'none';
        });
    });

    listItem.addEventListener('click', () => {
        const link = listItem.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});



// Search Bar Expands
// const searchBar = document.querySelector('.search-bar');
// searchBar.addEventListener('mouseenter', () => {
//     listItems.forEach(item => {
//         item.classList.remove('expand');
//         item.classList.add('shrink');
//     });
// });

// searchBar.addEventListener('mouseleave', () => {
//     listItems.forEach(item => {
//         item.classList.remove('shrink');
//         item.classList.add('expand');
//     });
// });

// Odometer Reading

document.addEventListener("DOMContentLoaded", function() {
    const odometers = document.querySelectorAll(".odometer");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const odometerElement = entry.target;
                odometerElement.classList.add("visible");

                // Start the odometer animation
                if (odometerElement.id === "members-odometer") {
                    setTimeout(() => {
                        odometerElement.innerHTML = 10; 
                    }, 300);
                } else if (odometerElement.id === "countries-odometer") {
                    setTimeout(() => {
                        odometerElement.innerHTML = 25; 
                    }, 300);
                } else if (odometerElement.id === "success-odometer") {
                    setTimeout(() => {
                        odometerElement.innerHTML = 100; 
                    }, 300);
                } else if (odometerElement.id === "uptime-odometer") {
                    setTimeout(() => {
                        odometerElement.innerHTML = 99.99; 
                    }, 300);
                }

                observer.unobserve(odometerElement);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    odometers.forEach(odometer => {
        observer.observe(odometer);
    });
});





// Line up animation for services
document.addEventListener("DOMContentLoaded", function() {
    const servicesHeading = document.querySelector('.services-heading');
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lineUp'); 
            } else {
                entry.target.classList.remove('lineUp');
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(servicesHeading);
});

// Service section sliding and interaction
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.services');
    const cards = document.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.dot');
    const sliderDots = document.querySelector('.slider-dots');

    let currentIndex = 0;

    function showSlide(index) {
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight);
        const offset = (cardWidth + cardMargin) * index;

        container.scrollTo({
            left: offset,
            behavior: 'smooth'
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // Initialize the first slide
    showSlide(currentIndex);

    // Add event listeners to the dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Add event listeners to the cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Show or hide the slider dots based on the scroll position
    function checkScroll() {
        const servicesRect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionVisibleHeight = Math.min(servicesRect.bottom, windowHeight) - Math.max(servicesRect.top, 0);

        if (sectionVisibleHeight > container.offsetHeight / 5) {
            sliderDots.classList.add('show');
        } else {
            sliderDots.classList.remove('show');
        }
    }

    // Check scroll position on load and on scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Handle touch events for touchpad scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
        updateCurrentIndex();
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        container.scrollLeft = scrollLeft - walk;
    });

    // Handle mouse wheel scrolling
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            const cardWidth = cards[0].offsetWidth;
            const cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight);
            container.scrollLeft += e.deltaY;
            updateCurrentIndex();
        }
    });

    function updateCurrentIndex() {
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight);
        currentIndex = Math.round(container.scrollLeft / (cardWidth + cardMargin));
        showSlide(currentIndex);
    }
});





// social media dissapear

document.addEventListener('mousemove', function() {
    const socialMediaIcons = document.querySelector('.social-media-icons');
    socialMediaIcons.style.opacity = 1;
    clearTimeout(socialMediaIcons.timer);
    socialMediaIcons.timer = setTimeout(function() {
        socialMediaIcons.style.opacity = 0;
    }, 2000); // Adjust the time (in milliseconds) as needed
});

// Automatic search 

const words = ['SEO','Best Brand Management Website','GoBiggie']; // Array of words to type
let wordIndex = 0;
let letterIndex = 0;
let isTyping = true;
const speed = 100; // Speed of typing in milliseconds

function typeEffect() {
    const inputField = document.querySelector('.search__field');
    const currentWord = words[wordIndex];

    if (isTyping) {
        if (letterIndex < currentWord.length) {
            inputField.value += currentWord.charAt(letterIndex);
            letterIndex++;
            setTimeout(typeEffect, speed);
        } else {
            isTyping = false;
            setTimeout(typeEffect, 2000); // Pause before starting to erase
        }
    } else {
        if (letterIndex > 0) {
            inputField.value = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
            setTimeout(typeEffect, speed);
        } else {
            isTyping = true;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
            setTimeout(typeEffect, 500); // Pause before starting to type the next word
        }
    }
}

// Initialize the typing effect
typeEffect();

document.addEventListener("DOMContentLoaded", function() {
    const searchField = document.querySelector('.search__field');
    searchField.classList.add('appear');
  });
  

// testimonial section


  document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.testimonials-container');
    const cards = document.querySelectorAll('.testimonial-card');
  
    // Function to scroll to the selected card and show adjacent cards
    function scrollToCard(index) {
      const card = cards[index];
      const containerWidth = container.clientWidth;
      const cardWidth = card.clientWidth;
      const totalGap = 40; // Adjust if needed to control the visibility of adjacent cards
  
      container.scrollTo({
        left: card.offsetLeft - (containerWidth - cardWidth) / 2 + totalGap,
        behavior: 'smooth'
      });
    }
  
    // Add event listeners to cards or controls to navigate
    cards.forEach((card, index) => {
      card.addEventListener('click', () => scrollToCard(index));
    });
  
    // Optional: Automatically scroll to the first card on load
    scrollToCard(0);
  });

// testimonial dots

  document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.testimonials-container');
    const cards = Array.from(container.querySelectorAll('.testimonial-card'));
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // Set the first dot as active
        dot.addEventListener('click', () => {
            // Scroll the clicked card into view
            cards[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'center'
            });
            updateDots(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    function updateDots(activeIndex) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Update dots on scroll
    container.addEventListener('scroll', () => {
        const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(scrollPosition - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        
        updateDots(closestIndex);
    });
});

// faq

document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion-button');

    accordions.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');

            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                // Close all other accordions
                document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-content').style.maxHeight = null;
                });

                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});







