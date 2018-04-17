
$(document).ready(initializeApp);

function initializeApp(){
    // $('button').click(getDataFromYoutube);
}

function getDataFromYoutube() {

    var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

    for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
        var youtubeAjaxObject = {
            'dataType': 'json',
            'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            'method': 'POST',
            'timeout': 3000,
            'data': {
                'q': 'solar system ' + solarBodies[solarIndex],
                'maxResults': 3,
                'type': 'video',
                'detailLevel': 'verbose'
            },
            'success': function (result) {
                var currentSolarBodiesArr = Object.keys(result.data);
                console.log(Object.keys(result.data));
                renderVideosOnDom(currentSolarBodiesArr);
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
    }
}

function renderVideosOnDom(solarBodiesSet) {
    for (var solarBody = 0; solarBody < solarBodiesSet.length; solarBody++) {
        var frameTag = $("<iframe>", {
            'id': solarBodiesSet[solarBody] + "Div",
            'width': '560',
            'height': '315',
            'src': 'https://www.youtube.com/embed/' + solarBodiesSet[solarBody],
            'frameborder': '0',
            'allow': 'autoplay; encrypted-media'
        });
        $("body").append(frameTag)
    }
}


getDataFromYoutube();

//omers doing his random shit down here---------------------------------