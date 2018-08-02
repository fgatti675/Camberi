import Swiper from 'swiper';
import ScrollReveal from 'scrollreveal';
import './main.scss';

(function () {
    const main = document.querySelector('main');
    const aboutPage = document.querySelector('#about');
    const header = document.querySelector('header');
    const location = document.querySelector('.location');
    const background = document.getElementById('background');
    const body = document.querySelector('body');
    const pages = document.querySelectorAll('main .page');

    let currentPageId;

    browsersCheck();
    setUpSwiper();
    setUpScrollReveal();

    onUrlFragmentChange(getUrlFragment(document.URL));

    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);
    main.addEventListener("scroll", onScroll);

    updateHeader();

    function onScroll(evt) {
        evt.preventDefault(); // prevent default browser scroll
        updateURL();
        updateHeader();
    };


    const docheight = Math.max(document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);

    function updateURL() {
        let c = main.scrollTop - docheight / 3;
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            if (c <= page.offsetTop) {
                if (page.id != currentPageId) {
                    currentPageId = page.id;
                    history.replaceState({}, 'Camberí', '#' + page.id);
                }
                break;
            }
        }
    }

    function setUpSwiper() {
        new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            spaceBetween: 16,
            speed: 800,
            autoplay: {
                delay: 5000,
            },
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }

    function setUpScrollReveal() {
        let sr = ScrollReveal({
            container: main
        });
        sr.reveal('.reveal', {
            duration: 2000
        }, 300);
        sr.reveal('.reveal2', {
            reset: true
        });
    }


    function getUrlFragment(url) {
        return url.split('#')[1];
    }

    function onHashChange(e) {
        onUrlFragmentChange(getUrlFragment(e.newURL), getUrlFragment(e.oldURL));
    }

    function onUrlFragmentChange(newFragment, oldFragment) {

        if (newFragment === "about") {
            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                page.classList.add('displaced');
            }
            body.classList.add('displaced');
            body.classList.add('light_bg');
            background.classList.add('displaced');
            aboutPage.classList.add('active');
            aboutPage.classList.add('displayedOnce');

        } else {
            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                page.classList.remove('displaced');
            }
            background.classList.remove('displaced');
            aboutPage.classList.remove('active');
            body.classList.remove('displaced');
            body.classList.remove('light_bg');
        }

        updateHeader();

    }

    function updateHeader() {
        const aboutDisplayed = aboutPage.classList.contains('active');
        let page = pages[0];
        if (page.offsetHeight < main.scrollTop * 2 || aboutDisplayed) {
            header.classList.remove('hidden');
            location.classList.add('hidden');
        } else {
            header.classList.add('hidden');
            location.classList.remove('hidden');
        }
    }


    const fadingPages = document.getElementsByClassName('fade-page');
    function fadePages() {
        for (let i = 0; i < fadingPages.length; i++) {
            let page = fadingPages[i];
            let off = page.offsetTop - main.scrollTop;
            let h = page.offsetHeight;
            let o = off < -h ? 0 : (off > 0 ? 1 : (h + off) / h);
            if (o != 0, 1)
                page.style.opacity = Math.sin(o * Math.PI / 2) + .1;
        }
    }


    function onResize() {
        setUpSwiper();
    }

    function browsersCheck() {
        if (iOS()) {
            document.body.classList.add("is-ios");

            // Get the device pixel ratio
            var ratio = window.devicePixelRatio || 1;

            // Define the users device screen dimensions
            var screen = {
                width: window.screen.width * ratio,
                height: window.screen.height * ratio
            };

            // iPhone X Detection
            if (screen.width == 1125 && screen.height === 2436) {
                document.body.classList.add("is-ios-x");
            }
        }
    }

    function iOS() {
        const iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) { return true; }
            }
        }

        return false;
    }

})();