$(document).ready(() => {
    let currentSection = 0;
    let touchStartPosition;

    const disableWheel = (time) => {
        $(window).off('wheel');
        $(document).off('touchend');
        setTimeout(() => {
            $(window).on('wheel', manageSections);
            $(document).bind('touchend', manageSectionsMobile);
        }, time);
    }

    const manageSections = (e) => {
        if (e.originalEvent.wheelDelta < 0 && currentSection < 2) {
            changeSection(currentSection, currentSection + 1);
            currentSection++;
        } else if (e.originalEvent.wheelDelta > 0 && currentSection > 0) {
            changeSection(currentSection, currentSection - 1);
            currentSection--;
        }
    }

    const changeLogoColor = (color, time) => {
        const logoWhite = 'assets/images/logo.svg';
        const logoBrown = 'assets/images/logo-brown.svg';

        if (color === 'white') {
            setTimeout(() => {
                $('#pageLogo').attr('src', logoWhite);
            }, time)
        } else if (color === 'brown') {
            setTimeout(() => {
                $('#pageLogo').attr('src', logoBrown);
            }, time)
        } else {
            throw new Error('Unexpected color in changeLogoColor function. Expected "white" or "brown" but get: ' + color);
        }
    }

    const changeSection = (prev, next) => { 
        if (prev == 0 && next == 1) {
            disableWheel(850);
            changeLogoColor('brown', 700);
            $('html, body').animate({
                scrollTop: $('.section__about').offset().top
            }, 800, () => {
                $('.section__home').css('visibility', 'hidden');
            });
        } else if (prev == 1 && next == 2) {
            disableWheel(950);
            changeLogoColor('white', 50);
            $('.section__about').fadeOut(500);
            $('.section__coming-soon').fadeIn(900);
        } else if (prev == 2 && next == 1) {
            disableWheel(950);
            changeLogoColor('brown', 50);
            $('.section__coming-soon').fadeOut(500);
            $('.section__about').fadeIn(900)
        } else if (prev == 1 && next == 0) {
            disableWheel(850);
            changeLogoColor('white', 300);
            $('.section__home').css('visibility', 'visible');
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        }
    }

    const manageSectionsMobile = (e) => {
        let touchEndPosition = e.originalEvent.changedTouches[0].clientY;
        if (touchStartPosition > touchEndPosition + 5 && currentSection < 2) {
            changeSection(currentSection, currentSection + 1);
            currentSection++;
        } else if (touchStartPosition < touchEndPosition - 5 && currentSection > 0) {
            changeSection(currentSection, currentSection - 1);
            currentSection--;
        }
    }

    $(window).on('wheel', manageSections);
    $(document).bind('touchstart', (e) => {
        touchStartPosition = e.originalEvent.touches[0].clientY;
    })
    $(document).bind('touchend', manageSectionsMobile);
})
