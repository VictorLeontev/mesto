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

const popupProfile = document.querySelector("#profileedit");
const popupPicture = document.querySelector("#pictureadding");
export const pictureFullPopup = document.getElementById("picturefullscreen");
const buttonCloseProfile = document.querySelector("#buttonCloseProfile");
const buttonClosePictures = document.querySelector("#buttonClosePicture");
const pictureFullCloseButton = document.querySelector("#pictureFullClose");
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about-us');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about-us");
//
const elements = document.querySelector('.elements');
const profileForm = document.querySelector('#popupFormProfile');
const pictureForm = document.querySelector('#popupFormPicture');
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const pictureName = document.getElementById("picturename");
const url = document.getElementById("url");
export const pictureInfo = document.querySelector(".popup__image");
export const pictureSignature = document.querySelector(".popup__signature");

const formValidProfile = new FormValidator(enableValidation, profileForm);
const formValidCard = new FormValidator(enableValidation, pictureForm);

const render = (initialCards) => {
    initialCards.forEach(appendCard);
};

const renderCard = (data) => {
    const card = new Card(data, '.element__item');
    const cardElement = card.generateCard();
    return cardElement;
};

function appendCard(card) {
    elements.append(renderCard(card));
};

render(initialCards);

function prependCard(card) {
    elements.prepend(renderCard(card));
}

export function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEsc);

    popup.classList.add("popup_opened");
};

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEsc);
    popup.classList.remove("popup_opened");
};

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    };
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handlePictureFormSubmit(evt) {
    evt.preventDefault();
    const picture = {
        name: pictureName.value,
        link: url.value
    };
    prependCard(picture);
    closePopup(popupPicture);
    formValidCard.disableSubmitButton();
    pictureForm.reset();
};

formValidProfile.enableValidation();
formValidCard.enableValidation();

buttonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    nameInput.dispatchEvent(new Event('input'));

    jobInput.value = profileJob.textContent;
    jobInput.dispatchEvent(new Event('input'));

    openPopup(popupProfile);
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupPicture);
});

buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});

popupProfile.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

buttonClosePictures.addEventListener('click', () => {
    closePopup(popupPicture);
});

popupPicture.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupPicture);
    }
});

pictureFullCloseButton.addEventListener('click', () => {
    closePopup(pictureFullPopup);
});

pictureFullPopup.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(pictureFullPopup);
    }
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
pictureForm.addEventListener('submit', handlePictureFormSubmit);