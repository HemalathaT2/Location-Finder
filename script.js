// Declaring map,marker and geocoder variables

let map;
let marker;
let geocoder;

//Base URL and queries
const baseURL = "https://maps.googleapis.com/maps/api/js";
const queries = "libraries=places&callback=initMap&v=weekly&channel=2";

//API KEY Prompt
const API_KEY = prompt("Insert your Google Maps API Key");

//Creating script tag and assigning values
const scriptEl = document.createElement("script");
const bodyScript = document.getElementsByTagName("script")[0];

scriptEl.async = true;
scriptEl.src = `${baseURL}?key=${API_KEY}&${queries}`;
bodyScript.parentNode.insertBefore(scriptEl, bodyScript);

function initMap() {
  //Initialize map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 44.75, lng: 20.47 }
  });

  //Initialize map
  geocoder = new google.maps.Geocoder();

  // Input Fields
  const firstName = document.getElementById("first_name");
  const lastName = document.getElementById("last_name");
  const country = document.getElementById("country");
  const city = document.getElementById("city");
  const street = document.getElementById("street");
  //Error message
  const errorMessage = document.querySelector(".error-message");
  //Form Submit button
  const submitButton = document.getElementById("submit");

  //Inputs array (input, and error message)
  const inputs = [firstName, lastName, street, city, country];

  //Marker initialization
  marker = new google.maps.Marker({
    map
  });

  //Get latitude and longitude on click
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });

  //Form button click event
  submitButton.addEventListener("click", () => {
    if (
      firstName.value != "" &&
      lastName.value != "" &&
      street.value != "" &&
      city.value != "" &&
      country.value != ""
    ) {
      errorMessage.style.visibility = "hidden";
      geocode({ address: `${street.value}, ${city.value}, ${country.value}` });
    } else {
      /*
    If NOT, show validation message error message for every input field that is empty and fill the input field with the red color (add/remove "validation-error" class)
  */
      inputs.forEach((input) => {
        if (input.value === "") {
          input.classList.add("validation-error");
          errorMessage.style.visibility = "visible";
        }
        if (input.value !== "") {
          input.classList.remove("validation-error");
          errorMessage.style.visibility = "hidden";
        }
      });
    }
  });
  /*
  On change event --> Check if input field is empty, IF NOT remove "validation-error" class from input field and hide error message
   */
  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      if (e.target.value !== "") {
        input.classList.remove("validation-error");
      }
      if (
        firstName.value != "" &&
        lastName.value != "" &&
        street.value != "" &&
        city.value != "" &&
        country.value != ""
      ) {
        errorMessage.style.visibility = "hidden";
      }
    });
  });
  clear();
}

//Clear map
const clear = () => {
  marker.setMap(null);
};

//Geocode method
const geocode = (request) => {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
};
