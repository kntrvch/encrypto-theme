(function ($) {
    "use strict";

    document.body.className = document.body.className.replace("no-js", "js");

    jQuery.scrollSpeed(100, 800, 'easeOutCubic');

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 57)
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
        offset: 57
    });

    // Stats counter
    $('.counter').counterUp();

    // Collapse Navbar
    if ($("body").hasClass("home")) {
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

        // Special thanks to Dylan Vann (https://dylanvann.com/custom-animated-google-maps-markers/)

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

        CustomMarker.prototype.animateDrop = function () {
            dynamics.stop(this.pinWrap);
            dynamics.css(this.pinWrap, {
                'transform': 'scaleY(2) translateY(-' + $('#map').outerHeight() + 'px)',
                'opacity': '1',
            });
            dynamics.animate(this.pinWrap, {
                translateY: 0,
                scaleY: 1.0,
            }, {
                    type: dynamics.gravity,
                    duration: 1800,
                });

            dynamics.stop(this.pin);
            dynamics.css(this.pin, {
                'transform': 'none',
            });
            dynamics.animate(this.pin, {
                scaleY: 0.8
            }, {
                    type: dynamics.bounce,
                    duration: 1800,
                    bounciness: 600,
                })

            dynamics.stop(this.pinShadow);
            dynamics.css(this.pinShadow, {
                'transform': 'scale(0,0)',
            });
            dynamics.animate(this.pinShadow, {
                scale: 1,
            }, {
                    type: dynamics.gravity,
                    duration: 1800,
                });
        };

        CustomMarker.prototype.animateBounce = function () {
            dynamics.stop(this.pinWrap);
            dynamics.css(this.pinWrap, {
                'transform': 'none',
            });
            dynamics.animate(this.pinWrap, {
                translateY: -30
            }, {
                    type: dynamics.forceWithGravity,
                    bounciness: 0,
                    duration: 500,
                    delay: 150,
                });

            dynamics.stop(this.pin);
            dynamics.css(this.pin, {
                'transform': 'none',
            });
            dynamics.animate(this.pin, {
                scaleY: 0.8
            }, {
                    type: dynamics.bounce,
                    duration: 800,
                    bounciness: 0,
                });
            dynamics.animate(this.pin, {
                scaleY: 0.8
            }, {
                    type: dynamics.bounce,
                    duration: 800,
                    bounciness: 600,
                    delay: 650,
                });

            dynamics.stop(this.pinShadow);
            dynamics.css(this.pinShadow, {
                'transform': 'none',
            });
            dynamics.animate(this.pinShadow, {
                scale: 0.6,
            }, {
                    type: dynamics.forceWithGravity,
                    bounciness: 0,
                    duration: 500,
                    delay: 150,
                });
        };

        CustomMarker.prototype.animateWobble = function () {
            dynamics.stop(this.pinWrap);
            dynamics.css(this.pinWrap, {
                'transform': 'none',
            });
            dynamics.animate(this.pinWrap, {
                rotateZ: -45,
            }, {
                    type: dynamics.bounce,
                    duration: 1800,
                });

            dynamics.stop(this.pin);
            dynamics.css(this.pin, {
                'transform': 'none',
            });
            dynamics.animate(this.pin, {
                scaleX: 0.8
            }, {
                    type: dynamics.bounce,
                    duration: 800,
                    bounciness: 1800,
                });
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

        google.maps.event.addListener(marker, 'click', function (e) {
            marker.animateWobble();
        });

        $('#drop').on('click', function (e) {
            marker.animateDrop();
        });

        $('#wobble').on('click', function (e) {
            marker.animateWobble();
        });

        $('#bounce').on('click', function (e) {
            marker.animateBounce();
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
    if ($('#contact').length > 0) {
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
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                email: "Please enter a valid email address",
                message: "Your message is too short (required min. 20 characters)"
            }
        });
    }

    // Validate newsletter form
    if ($('#newsletter').length > 0) {
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

    // 03 Animation
    //var anim = new Vivus('traces', { type: 'delayed', duration: 200, start: 'autostart', forceRender: false }, function () {});

    // ICO countdown
    if ($('.countdown').length > 0) {
        var now = $(".countdown").attr('data-start');
        var deadline = $(".countdown").attr('data-end');

        var timespan = countdown(new Date(now), new Date(deadline), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
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

    // Donut chart
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

// 01 Animation
$(window).on('load', function () {
    if ($('#mobile').length > 0) {
        var anim = new Vivus('mobile-svg', { duration: 100, type: 'sync', start: 'autostart', forceRender: false }, function () {
            //$('#mobile-image').fadeIn('slow');
            $('#mobile-image').addClass('visible');
        });
    }
});

// 04 Animation
$(window).on('load', function () {
    if ($('#trace').length > 0) {
        var anim = new Vivus('trace-svg', { duration: 200, type: 'sync', start: 'autostart', forceRender: false }, function () {
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

// Vector map animation
$(window).on('load', function () {
    if ($('#map-svg').length > 0) {
        var trigger = new Waypoint({
            element: document.getElementById('map-svg-lines'),
            handler: function (direction) {
                var a = document.getElementById("map-svg-lines");
                var svgDoc = a.contentDocument;
                var pathEls = svgDoc.querySelectorAll("path.line");
                for (var i = 0; i < pathEls.length; i++) {
                    var pathEl = pathEls[i];
                    var offset = anime.setDashoffset(pathEl);
                    pathEl.setAttribute('stroke-dashoffset', offset);
                    anime({
                        targets: pathEl,
                        strokeDashoffset: [offset, 0],
                        duration: anime.random(1000, 3000),
                        delay: function (el, i) { return i * 250 },
                        loop: false,
                        direction: 'normal',
                        easing: 'easeInOutSine',
                        autoplay: true
                    });
                }
            }, 
            offset: '95%'
        })
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

function CustomMarker(opts) {
    this.setValues(opts);
}

function addLeadingZero(num) {
    if (parseInt(num) < 10) {
        num = "0" + num.toString();
    }
    return num;
}