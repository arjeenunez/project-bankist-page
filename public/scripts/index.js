'use strict';

const slideAction = function () {
    const testimonials = document.querySelectorAll('.testimonials-content');
    const radioBtns = document.querySelectorAll('.testRadio');
    let count = 0;

    const updateClasses = (elements, classes, action) => {
        elements.forEach(element => {
            classes.forEach(cls => element.classList[action](cls));
        });
    };

    const action = [
        { button: 0, remove: ['move-left', 'move-lefter'], add: [] },
        { button: 1, remove: ['move-lefter'], add: ['move-left'] },
        { button: 2, remove: ['move-left'], add: ['move-lefter'] },
    ];

    return function (evt) {
        if (evt.target.classList.contains('arrowLeft')) count = (count - 1 + 3) % 3;
        if (evt.target.classList.contains('arrowRight')) count = (count + 1) % 3;
        if (evt.target.classList.contains('testRadio0')) count = 0;
        if (evt.target.classList.contains('testRadio1')) count = 1;
        if (evt.target.classList.contains('testRadio2')) count = 2;

        const { add, remove, button } = action[count];
        radioBtns.forEach((el, i) => el.classList.toggle('checked', i === button));
        testimonials.forEach(testimonial => {
            updateClasses([testimonial], remove, 'remove');
            updateClasses([testimonial], add, 'add');
        });
    };
};

document.querySelector('#testimonials').addEventListener('click', slideAction(this.evt));

const toggleAction = function () {
    const buttons = document.querySelectorAll('.operationsBtn');
    const operationsContent = document.querySelectorAll('.operations-content');
    return function (evt) {
        if (evt.target.classList.contains('operationsBtn')) {
            buttons.forEach(button => button.classList.remove('toggledBtn'));
            evt.target.classList.add('toggledBtn');
            operationsContent.forEach(optn => optn.classList.add('hidden'));
            operationsContent[evt.target.className.slice(17, 18)].classList.remove('hidden');
        }
    };
};

document.querySelector('.operations-slider').addEventListener('click', toggleAction(this.evt));

const toggleModal = function (element) {
    document.querySelector('.popup').classList.toggle('hidden');
    document.querySelector('.popupOverlay').classList.toggle('hidden');
    document.querySelectorAll('.blurSection').forEach(page => page.classList.toggle('blur'));
};

const signup = function (evt) {
    const element = evt.target;
    const popupOverlay = document.querySelector('.popupOverlay');
    if (element.classList.contains('signupBtn')) toggleModal();
    popupOverlay.addEventListener('click', toggleModal, { once: true });
    if (element.classList.contains('signupBtn')) {
        evt.preventDefault();
        document.querySelector('.btn-close').addEventListener('click', toggleModal, { once: true });
    }
};

document.querySelector('#joinPage').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('signupBtn')) {
        signup(evt);
    }
});

document.querySelector('.navbar-nav').addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.target.classList.contains('nav-link')) {
        const id = evt.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        return;
    }
    signup(evt);

    // const el = document.querySelector(id).getBoundingClientRect();
    // window.scrollTo({ left: el.left + window.pageXOffset, top: el.top + window.pageYOffset, behavior: 'smooth' });
});

const opaqueLinks = function (evt) {
    const links = this.querySelectorAll('.nav-link');
    const logo = this.querySelector('.navbar-brand');
    const selectedLink = evt.target;
    if (!selectedLink.classList.contains('nav-link')) {
        links.forEach(link => link.classList.remove('opaque'));
        return;
    }
    logo.classList.toggle('opaque');
    links.forEach(link => link.classList.toggle('opaque', selectedLink.getAttribute('href') !== link.getAttribute('href')));
};

document.querySelector('.navbar').addEventListener('mouseover', opaqueLinks);

document.querySelector('.navbar').addEventListener('mouseout', opaqueLinks);

const observerFunc = function (entries) {
    const [entry] = entries;
    const nav = document.querySelector('.navbar');
    nav.classList.toggle('sticky', !entry.isIntersecting);
};

const observerOptns = {
    root: null,
    threshold: 0,
    rootMargin: '-90px',
};

const observer = new IntersectionObserver(observerFunc, observerOptns);
observer.observe(document.querySelector('.splash'));

const sectionObserverOptns = {
    root: null,
    threshold: 0,
};
const sectionObserverFn = (entries, sectionObserver) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
        entry.target.classList.remove('to-slideUp');
        sectionObserver.unobserve(entry.target);
    }
};
const sectionObserver = new IntersectionObserver(sectionObserverFn, sectionObserverOptns);

document.querySelectorAll('.section').forEach(el => {
    el.classList.add('to-slideUp');
    sectionObserver.observe(el);
});

const imgObserverFn = (entries, imgObserver) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
        const imgNode = entry.target;
        entry.target.src = imgNode.dataset.src;

        imgNode.addEventListener('load', function () {
            this.classList.remove('blur');
        });
    }
};

const imgObserverOptns = {
    root: null,
    threshold: 0.1,
};

const imgObserver = new IntersectionObserver(imgObserverFn, imgObserverOptns);

document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('blur');
    imgObserver.observe(img);
});
