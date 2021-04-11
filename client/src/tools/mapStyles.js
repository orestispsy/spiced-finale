const modest = [
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [
            {
                color: "#202c3e",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                gamma: 0.01,
            },
            {
                lightness: 20,
            },
            {
                weight: "1.39",
            },
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                weight: "0.96",
            },
            {
                saturation: "9",
            },
            {
                visibility: "on",
            },
            {
                color: "#000000",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                lightness: 30,
            },
            {
                saturation: "9",
            },
            {
                color: "#29446b",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                saturation: 20,
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                lightness: 20,
            },
            {
                saturation: -20,
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                lightness: 10,
            },
            {
                saturation: -30,
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#193a55",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                saturation: 25,
            },
            {
                lightness: 25,
            },
            {
                weight: "0.01",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                lightness: -20,
            },
        ],
    },
];

const pinky = [
    {
        featureType: "all",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ad2222",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                saturation: 36,
            },
            {
                color: "#000000",
            },
            {
                lightness: 40,
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "off",
            },
            {
                color: "#000000",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 20,
            },
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: "administrative.province",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#000000",
            },
        ],
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on",
            },
            {
                hue: "#ff0000",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#c42323",
            },
            {
                visibility: "on",
            },
            {
                saturation: "0",
            },
            {
                lightness: "30",
            },
            {
                gamma: "2.53",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#d31b1b",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                lightness: 18,
            },
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ff0042",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ff0042",
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                color: "#dd0909",
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#b00f0f",
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off",
            },
            {
                color: "#ff0042",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 17,
            },
        ],
    },
];

const vintage = [
    {
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#2f343b",
            },
        ],
    },
    {
        featureType: "landscape",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#703030",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#2f343b",
            },
            {
                weight: 1,
            },
        ],
    },
];

const blackRed = [
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                saturation: 36,
            },
            {
                color: "#000000",
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#000000",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#950029",
            },
            {
                lightness: 17,
            },
        ],
    },
];

const normal = [
    {
        featureType: "poi.business",
        elementType: "labels.icon",
        stylers: [
            {
                hue: "#ff0000",
            },
        ],
    },
];

const green = [
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#3e606f",
            },
            {
                weight: 2,
            },
            {
                gamma: 0.84,
            },
        ],
    },
    {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                weight: 0.6,
            },
            {
                color: "#313536",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#44a688",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#13876c",
            },
        ],
    },
    {
        featureType: "poi.attraction",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#f5e4e4",
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.attraction",
        elementType: "labels",
        stylers: [
            {
                visibility: "on",
            },
            {
                lightness: "14",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#13876c",
            },
            {
                visibility: "simplified",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#067372",
            },
            {
                lightness: "-20",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#357374",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#004757",
            },
        ],
    },
];

export default { modest, pinky, vintage, blackRed, normal, green}