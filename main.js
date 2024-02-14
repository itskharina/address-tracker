async function fetchApi() {
  try {
    const response = await fetch('https://ipapi.co/8.8.8.8/json/');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchApi();

// function renderData() {}

const map = L.map('map').setView([37.42301, -122.083352], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const locationIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const marker = L.marker([37.42301, -122.083352], { icon: locationIcon }).addTo(
  map
);
