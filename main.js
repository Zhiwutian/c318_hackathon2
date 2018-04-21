
$(document).ready(initializeSolarApp);

var solarBodies = {

    "sun":{ wikiLink: null, videos: [], nasaPicture: [8,26,44]},
    "mercury":{ wikiLink: null, videos: [], nasaPicture: [16,21,66]},
    "venus":{ wikiLink: null, videos: [], nasaPicture: [21,28,16, 41]},
    "earth":{ wikiLink: null, videos: [], nasaPicture: [56,72,89]},
    "mars":{ wikiLink: null, videos: [], nasaPicture: [2,16,18,36,47]},
    "uranus":{ wikiLink: null, videos: [], nasaPicture: [3,26,45,47]},
    "jupiter":{ wikiLink: null, videos: [], nasaPicture: [35,97,52]},
    "saturn":{ wikiLink: null, videos: [], nasaPicture: [46,26,39,50,95]},
    "neptune":{ wikiLink: null, videos: [], nasaPicture: [80,19,14]},
    "pluto":{ wikiLink: null, videos: [], nasaPicture: [4,3,1,2]}
};

function initializeSolarApp(){

        startModalClickHandler ();
    for(let planet in solarBodies){
        $(`.${planet}Div`).click( function(){
            renderPlanetInfoInModal(planet);
        });
        $(".modalShadow").click(function(){
            $(this).hide();
        });
        $(".modalBody").click(function(){
            event.stopPropagation();
        })
    }
    moveBackgroundOnMouseMove()

}

function moveBackgroundOnMouseMove() {
    let galaxyBackground = $(".mainDisplayDiv");
    galaxyBackground.on('mousemove', function(){
        galaxyBackground.css("background-position-y", -1*event.offsetY + "px");

    });

    populatePictureArr();
    animateBackground($(".mainDisplayDiv"), -.05);
    displayText(solarBodies);

}

function startModalClickHandler () {
    console.log("click");
    $("#bodyId").click(hideStartModal)
}

function hideStartModal () {
    console.log("hideModal");
    $("#startModal").hide();
}

function getDataFromYoutube(planetInfo) {

    var youtubeAjaxObject = {
        'dataType': 'json',
        'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
        'method': 'POST',
        'timeout': 3000,
        'data': {
            'q': 'solar system ' + planetInfo,
            'maxResults': 3,
            'type': 'video',
            'detailLevel': 'verbose'
        },
        'success': function (result) {
            removeLoader();
            var currentSolarBodiesArr = Object.keys(result.data);
            console.log(Object.keys(result.data));
            solarBodies.planetInfo = currentSolarBodiesArr;
            renderVideosOnModal(currentSolarBodiesArr, planetInfo);
        },
        'error': function (error) {
            console.log(error)
        }
    };

    $.ajax(youtubeAjaxObject);
}


function renderPhotosOnModal () {
    let modal = $("#contentDiv");
    var photosToRender = $("<img>", {
        "id" : "imageCarousel",
        "src": "images/editsun.jpg"
    });
    $("#contentDiv").append(photosToRender);
    console.log("button works")
}

function renderVideosOnModal (currentSolarBodiesArr, planet) {
    var vidModal = $("<div>", {
        "class" : "videoModal",
        "id" : "videoModal"

    });
    var vidModalBody = $("<div>", {
        "class" : "videoModalBody",
        "id" : "videoModalBody",

    });
    var iFrame = $("<iframe>", {
        "class": 'videoPlayer',
        "id" : "videoPlayer",
        "width" : "560",
        "height" : "315",
        "src" : "",
        "frameborder" : "0",
        "allow" : "autoplay; encrypted-media",

    }).attr("allowFullscreen","allowFullscreen");
    $("#contentDiv").append(vidModal, vidModalBody, iFrame);

    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    for(let videoCodeIterator=0; videoCodeIterator<currentSolarBodiesArr.length; videoCodeIterator++){
        var videoLink = $("<li>", {
            text: planet +' video '+(videoCodeIterator+1),
            'class': 'videoList',
            on: {
                click: function(){
                    loadAndPlayVideo(currentSolarBodiesArr[videoCodeIterator]);
                }
            }
        });
        videoElements.push( videoLink )
    }

    loadAndPlayVideo(currentSolarBodiesArr[0]);
    videoList.append(videoElements);
    $("#contentDiv").append(videoList);
}

function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}



