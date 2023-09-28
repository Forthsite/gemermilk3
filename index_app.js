const carousel = document.querySelector('#carousel');
if (carousel){
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        startDragging(e);
    });

    carousel.addEventListener('mouseleave', () => {
        stopDragging();
    });

    carousel.addEventListener('mouseup', () => {
        stopDragging();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        moveCarousel(e.pageX - carousel.offsetLeft);
    });

    carousel.addEventListener('touchstart', (e) => {
        startDragging(e.touches[0]);
    });

    carousel.addEventListener('touchend', () => {
        stopDragging();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        moveCarousel(e.touches[0].pageX - carousel.offsetLeft);
    });

    function startDragging(e) {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }

    function stopDragging() {
        isDown = false;
        carousel.classList.remove('active');
    }
    function moveCarousel(x) {
        const walk = x - startX;
        
        const fixedColumn = carousel.querySelector('.carousel-column:first-child');
        const lastColumn = carousel.querySelector('.carousel-column:last-child');
        const firstColumn = document.querySelector('.fixed-column');
        const firstText = fixedColumn.querySelector('.carousel-text');
        const finaltext= document.querySelector('.finaltext');

        const firstColumnRightEdge = fixedColumn.getBoundingClientRect().right;
        
        const columns = carousel.querySelectorAll('.carousel-column');

        columns.forEach((column, index) => {
            const text = column.querySelector('.carousel-text');
            if (index === 0 && x > firstColumnRightEdge) {
                column.classList.add('sticky')
            } else if (index !== 0) {
                const columnRightEdge = column.getBoundingClientRect().right;
                if (columnRightEdge < firstColumnRightEdge) {
                    column.classList.add('sticky')
                } else if (columnRightEdge > firstColumnRightEdge) {
                    column.classList.remove('sticky')
                }
            }
        });

        if (walk < 0) {
            // Prevent scrolling past the left edge
            carousel.scrollLeft = Math.max(scrollLeft - walk, 0);
        } else if (x > firstColumnRightEdge) {
            carousel.scrollLeft = scrollLeft - walk;
        }
        
        columns.forEach((column, index) => {
            const text = column.querySelector('.carousel-text');
            if (columns[index-1 ] && column !== firstColumn && column.classList.contains('sticky')){
                columns[index-1].querySelector('.carousel-text').style.opacity = 0;
            }
            else {
                text.style.opacity = 1;
            }
        });
}



const carouselBg = document.querySelector('#carouselBg');
const scrollbarThumb = document.querySelector('.scroll-thumb')
const viewportWidth = window.innerWidth;
carouselBg.style.backgroundPositionX = '-10%';
carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    carouselBg.style.backgroundPositionX = `calc(-10% + ${-scrollLeft}px)`;
    const scrollableWidth = carousel.scrollWidth - carousel.clientWidth;
    const thumbPosition = (scrollLeft / scrollableWidth) * 80;
    scrollbarThumb.style.left = `${thumbPosition}%`
});

}

const produktyExpander = document.querySelector('#menu-expander');
const menuExpansion = document.querySelector('.menu-expansion');
const produktyArrow = document.querySelector('#productarrw');

produktyExpander.addEventListener('mouseover', () =>{
    menuExpansion.classList.toggle('visible');
    produktyArrow.classList.toggle('arrow-hovered');
});

const langSelect = document.querySelector('.lang-select');
const langSelectMobile = document.querySelector('.lang-select-mobile')
const selectedLang = document.querySelectorAll('.selected');
const langArrow = document.querySelector('#langarrw');
const nonselectedLangs = document.querySelectorAll('.non-selected')

selectedLang.forEach((selected) =>{
    selected.addEventListener('mouseenter', () =>{
        nonselectedLangs.forEach((lang) =>{
            lang.classList.toggle('visible');
        });
        langArrow.classList.toggle('arrow-hovered');
        langSelect.classList.toggle('open');
        langSelectMobile.classList.toggle('open');
    });
});
selectedLang.forEach((selected) =>{
    selected.addEventListener('click', () =>{
        nonselectedLangs.forEach((lang) =>{
            lang.classList.toggle('visible');
        });
        langArrow.classList.toggle('arrow-hovered');
        langSelect.classList.toggle('open');
        langSelectMobile.classList.toggle('open');
    });
});
const menuIcon = document.getElementById("menu-icon");
const mobilemenu = document.querySelector('.mobile-menu');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () =>{
    mobilemenu.classList.toggle('mobmenu-visible');
    mobilemenu.classList.toggle('mobmenu-invisible');
    menuIcon.classList.toggle("toggled");
});






