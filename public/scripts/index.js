'use strict';

const slideAction = function () {
    const testimonials = document.querySelectorAll('.testimonials-content');
    const radioBtns = document.querySelectorAll(`.testRadio`);
    let count = 0;
    const action = [
        { button: 0, remove: ['move-left', 'move-lefter'], add: [] },
        { button: 1, remove: ['move-lefter'], add: ['move-left'] },
        { button: 2, remove: ['move-left'], add: ['move-lefter'] },
    ];
    return function (evt) {
        if (evt.target.classList.contains('arrowLeft')) count--;
        if (evt.target.classList.contains('arrowRight')) count++;
        if (evt.target.classList.contains('testRadio0')) count = 0;
        if (evt.target.classList.contains('testRadio1')) count = 1;
        if (evt.target.classList.contains('testRadio2')) count = 2;
        if (count < 0) count = 2;
        if (count > 2) count = 0;
        const { add, remove, button } = action[count % 3];
        radioBtns.forEach((el, i) => {
            el.removeAttribute('checked');
            if (i === button) el.setAttribute('checked', true);
        });
        console.log(evt, count);
        testimonials.forEach(testimonial => {
            remove.forEach(rem => testimonial.classList.remove(rem));
            add.forEach(ad => testimonial.classList.add(ad));
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

window.document.addEventListener('click', function (evt) {
    const element = evt.target;
    if (element.classList.contains('signupBtn')) {
        evt.preventDefault();
        toggleModal();
        document.querySelector('.btn-close').addEventListener('click', toggleModal);
    } else if (element.classList.contains('popupOverlay')) {
        toggleModal();
    }
});

// buttons.forEach(button =>
//     button.addEventListener('click', evt => {
//         evt.preventDefault();
//         document.querySelector('.popup').classList.toggle('hidden');
//         document.querySelector('.popupOverlay').classList.toggle('hidden');
//         document.querySelectorAll('.pageSection').forEach(el => el.classList.toggle('blur'));
//     }),
// );
