'use strict';

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from './initialCards.js';

const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error'
};

const allPopups = document.querySelector('.popup');
const popupProfile = document.querySelector("#profileedit");
const popupPicture = document.querySelector("#pictureadding");
export const pictureFullPopup = document.getElementById("picturefullscreen");
const buttonCloseProfile = document.querySelector(".popup__button-close");
const buttonClosePictures = document.querySelector(".popup__button-close");
const pictureFullCloseButton = document.getElementById(".popup__button-close");
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about-us');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about-us");
//
const cardContainer = document.querySelector('.elements__item')
const elements = document.querySelector('.elements');
const profileForm = document.querySelector('#popupFormProfile');
const pictureForm = document.querySelector('#popupFormPicture');
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
//const profileName = document.querySelector('.profile__name');
//const profileJob = document.querySelector('.profile__about-us');
export const pictureInfo = document.querySelector(".popup__image");
export const pictureSignature = document.querySelector(".popup__signature");

const formValidProfile = new FormValidator(enableValidation, profileForm);
const formValidCard = new FormValidator(enableValidation, pictureForm);

const appendCard = (initialCards) => {
    initialCards.forEach((item) => {
        renderCard(item, elements);
    });
};

const renderCard = (data, elements) => {
    const card = new Card(data, '.element__item');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
};

appendCard(initialCards);

export function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEsc);

    popup.classList.add("popup_opened");
};

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEsc);
    resetForm();
    deleteErrorInput();

    popup.classList.remove("popup_opened");
};

const closePopupByOverlayClick = (popup) => {
    popup.addEventListener('mousedown', (e) => {
        if (e.target === popup && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
};

const closePopupByEsc = (evt) => {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(activePopup);
    };
};

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    renderCard({
            name: pictureName.value,
            link: url.value
        },
        cardContainer
    );
    closePopup(popupPicture);
    pictureForm.reset();
};

formValidProfile.enableValidation();
formValidCard.enableValidation();

closePopupByOverlayClick(allPopups);

buttonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    nameInput.dispatchEvent(new Event('input'));

    jobInput.value = profileJob.textContent;
    jobInput.dispatchEvent(new Event('input'));

    openPopup(popupProfile);
});

buttonAdd.addEventListener('click', () => {
    formValidCard.disableSubmitButton();
    openPopup(popupPicture);
});

buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});

buttonClosePictures.addEventListener('click', () => {
    closePopup(popupPicture);
});

pictureFullCloseButton.addEventListener('click', () => {
    closePopup(pictureFullPopup);
});

profileForm.addEventListener('submit', formSubmitHandlerProfile);
pictureForm.addEventListener('submit', formSubmitHandlerPicture);