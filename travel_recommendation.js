// Travel Recommendation App Logic
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search_bar") || document.getElementById("searchInput");
  const searchBtn = document.getElementById("sub") || document.getElementById("searchBtn") || document.querySelector(".btn-search");
  const clearBtn = document.getElementById("clr") || document.getElementById("clearBtn") || document.querySelector(".btn-clear");
  const resultsContainer = document.getElementById("extra") || document.getElementById("resultsContainer");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleSearch();
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearResults();
    });
  }

  async function handleSearch() {
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      displayMessage("Please enter a destination, keyword (e.g. 'beach', 'temple', 'country'), or a country name.");
      return;
    }

    try {
      const response = await fetch("travel_recommendation_api.json");
      if (!response.ok) {
        throw new Error("Failed to load travel recommendations data.");
      }
      const data = await response.json();
      searchAndDisplay(query, data);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayMessage("Error loading recommendation data. Please ensure the local server is running.");
    }
  }

  function searchAndDisplay(query, data) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";

    const matchedItems = [];

    // Check Beach keywords
    const beachKeywords = ["beach", "beaches", "pantai"];
    // Check Temple keywords
    const templeKeywords = ["temple", "temples", "kuil", "candi"];
    // Check Country keywords
    const countryKeywords = ["country", "countries", "negara"];

    if (beachKeywords.some(keyword => query.includes(keyword) || keyword.includes(query))) {
      if (data.beaches && data.beaches.length > 0) {
        data.beaches.forEach(beach => matchedItems.push({ ...beach, category: "Beach" }));
      }
    } else if (templeKeywords.some(keyword => query.includes(keyword) || keyword.includes(query))) {
      if (data.temples && data.temples.length > 0) {
        data.temples.forEach(temple => matchedItems.push({ ...temple, category: "Temple" }));
      }
    } else if (countryKeywords.some(keyword => query.includes(keyword) || keyword.includes(query))) {
      // If the keyword is general country, show all or first couple of cities
      if (data.countries) {
        data.countries.forEach(country => {
          country.cities.forEach(city => {
            matchedItems.push({ ...city, category: country.name });
          });
        });
      }
    } else {
      // Check specific country name or specific city
      let countryMatched = false;
      if (data.countries) {
        data.countries.forEach(country => {
          const countryLower = country.name.toLowerCase();
          if (countryLower.includes(query) || query.includes(countryLower) ||
              (query === "jepang" && countryLower === "japan") ||
              (query === "brasil" && countryLower === "brazil")) {
            countryMatched = true;
            country.cities.forEach(city => {
              matchedItems.push({ ...city, category: country.name });
            });
          } else {
            // Check individual cities within country
            country.cities.forEach(city => {
              if (city.name.toLowerCase().includes(query)) {
                matchedItems.push({ ...city, category: country.name });
              }
            });
          }
        });
      }

      // Check specific temples or beaches by name if not already matched
      if (!countryMatched && matchedItems.length === 0) {
        if (data.temples) {
          data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query)) {
              matchedItems.push({ ...temple, category: "Temple" });
            }
          });
        }
        if (data.beaches) {
          data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query)) {
              matchedItems.push({ ...beach, category: "Beach" });
            }
          });
        }
      }
    }

    if (matchedItems.length === 0) {
      displayMessage(`No recommendations found for "<strong>${escapeHtml(query)}</strong>". Try searching for <em>'beach'</em>, <em>'temple'</em>, or <em>'Australia'</em>, <em>'Japan'</em>, <em>'Brazil'</em>.`);
      return;
    }

    // Render results
    matchedItems.forEach(item => {
      const card = createCard(item);
      resultsContainer.appendChild(card);
    });

    // Smooth scroll into results on mobile
    if (window.innerWidth <= 1024) {
      resultsContainer.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getLocalTime(timeZone) {
    if (!timeZone) return "";
    try {
      const options = {
        timeZone: timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
      return new Date().toLocaleTimeString("en-US", options);
    } catch (e) {
      return "";
    }
  }

  function createCard(item) {
    const card = document.createElement("div");
    card.className = "recommendation-card";

    const localTime = getLocalTime(item.timeZone);
    const timeDisplay = localTime
      ? `<div class="card-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
          </svg>
          Local Time: ${localTime}
        </div>`
      : "";

    const categoryBadge = item.category
      ? `<span class="card-badge">${escapeHtml(item.category)}</span>`
      : "";

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.src='images/background.jpg'">
        ${categoryBadge}
      </div>
      <div class="card-content">
        <h3 class="card-title">${escapeHtml(item.name)}</h3>
        ${timeDisplay}
        <p class="card-desc">${escapeHtml(item.description)}</p>
        <a href="book.html" class="btn-visit" target="_blank">Visit</a>
      </div>
    `;

    return card;
  }

  function clearResults() {
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    if (resultsContainer) {
      resultsContainer.innerHTML = "";
    }
  }

  function displayMessage(messageHtml) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = `
      <div class="empty-message">
        <p>${messageHtml}</p>
      </div>
    `;
  }

  function escapeHtml(string) {
    const div = document.createElement("div");
    div.textContent = string;
    return div.innerHTML;
  }
});
