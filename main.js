const inputSearch = document.getElementById('inputSearch')
const submitBtn = document.getElementById('submit-btn')


//-- MAP API: --//
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.505, -0.09]).addTo(map);


submitBtn.addEventListener("click", () => {
    console.log(inputSearch.value, typeof(inputSearch.value));
    var value = inputSearch.value
    inputSearch.value = ''

    submitData(value)
})


function submitData(value) {
    var url = `https://ipapi.co/${value}/json/`
    fetch(url)
     .then(data => data.json())
     .then((res) => {
        console.log(res)

        var ipDisplay = document.getElementById('ip-display-p')
        var locationDisplay = document.getElementById('location-display-p')
        var timezoneDisplay = document.getElementById('timezone-display-p')
        var ispDisplay = document.getElementById('isp-display-p')

        if(res.error) {
            var modalError = document.getElementById('modal-error')
            modalError.style.display = "block"

            var contentWrapper = document.getElementById('content-wrapper')
            contentWrapper.style.display = "block"

            setTimeout(() => {
                modalError.style.display = "none"
                contentWrapper.style.display = "none"
            }, 2500)
            ipDisplay.innerHTML = `ERROR`
            locationDisplay.innerHTML = `ERROR`
            timezoneDisplay.innerHTML = `ERROR`
            ispDisplay.innerHTML = `ERROR`
        } else {
            var modalSuccess = document.getElementById('modal-success')
            modalSuccess.style.display = "block"

            var contentWrapper = document.getElementById('content-wrapper')
            contentWrapper.style.display = "block"

            setTimeout(() => {
                modalSuccess.style.display = "none"
                contentWrapper.style.display = "none"
            }, 2500)
            
            ipDisplay.innerHTML = `${res.ip}`
            locationDisplay.innerHTML = `${res.city}, ${res.region_code} - ${res.country_code}`
            timezoneDisplay.innerHTML = `UTC ${res.utc_offset}`
            ispDisplay.innerHTML = `${res.org}`
    
            var latitude = res.latitude
            var longitude = res.longitude
    
            map.setView([latitude, longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            marker = L.marker([latitude, longitude]).addTo(map);
        }
     })
}
