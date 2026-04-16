# Moonlight Matcha Order App

The Moonlight Matcha Order App is a small web application that lets users browse a matcha café menu and build a custom drink order. Users can customize drinks, add them to a cart, edit or remove items, and submit a pickup order form. Cart and order data are saved using localStorage so the data persists even after refreshing the page.

---

## Planned Features

- **Browse menu items by category** — Explore drinks and pastries organized into easy-to-navigate sections
- **Customize drinks** — Choose size, milk type, and sweetness level for a personalized order
- **Cart & order summary** — Add items to a cart and review everything before confirming
- **Pickup order form with validation** — Fill out contact and pickup details with real-time form feedback
- **Save favorites with localStorage** — Bookmark preferred drinks so they're easy to reorder

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React | UI and component logic |
| Vite | Development environment and build tool |
| CSS | Custom styling |
| localStorage | Persisting user favorites across sessions |
| Netlify | Deployment and hosting |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

---

## Known Bugs or Limitations

During development, several bugs were discovered and fixed while testing the cart logic, responsive layout, and accessibility behavior. For example, the cart originally used Date.now() as the ID for each item, which could cause duplicate IDs if two items were added within the same millisecond. This was fixed by switching to crypto.randomUUID() to guarantee unique IDs. Another issue was that the cart badge initially counted the number of cart entries rather than the total quantity of items, which could misrepresent the actual order size. This was corrected by summing the item quantities instead.

Some additional improvements were made during responsive testing. Small mobile UI issues were fixed, such as buttons being too small to tap easily, input text causing zooming on iOS devices, and modal windows overflowing on smaller screens. Accessibility improvements were also added, including proper ARIA attributes and keyboard support for closing modals with the Escape key.

There are still a few intentional limitations. Cart data is stored locally in the browser using localStorage, so orders do not persist across different devices or browsers. Additionally, the application assumes that the data stored in localStorage has not been manually modified, so there is no strict validation for corrupted stored data.

## What I learned

One thing I learned from this project is how helpful AI can be for reviewing code and catching issues that are easy to overlook. During development, several bugs were discovered related to cart logic, responsive layout, and accessibility features, and fixing them helped make the app more reliable and usable. At the same time, I learned that AI suggestions still need to be evaluated carefully because not every possible edge case is worth fixing for a project of this size. Overall, the project showed me how AI can be a useful development partner while still requiring human judgment to decide what solutions make the most sense.

--

# Week 12 Exercise: AI-Powered Feature

## External API Feature

I added a quote-based confirmation feature to the app using an external API. After a user submits a pickup order, the app fetches a random quote and displays it as part of the thank-you message. This adds a small but meaningful touch to the user experience and fits the calm, café-style theme of the app.

The feature uses the DummyJSON Quotes API:
https://dummyjson.com/quotes/random

## How to Run
npm install
npm run dev
Then open the local development URL in your browser.