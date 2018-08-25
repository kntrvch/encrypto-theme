(function ($) {
    "use strict";

    document.body.className = document.body.className.replace("no-js", "js");

    // EXPERIMENTAL smooth scrolling
    // jQuery.scrollSpeed(100, 800, 'easeOutCubic');

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 120)
                }, 1000, "easeInOutQuad");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 120
    });

    // Stats counter
    $('.counter').counterUp();

    // Collapse Navbar
    if ($("body").hasClass("home") && !($("body").hasClass("navbar-static"))) {
        var navbarCollapse = function () {
            if ($("#mainNav").offset().top > 100) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        };
        // Collapse now if page is not at top
        navbarCollapse();
        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);
    } else {
        $("#mainNav").addClass("navbar-shrink");
    }

    // Initialize map
    if ($('#map').length > 0) {

        // by Dylan Vann (https://dylanvann.com/custom-animated-google-maps-markers/)

        CustomMarker.prototype = new google.maps.OverlayView();

        CustomMarker.prototype.draw = function () {
            var self = this;
            var div = this.div;
            if (!div) {
                div = this.div = $('' +
                    '<div>' +
                    '<div class="shadow"></div>' +
                    '<div class="pin-wrap">' +
                    '<div class="pin"></div>' +
                    '</div>' +
                    '</div>' +
                    '')[0];
                this.pinWrap = this.div.getElementsByClassName('pin-wrap');
                this.pin = this.div.getElementsByClassName('pin');
                this.pinShadow = this.div.getElementsByClassName('shadow');
                div.style.position = 'absolute';
                div.style.cursor = 'pointer';
                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
                google.maps.event.addDomListener(div, "click", function (event) {
                    google.maps.event.trigger(self, "click", event);
                });
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.position);
            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
        };

        var myLatlng = new google.maps.LatLng(40.7420371, -73.9875635);
        var mapOptions = {
            zoom: 14,
            center: myLatlng,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ],
            disableDefaultUI: true
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new CustomMarker({
            position: myLatlng,
            map: map,
        });

    }

    $("#scrollToTop").click(function (e) {
        e.preventDefault();
        $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    });

    // Owl Carousel
    if ($('#testimonials').length > 0) {
        $('#testimonials .owl-carousel').owlCarousel({
            loop: true,
            items: 1,
            dots: true,
            autoplay: true
        });
    }

    if ($('#partners').length > 0) {
        $('#partners .owl-carousel').owlCarousel({
            loop: true,
            dots: false,
            autoplay: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 4
                }
            }
        });
    }

    // Validate contact form
    if ($('#contactForm').length > 0) {
        $("#contactForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: "Please enter a valid email address",
                message: "Your message is too short (required min. 20 characters)"
            }
        });
    }

    // Validate newsletter form
    if ($('#newsletterForm').length > 0) {
        $("#newsletterForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: "Please enter a valid email address"
            }
        });
    }

    // Validate sign in form
    if ($('#signinForm').length > 0) {
        $("#signinForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }, 
                password: {
                    required: true
                }
            },
            messages: {
                email: "Please enter a valid email address", 
                password: "Please enter your password"
            }
        });
    }

    // Validate sign up form
    if ($('#signupForm').length > 0) {
        $("#signupForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }, 
                password1: {
                    required: true
                }, 
                password2: {
                    equalTo: "#signUpInputPassword1"
                }, 
                tos: {
                    required: true
                }
            },
            messages: {
                email: "Please enter a valid email address", 
                password1: "Please enter your password", 
                password2: "Passwords do not match",
                tos: "You must agree to the Terms of Service"
            }
        });
    }

    // Typed.js
    if ($("body").hasClass("typed") && $("#typed-strings").length > 0) {
        var typed = new Typed('#typed', {
            stringsElement: '#typed-strings',
            typeSpeed: 50,
            startDelay: 500,
            backSpeed: 20,
            backDelay: 500,
            cursorChar: '_',
            onComplete: function (self) {
                // when typing finished change header style and reveal lead text
                $(self.el).addClass("text-primary");
                $("header.masthead .animated").delay(500).addClass("fadeIn");
                $("header.masthead .btn.animated").addClass("infinite pulse").removeClass("fadeIn").css("opacity", "1");
            }
        });
    }

    // WOW.js / scroll reveal
    if ($('.wow').length > 0) {
        new WOW().init();
    }

    // Gradient background
    var colors = new Array(
        [63, 81, 181],
        [103, 58, 183],
        [34, 38, 75],
        [22, 23, 79],
        [74, 20, 140],
        [13, 71, 161]);

    var step = 0;

    // [0] current color left
    // [1] next color left
    // [2] current color right
    // [3] next color right
    var colorIndices = [0, 1, 2, 3];

    var gradientSpeed = 0.002;

    function updateGradient() {
        if ($ === undefined) return;

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        $('#gradient').css({
            background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
        }).css({
            background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
        });

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
    }

    setInterval(updateGradient, 10);

    // ICO countdown
    if ($('.countdown').length > 0) {
        var deadline = $(".countdown").attr('data-end');

        var timespan = countdown(Date.now(), new Date(deadline), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
        var timer = countdown(function (timespan) {
            if (timespan != null && timespan != undefined && timespan.value > 0) {
                $(".countdown__time__number--days").text(addLeadingZero(timespan.days));
                $(".countdown__time__number--hours").text(addLeadingZero(timespan.hours));
                $(".countdown__time__number--minutes").text(addLeadingZero(timespan.minutes));
                $(".countdown__time__number--seconds").text(addLeadingZero(timespan.seconds));
            } else {
                window.clearInterval(timer);
                $(".countdown__time__number--days").text("00");
                $(".countdown__time__number--hours").text("00");
                $(".countdown__time__number--minutes").text("00");
                $(".countdown__time__number--seconds").text("00");
            }

        }, new Date(deadline), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);

    }

    // Progress bar animation
    if ($('.progress').length > 0) {
        $('.progress').each(function (i, elem) {
            var progressBar = $(elem).find('.progress-bar');
            var progress = new Waypoint({
                element: $(elem).get(0),
                handler: function (direction) {
                    progressBar.animate({
                        width: progressBar.attr('data-progress') + "%"
                    }, 2000);
                },
                offset: '99%'
            });
        });
    }

    // Donut chart #1
    if ($('#distribution-chart').length > 0) {
        Morris.Donut({
            element: 'distribution-chart',
            data: [
                { label: "Download Sales", value: 12 },
                { label: "In-Store Sales", value: 30 },
                { label: "Mail-Order Sales", value: 20 }
            ],
            resize: true,
            colors: ['#ff6f00', '#6610f2', '#e83e8c', '#f0ad4e', '#5cb85c', '#5bc0de'],
            formatter: function (y, data) { return y + '%' }
        });
    }

    // Line chart #1
    if ($('#trending-chart').length > 0) {
        Morris.Line({
            element: 'trending-chart',
            data: [
                { y: '2012', a: 0, b: 0 },
                { y: '2013', a: 10, b: 0 },
                { y: '2014', a: 25, b: 10 },
                { y: '2015', a: 50, b: 15 },
                { y: '2016', a: 80, b: 40 },
                { y: '2017', a: 95, b: 65 },
                { y: '2018', a: 100, b: 75 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Encrypto', 'Average'],
            hideHover: "auto",
            smooth: false,
            lineColors: ['#ff6f00', '#1a237e'],
            resize: true
        });
    }

    // Sign-in popup animation
    if ($('#signin-modal').length > 0) {
        $('#signin-modal').on('show.bs.modal', function (e) {
            $('#signin-modal .modal-dialog').attr('class', 'modal-dialog modal-dialog-centered animated zoomIn');
        })
        $('#signin-modal').on('hide.bs.modal', function (e) {
            $('#signin-modal .modal-dialog').attr('class', 'modal-dialog modal-dialog-centered animated zoomOut');
        })
    }

})(jQuery);


// Preloader
$(window).on('load', function () {
    $('#preloader').fadeOut('slow');
});

// Page header animation
$(window).on('load', function () {
    if ($('.page-header.animated').length > 0) {
        $('.page-header.animated').addClass('fadeIn');
    }
});

// Mobile Animation
$(window).on('load', function () {
    if ($('#mobile').length > 0) {
        var anim = new Vivus('mobile-svg', { duration: 100, type: 'sync', start: 'autostart', forceRender: false }, function () {
            $('#mobile-image').addClass('visible');
            $('#mobile-svg').fadeOut();
        });
    }
});

// Ticker
$(window).on('load', function () {
    if ($('#ticker').length > 0) {
        $("#ticker .ticker__item__graph .line").peity("line", {
            fill: 'none'
        });

        $('.ticker').marquee({
            duration: 5000,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true,
            speed: 150,
            startVisible: true,
            gap: 0
        });
    }
});

// Cryptocurrency table
$(window).on('load', function () {
    if ($('.cryptocurrency-table').length > 0) {
        $(".cryptocurrency-table .cryptocurrency-table__chart--line").peity("line", {
            stroke: "#ff6f00",
        });
    }
});

// Scroll to top
$(window).on('scroll', function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#scrollToTop").fadeIn('slow');
    } else {
        $("#scrollToTop").fadeOut('slow');
    }
});