function renderPlanetInfoInModal(planet){
    $("#displayModal").empty();

    var planetInfo = solarBodies[planet];

    var infoContainer = $("<div>",{
        'class': 'displayModal',
        "id": "displayModal"
    });
    var planetTitle = $("<div>",{
        'class': 'modalTitle',
        "id":"modalTitle",
        'on': {
            'click': removeModal
        }
    });
    var aTag=$('<a>').text(planet.toUpperCase())
    planetTitle.prepend(aTag)
    var modalControls = $("<div>", {
        "class": "modalControls",
        "id": "modalControls",

    });
    var imagesButton = $("<button>", {
        "class": "images buttons",
        "id" : "imageButton",
        text: "Images",
        "on": {
            click: function() {
                imagesButtonHandler(planet)
            }
        }

    });
    var informationButton = $("<button>", {
        "class": "information buttons",
        "id" : "infoButton",
        text: "Information",
        "on" : {
            'click': function(){
                infoButtonHandler(planet)
            }
        },
    });
    var videosButton = $("<button>", {
        "class": "videos buttons",
        "id" : "videoButton",

        "on" : {
            'click': function() {
                videoButtonHandler(planet)
            }

        },
        text: "Videos"
    });

    // var planetWikiLink = $("<a>",{
    //     target:"_blank",
    //     href:planetInfo.wikiLink,
    //     text: planet + " wiki info"
    // });
    var contentDiv = $("<div>", {
        "class": "contentDiv",
        "id": "contentDiv"
    });
    var shadowDiv = $("<div>", {
        "class": "shadowDiv",
        "id": "shadowDiv",
        'on': {
            'click': removeModal
        }
    });



    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    var closeButton = $("<button>", {
        'id': 'closeButton',
        'class': 'closeButton',
        'text': 'x',
        'on': {
            'click': removeModal
        }

    });
    for(let videoCodeIterator=0; videoCodeIterator<planetInfo.videos.length; videoCodeIterator++){
        var videoLink = $("<li>", {
            text: 'video '+videoCodeIterator,
            on: {
                click: function(){
                    loadAndPlayVideo(planetInfo.videos[videoCodeIterator]);
                }
            }
        });
        videoElements.push( videoLink )
    }
    videoList.append(videoElements);
    planetTitle.append(closeButton);

    modalControls.append(imagesButton, informationButton, videosButton);
    infoContainer.append(planetTitle,contentDiv, modalControls);

    $("#bodyId").append(infoContainer, shadowDiv);
    $("#displayModal").show();
    imagesButtonHandler(planet);
}

function infoButtonHandler(planet) {
    $('#contentDiv').empty();
    addLoader();
    getWikiText(planet);
    console.log(this)
    $('#modalTitle').hover(function(){
        $(this).css({
            'color': 'purple',
            'background-color': 'transparent',
            'text-decoration': 'underline'
        });
        $($(this).children()[0]).attr("href", solarBodies[planet].wikiLink)
        $($(this).children()[0]).attr('target',"_blank")
        console.log(this)
    })
    $('#modalTitle').visited(function(){
        $(this).css({
            'color': 'white',
            'background-color': 'transparent',
            'text-decoration': 'none'
        });
        console.log(this)
    })
}

function imagesButtonHandler(planet) {
    $('#contentDiv').empty();
    addLoader()
    createCarousel(planet);
}

function videoButtonHandler(planet) {
    $('#contentDiv').empty();
    addLoader();
    getDataFromYoutube (planet);
    loadAndPlayVideo(solarBodies[planet].videos[0]);
    console.log(solarBodies[planet].videos[0])
    // videoCarousel();
}


function removeModal() {
    $('#displayModal').remove();
    $('#shadowDiv').remove();
    this.remove()
}


function loadAndPlayVideo(link){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}

//omers doing his random things down here---------------------------------

function getWikiText(planet) {
    if( planet ==='mercury')  {
        var link='Mercury_(planet)';
        var wikiAjaxObject = {
            'dataType': 'json',
            'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+link+"&callback=?",
            'success': function(data){

                solarBodies[planet].wikiLink='https://en.wikipedia.org/wiki/'+link
                removeLoader();
                parseWikiText(data)
            },

            'error': function (error) {
                console.log(error)
            }
        };
        $.ajax(wikiAjaxObject);
    } else {
        console.log(planet);
        var wikiAjaxObject = {
            'dataType': 'json',
            'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+planet+"&callback=?",
            'success': function(data){

                solarBodies[planet].wikiLink='https://en.wikipedia.org/wiki/'+planet
                removeLoader()
               
                parseWikiText(data)
                
            },

            'error': function (error) {
                console.log(error)
            }
        };
        $.ajax(wikiAjaxObject);
    }
}

getWikiText();

function parseWikiText(data) {
    var markup = data.parse.text["*"];
    var infoDiv = $('<div></div>').html(markup);
    infoDiv.find('a').each(function() { $(this).replaceWith($(this).html()); });
    infoDiv.find('sup').remove();
    infoDiv.find('.mw-ext-cite-error').remove();
    var paragraphContentArr=($(infoDiv).find('.mw-parser-output>p'));
    var textofParagraphContent='';
    var pContentWithTags=textofParagraphContent;
    for(var k=0;k<paragraphContentArr.length;k++){
        pContentWithTags+=("<p>"+paragraphContentArr[k].innerHTML+'</p>')

    }
    removeLoader();
    $('#contentDiv').append(pContentWithTags);
    $('#contentDiv').append(pContentWithTags).addClass('changeText')
}

