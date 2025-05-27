// Exercise 1: Page Load
console.log("Welcome to the Community Portal");
window.onload = () => {
  alert("Page is fully loaded!");
};

// Exercise 2: Event Basics
const eventName = "Community Cleanup";
const eventDate = "2025-06-15";
let seatsAvailable = 50;
console.log(`${eventName} is scheduled for ${eventDate}. Seats left: ${seatsAvailable}`);
seatsAvailable--;

// Exercise 3: Upcoming Event Filter
const events = [
  { name: "Music Night", date: "2025-06-20", seats: 10 },
  { name: "Past Event", date: "2024-06-01", seats: 0 }
];

events.forEach(event => {
  const today = new Date();
  const eDate = new Date(event.date);
  const status = eDate > today && event.seats > 0 ? "Upcoming" : "Skipping";
  console.log(`${status}: ${event.name}`);
});

try {
  const selectedEvent = events[0];
  if (selectedEvent.seats <= 0) throw new Error("No seats available!");
  selectedEvent.seats--;
  console.log("Registered successfully.");
} catch (err) {
  console.error("Registration failed:", err.message);
}

// Exercise 4: Functional Logic
const addEvent = (name, category) => ({ name, category });
const registerUser = (user, event) => console.log(`${user} registered for ${event.name}`);
const filterEventsByCategory = (arr, category) => arr.filter(e => e.category === category);

// Closure Example
const createCategoryTracker = () => {
  let count = 0;
  return () => ++count;
};
const trackMusic = createCategoryTracker();
console.log(trackMusic()); // 1
console.log(trackMusic()); // 2

// Exercise 5: Constructor Function
function Event(name, seats) {
  this.name = name;
  this.seats = seats;
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};
const jazzEvent = new Event("Jazz Night", 20);
console.log(Object.entries(jazzEvent));
console.log(jazzEvent.checkAvailability());

// Exercise 6: Array Manipulation
let allEvents = [
  { name: "Yoga", type: "health" },
  { name: "Rock Concert", type: "music" }
];
allEvents.push({ name: "Jazz", type: "music" });

const musicEvents = allEvents.filter(e => e.type === "music");
const cards = allEvents.map(e => `Event: ${e.name.toUpperCase()}`);
console.log(cards);

// Exercise 7: DOM Rendering
const eventList = document.querySelector("#eventList");
const renderEvent = event => {
  if (eventList) {
    const div = document.createElement("div");
    div.className = "eventCard";
    div.textContent = `${event.name} - ${event.date}`;
    eventList.appendChild(div);
  }
};

// Exercise 8: Event Listeners
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.onclick = () => alert("You registered!");
}

const filterDropdown = document.getElementById("categoryFilter");
if (filterDropdown) {
  filterDropdown.onchange = e => filterEvents(e.target.value);
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      console.log("Searching for:", e.target.value);
    }
  });
}

// Exercise 9: Fetch with Promises and async/await
fetch("https://mockapi.io/events")
  .then(res => res.json())
  .then(data => console.log("Events (promise):", data))
  .catch(err => console.error("Fetch error:", err));

const fetchEvents = async () => {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block";

  try {
    const res = await fetch("https://mockapi.io/events");
    const data = await res.json();
    console.log("Events (async):", data);
  } catch (e) {
    console.error("Failed to load events:", e.message);
  } finally {
    if (loading) loading.style.display = "none";
  }
};

// Exercise 10: Destructuring & Spread
const yogaEvent = { name: "Yoga", date: "2025-07-01", category: "health" };
const logEvent = ({ name, date }) => console.log(`${name} on ${date}`);
logEvent(yogaEvent);
const newList = [...events];

// Exercise 11: Form Validation
const regForm = document.getElementById("regForm");
if (regForm) {
  regForm.addEventListener("submit", e => {
    e.preventDefault();
    const { name, email, event } = regForm.elements;
    const errorMsg = document.getElementById("errorMsg");

    if (!name.value || !email.value) {
      if (errorMsg) errorMsg.textContent = "All fields are required.";
      return;
    }

    console.log(`Registered ${name.value} for ${event.value}`);
  });
}

// Exercise 12: Simulated API POST
const sendRegistration = data => {
  const status = document.getElementById("status");
  if (status) status.textContent = "Submitting...";

  setTimeout(() => {
    fetch("https://mockapi.io/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        if (status) status.textContent = "Registered successfully!";
      })
      .catch(() => {
        if (status) status.textContent = "Failed to register.";
      });
  }, 2000);
};

// Exercise 13: Logging Payload
try {
  const payload = { name: "John", email: "john@mail.com" };
  console.log("Submitting form...");
  console.log("Payload:", payload);
} catch (err) {
  console.error("Submission error:", err.message);
}

// Exercise 14: jQuery Integration (if jQuery is included)
if (typeof $ !== "undefined") {
  $('#registerBtn').click(() => {
    alert("You clicked register!");
    $('.eventCard').fadeOut().fadeIn();
  });
}
