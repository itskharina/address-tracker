const ip = document.querySelector('.ip-data');
const place = document.querySelector('.location-data');
const timezone = document.querySelector('.timezone-data');
const isp = document.querySelector('.isp-data');
const button = document.querySelector('button');
const search = document.querySelector('input');

let long;
let lat;
let map;
let marker;

const locationIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

window.onload = async function () {
  const data = await fetchApi();
  renderData(data);
  map = L.map('map').setView([lat, long], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  marker = L.marker([lat, long], { icon: locationIcon }).addTo(map);
};

async function fetchApi() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchApiInput(input) {
  try {
    const response = await fetch(`https://ipapi.co/${input}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderData(data) {
  ip.textContent = data.ip;
  place.textContent = `${data.city}, ${data.country_name}`;
  timezone.textContent = `UTC ${data.utc_offset}`;
  isp.textContent = data.org;
  lat = data.latitude;
  long = data.longitude;
}

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = await fetchApiInput(search.value);
  renderData(data);
  map.setView([lat, long], 13);
  marker.setLatLng([lat, long]);
});
