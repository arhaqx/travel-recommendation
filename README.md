# TravelBloom - Travel Recommendation Web Application

A modern, responsive, and dynamic Travel Recommendation Web Application developed as the final project for the **IBM Full Stack JavaScript Developer Professional Certificate** on Coursera.

## 🌐 Live Demo & Repository
- **Live Website (GitHub Pages):** [https://arhaqx.github.io/travel-recommendation/](https://arhaqx.github.io/travel-recommendation/)
- **GitHub Repository:** [https://github.com/arhaqx/travel-recommendation](https://github.com/arhaqx/travel-recommendation)

---

## 🌟 Features & Project Highlights

1. **Intuitive Navigation Bar**
   - Responsive brand identity with custom luggage branding (`TravelBloom`).
   - Seamless navigation links between **Home**, **About Us**, and **Contact Us**.
   - Interactive search bar with search button and reset/clear button.

2. **Engaging Home Page Introduction**
   - High-impact hero section with introductory text guiding users to explore destinations.
   - Interactive call-to-action button ("Book Now").
   - Integrated social media links (Twitter/X, Facebook, Instagram, YouTube).

3. **Dynamic Recommendation Engine (`travel_recommendation.js`)**
   - **Beach Recommendations:** Search for `beach` or `beaches` to view exotic coastal destinations (e.g., Bora Bora, Copacabana).
   - **Temple Recommendations:** Search for `temple` or `temples` to explore world-famous spiritual landmarks (e.g., Angkor Wat, Taj Mahal).
   - **Country Recommendations:** Search for `country`, `countries`, or specific countries like `Australia`, `Japan`, `Brazil` to see top cities and attractions.
   - **Case-Insensitive & Flexible Matching:** Supports various casing and localized inputs.
   - **Live Local Timezone Calculation:** Dynamically calculates and displays the current local time in each destination using `toLocaleTimeString` and IANA time zones.

4. **Dedicated "About Us" Page**
   - Clear statement of company mission and purpose.
   - **Our Team Section:** Showcases key team members (Content Director, Lead Developer, Marketing Manager) with profile images, roles, and bios.

5. **Interactive "Contact Us" Page**
   - Functional contact form including Name, Email, and Message fields.
   - Client-side validation with responsive feedback alerts upon submission.

6. **Reset / Clear Functionality**
   - Effortlessly clears search results and resets input fields with a single click.

---

## 📁 Project Structure

```text
├── index.html                   # Entry point for GitHub Pages
├── travel_recommendation.html   # Primary home page
├── about.html                   # About Us page
├── about_us.html                # About Us page alias
├── contact.html                 # Contact Us page
├── contact_us.html              # Contact Us page alias
├── book.html                    # Booking action page
├── travel_recommendation.js     # Search logic, fetch API, and DOM rendering
├── travel_recommendation_api.json # Recommendation dataset (countries, temples, beaches)
├── style.css                    # Modern glassmorphism stylesheet & responsive layout
└── images/                      # Destination & team imagery
```

---

## 🚀 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/arhaqx/travel-recommendation.git
   cd travel-recommendation
   ```

2. Serve using any local web server (e.g., Python, Node.js, or VS Code Live Server):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node npx serve
   npx serve .
   ```

3. Open your browser and navigate to `http://localhost:8000`.

---

## 📝 Technologies Used
- **HTML5:** Semantic layout and accessible structure.
- **CSS3:** Glassmorphism, CSS Grid, Flexbox, custom animations, responsive media queries.
- **JavaScript (ES6+):** Fetch API, DOM manipulation, asynchronous programming, `Intl.DateTimeFormat` / `toLocaleTimeString`.
- **GitHub & GitHub Pages:** Version control and live deployment.