// Particles JS
if($("#particles-js").length > 0) {
    var particleConfig = {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 3
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 200,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };
    
    particlesJS('particles-js', particleConfig, function() {});
}

// FSS background
if ($('#background-container').length > 0) {
    var config = {};


    $(function () {

        var $body = $(document.body),
            $window = $(window);

        var canvas = document.createElement('canvas');

        backgroundEnabled = canvas.getContext && canvas.getContext('2d') && $('#background-container').css('display') != 'none';

        if (backgroundEnabled) {
            config.background = {
                enabled: true,

                RENDER: {
                    renderer: 'canvas'
                },

                MESH: {
                    ambient: '#555555', // Default 
                    diffuse: '#ffffff', // Default
                    width: 1.2, // Triangle Width
                    height: 1.2, // Triangle Height
                    depth: 10, // Transparency of the triangles
                    segments: 16, // Number of triangles to display in 1 row
                    slices: 8, // Number of triangles to display in 1 column
                    xRange: 0.8, // Wideness of the triangles in X Position
                    yRange: 0.1, // Wideness of the triangles in Y Position
                    speed: 0.001 
                },

                LIGHT: {
                    autopilot: true, 
                    ambient: '#0d47a1',
                    diffuse: '#1565c0',
                    count: 1,
                    zOffset: 100,

                    speed: 0.001,
                    gravity: 1200,
                    dampening: 0.15,
                    minLimit: 8,
                    minDistance: 20,
                    maxDistance: 400
                }
            }

            initBackground();
        }
    });
}


function CustomMarker(opts) {
    this.setValues(opts);
}

function addLeadingZero(num) {
    if (parseInt(num) < 10) {
        num = "0" + num.toString();
    }
    return num;
}