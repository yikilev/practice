ymaps.ready(init);
function init() {
    var LITTLE_RESTRICT_AREA = [
        [56.070882, 37.057308], 
        [55.459640, 38.438838]
    ];
    var LITTLE_ZOOM_RANGE = [9.5, 20];
    var myMap = new ymaps.Map('map', {
        center: [55.755864, 37.617698], // координаты центра карты
        zoom: 9.5, // уровень масштабирования
        controls: ['zoomControl'],
        behaviors: ['drag', 'scrollZoom'],
        // maxZoom: 15,
    }, {
        restrictMapArea: LITTLE_RESTRICT_AREA
    });
    myMap.options.set('minZoom', LITTLE_ZOOM_RANGE[0]);
    myMap.options.set('maxZoom', LITTLE_ZOOM_RANGE[1]);

    loadAllOrganisations(myMap);
}

function loadAllOrganisations(myMap) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_compound_data/", true);
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        for (i = 0; i < data.length; i++) {
            console.log(data[i].coordinates.split(", ").map(Number));
            putIcon(myMap, data[i].coordinates.split(", ").map(Number), data[i].contacts)
        }
        // for (var i = 0; i < compounds.length; i++) {
        //     console.log("HERE --- is ");
        //     console.log(routes[i].fields.coordinates == "[]");
        //     if (routes[i].fields.coordinates != "[]") {
        //         var routeButton = document.createElement('button');
        //         routeButton.textContent = routes[i].fields.name;
        //             (function(route) {
        //                 routeButton.addEventListener('click', function () {
        //                         getRoute(myMap, route.fields.coordinates, route.fields.difficulty, route.fields.length, route.fields.name, route.fields.notes, route.fields.seasons, route.pk);
        //                     });
        //                 })(routes[i]);
        //             routesContainer.appendChild(routeButton);
        //     }
        // }
    };
    xhr.send();
}

function putIcon(myMap, coordinate, contacts) 
{
    var myPlacemark = new ymaps.Placemark(
        coordinate,
        {
            balloonContent: contacts
        },
        {
            iconLayout: 'default#image',
            iconImageSize: [30, 30] // Размеры изображения
        }
    );
    myMap.geoObjects.add(myPlacemark);
}


// function getRoute(myMap, coordinates, difficulty, length, name, notes, seasons, id) {
//     console.log(notes);
//     var existingRectangle = document.getElementById("rectangleDiv");
//     if (existingRectangle) {
//         existingRectangle.parentNode.removeChild(existingRectangle);
//     }
//     deleteLineObjects(myMap);
//     //deleteAllPlacemarks
//     var placemarks = [];
//         myMap.geoObjects.each(function (geoObject) {
//             if (geoObject instanceof ymaps.Placemark && geoObject.geometry.getCoordinates() != centerCoordinates[0] + "," + centerCoordinates[1]) {
//                 placemarks.push(geoObject);
//             }
//         });
//         placemarks.forEach(function (placemark) {
//             myMap.geoObjects.remove(placemark);
//         });

//     var lineCoordinates = JSON.parse(coordinates);
//     var myPolyline = new ymaps.AnimatedLine(lineCoordinates, {}, {
//         strokeColor: "#0000FF", // цвет линии
//         strokeWidth: 4, // ширина линии
//         strokeOpacity: 0.5, // прозрачность линии
//         animationTime: 2000
//     });
//     myMap.geoObjects.add(myPolyline);
//     myMap.setCenter(lineCoordinates[0], 12);
//     putPlaceMark(myMap, lineCoordinates[0], "Начало маршрута");
//     myPolyline.animate()
//         .then(function() {
//             return putPlaceMark(myMap, lineCoordinates[lineCoordinates.length - 1], "Конец маршрута");
//         })
//         .then(function() {
//             var rectangle = document.createElement("div");
//             rectangle.id = "rectangleDiv";
//             rectangle.style.position = "absolute";
//             rectangle.style.top = "0";
//             rectangle.style.left = "0";
//             rectangle.style.width = "100vh";
//             rectangle.style.height = "50px"; // Высота прямоугольника - 100px
//             rectangle.style.backgroundColor = "black";
//             rectangle.style.zIndex = 1;
//             rectangle.style.display = "flex";
//             rectangle.style.flexDirection = "row";
//             rectangle.style.opacity = 0.5;
//             rectangle.style.marginLeft = "15vh";
//             rectangle.style.marginTop = 0;
//             rectangle.style.justifyContent = "center";
//             rectangle.style.alignItems = "center";
//             var labels = ["Сложность", "Длина", "Название", "Сезон"];
//             var data = [difficulty, length, name, seasons];
//             labels.forEach(function(label, index) {
//                 var text = document.createElement("p");
//                 text.textContent = label + ":\n" + data[index];
//                 text.style.color = "#fff";
//                 text.style.marginLeft = "20px";
//                 text.style.marginTop = "20px";
//                 rectangle.appendChild(text);
//                 index += 1;
//             });
//             var container = document.getElementById("map"); // Замените "yourDivId" на id вашего div
//             container.insertBefore(rectangle, container.firstChild);
//             console.log("ID road: -> " + id);
//         })
//         .then(function() {
//             var placemarkNotes = JSON.parse(notes);
//             console.log(placemarkNotes);
//             placemarkNotes.forEach(function(note) {
//                 console.log(note);
//                 putPlaceMark(myMap, note[0], note[1]);
//             });
//         });
// }

// function putPlaceMark(myMap, coords, text) {
//     var placemark = new ymaps.Placemark(coords, {
//         balloonContentHeader: text,
//     }, {
//         preset: 'islands#redCircleIcon'
//     });
//     myMap.geoObjects.add(placemark);
// }

// function deleteLineObjects(myMap) {
//     for (var i = myMap.geoObjects.getLength() - 1; i >= 0; i--) {
//         var geoObject = myMap.geoObjects.get(i);
//         if (geoObject instanceof ymaps.Polyline) {
//             myMap.geoObjects.remove(geoObject);
//         }
//     }
// }