function populatePictureArr() {
    for (let eachBody in solarBodies){
        var NasaImagesObject= {
            url: 'https://images-api.nasa.gov/search?q='+eachBody,
            method: 'GET',
            success: resp => {
                for(let i=0;i<solarBodies[eachBody].nasaPicture.length;i++){
                    var divToAppend = $("<div>");
                    var imagePath=resp.collection.items[solarBodies[eachBody].nasaPicture[i]].links[0].href;
                    solarBodies[eachBody].nasaPicture[i]=imagePath
                }
            }
        };
        $.ajax(NasaImagesObject)
    }
}

function animateBackground(element, speed, maxTime=Infinity){
    element = $(element);
    var xpercent=0;
    var timer = null;
    var intervalTime = 50; //50 milliseconds
    var elapsedTime = 0;
    maxTime *= 1000;

    function updateBackground(){
        xpercent+=speed;    // x%  coordinate
      elapsedTime+=intervalTime;
      if(elapsedTime>maxTime){
        clearInterval(timer);
      }
      element.css('background-position-x', xpercent+'%');
    }
    timer = setInterval(updateBackground, intervalTime);

  }


  
  
function createCarousel(planetStr){
    removeLoader();
    var images=solarBodies[planetStr].nasaPicture;
    var carouselContainer=$('<div>',{
        'class':'carouselContainer'
    });
    var textOverlayDiv = $("<div>", {
        'class': 'text-overlay-div'
    }).append($('<span>', {
        'text':'IMAGES FROM NASA (CLICK TO SEE MORE)'
    }));
    // var arrowDiv = $("<div>", {
    //     'class': 'arrow',
    //     'text': '>',
    // });

    $('.contentDiv').append(carouselContainer, textOverlayDiv);//inside this selector pick where the carousel should go
    for(var i=0; i<images.length; i++){
        var planetImageContainer= $('<div>',{
            "class" : "carouselImages"});
        $('.carouselContainer').append(planetImageContainer);
        planetImageContainer.css({"background-image":'url('+images[i]+')'});
        if(i===0){
            planetImageContainer.addClass('currentImage');
            planetImageContainer.addClass('hide');
        }else{
            planetImageContainer.addClass('hide');
        }
    }
    // $('.carouseContainer').append(overlayDiv);
    $('.carouselContainer > div').on('click', rotate);
}

function rotate(){
    $(this).removeClass('currentImage');
    var nextImage = $(this).next();
    if (nextImage.length !== 0) {
        nextImage.addClass('currentImage');
    } else {
        $('.carouselContainer :first-child').addClass('currentImage');
    }
}


function addLoader(){
    var loaderDiv=$('<div>',{
        'class':'loader'
    });
    $('.contentDiv').append(loaderDiv);
}

function removeLoader(){
    $('.contentDiv').empty();
}

// DYNAMIC TEXT TO APPEAR
function displayText(planetList){
    for (let planet in planetList){           // loops through the object at each specific key
    $("."+planet+"Div").on("mouseover", function(){
        $(this).empty(); 
        let planetName = this.className.slice(0, (this.className.length-3))
        var planetSpan = $('<span>').text(planetName);   
        var planetTextAppear= $('<div>').append(planetSpan);
        $(this).append(planetTextAppear);
        });
    }
}

// video carousel
// function videoCarousel() {
//     console.log("video carousel function entered");
//     let containerDiv = $("<div>", {
//         'class': 'container'
//     });
//     let carouselDiv = $("<div>", {
//         'class': 'carousel'
//     });
//     let video1 = $("<div>", {
//         'class': 'item a'
//     });
//     let video2 = $("<div>", {
//         'class': 'item b'
//     });
//     let video3 = $("<div>", {
//         'class': 'item c'
//     });
//     let nextButton = $("<div>", {
//         'class': 'next',
//         'text': 'next'
//     });
//     let prevButton = $("<div>", {
//         'class': 'prev',
//         'text': 'prev'
//     });
//     let carousel = $(".carousel"),
//         currdeg  = 0;
//
//     containerDiv.append(carouselDiv);
//     carouselDiv.append(video1, video2, video3);
//     containerDiv.append(nextButton, prevButton);
//     $("body").append(containerDiv);
//
//     $(".next").on("click", { d: "n" }, rotate);
//     $(".prev").on("click", { d: "p" }, rotate);
//
//     function rotate(e){
//         if(e.data.d==="n"){
//             currdeg = currdeg - 60;
//         }
//         if(e.data.d==="p"){
//             currdeg = currdeg + 60;
//         }
//         carousel.css({
//             "-webkit-transform": "rotateY("+currdeg+"deg)",
//             "-moz-transform": "rotateY("+currdeg+"deg)",
//             "-o-transform": "rotateY("+currdeg+"deg)",
//             "transform": "rotateY("+currdeg+"deg)"
//         });
//     }
// }

