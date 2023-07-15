import { format, getDay } from "date-fns"

const weekdayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

let cityName = "London"
const baseURL = "http://api.weatherapi.com/v1"
const method = "/forecast.json"
const key = "?key=15e687fcffb44214b6f30656231407"
let q = "&q=" + cityName
let otherSettings = "&days=3&aqi=no&alerts=no"

let call = baseURL + method + key + q + otherSettings

let locationJson
let todayJson
let tomorrowJson
let twoDayNextJson

function fetchAndDisplay() {
  fetch(call, { mode: "cors" })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      console.log(response)
      locationJson = response.location
      todayJson = response.forecast.forecastday[0]
      tomorrowJson = response.forecast.forecastday[1]
      twoDayNextJson = response.forecast.forecastday[2]

      displayData()
    })
    .catch(() =>
      alert(
        "Unsuccessful in retreiving data. Possibly due to incorrect name or problem with server. Please check the city name Input"
      )
    )
}

function displayData() {
  const cityNameDiv = document.getElementById("cityNameDiv")
  const countryNameDiv = document.getElementById("countryNameDiv")

  const todayDate = document.getElementById("todayDate")
  const todayTemp = document.getElementById("todayTemp")
  const todayIcon = document.getElementById("todayIcon")

  const tomorrowWeekday = document.getElementById("tomorrowWeekday")
  const tomorrowTemp = document.getElementById("tomorrowTemp")
  const tomorrowIcon = document.getElementById("tomorrowIcon")

  const dayAftTomWeekday = document.getElementById("dayAftTomWeekday")
  const dayAftTomTemp = document.getElementById("dayAftTomTemp")
  const dayAftTomIcon = document.getElementById("dayAftTomIcon")

  const todayDateObj = Date.parse(todayJson.date)

  cityNameDiv.innerHTML = locationJson.name
  countryNameDiv.innerHTML = locationJson.country

  todayDate.innerHTML = `Today: ${weekdayArr.at(
    getDay(todayDateObj)
  )} (${format(todayDateObj, "M.d")})`
  todayTemp.innerHTML = Math.round(todayJson.day.avgtemp_c) + "°C"
  todayIcon.src = todayJson.day.condition.icon

  tomorrowWeekday.innerHTML = weekdayArr.at(
    getDay(Date.parse(tomorrowJson.date))
  )
  tomorrowTemp.innerHTML = Math.round(tomorrowJson.day.avgtemp_c) + "°C"
  tomorrowIcon.src = tomorrowJson.day.condition.icon

  dayAftTomWeekday.innerHTML = weekdayArr.at(
    getDay(Date.parse(twoDayNextJson.date))
  )
  dayAftTomTemp.innerHTML = Math.round(twoDayNextJson.day.avgtemp_c) + "°C"
  dayAftTomIcon.src = twoDayNextJson.day.condition.icon

  searchTextInput.value = ""
}

searchTextInput = document.getElementById("searchTextInput")
searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click", () => {
  cityName = searchTextInput.value
  q = "&q=" + cityName
  call = baseURL + method + key + q + otherSettings
  fetchAndDisplay()
})
