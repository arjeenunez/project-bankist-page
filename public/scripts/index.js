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
    document.querySelectorAll('.pageSection').forEach(page => page.classList.toggle('blur'));
};

document.addEventListener('click', function (evt) {
    const element = evt.target;
    if (element.classList.contains('signupBtn') || element.classList.contains('popupOverlay')) toggleModal();
    if (element.classList.contains('signupBtn')) {
        evt.preventDefault();
        document.querySelector('.btn-close').addEventListener('click', toggleModal, { once: true });
    }
});
