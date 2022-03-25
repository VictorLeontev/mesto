const buttonEdit = document.querySelector(".profile__button-edit");
const buttonCloseProfile = document.querySelector("#buttonCloseProfile");
const popupProfile = document.querySelector("#profileedit");

const formElementProfile = document.querySelector("#profilePopup");

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about-us');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about-us");

function openPopupProfile(popups) {
    popups.classList.add("popup_opened");
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

buttonEdit.addEventListener("click", () => openPopupProfile(popupProfile));
buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));
popupProfile.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup(popupProfile);
        closePopup(popupPicture);
        closePopup(pictureFullPopup);
    }
});

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

/* функции для картинки */

const buttonAdd = document.querySelector(".profile__button-add");
const buttonClosePictures = document.querySelector("#buttonClosePicture");
const popupPicture = document.querySelector("#pictureadding");

buttonAdd.addEventListener("click", () => openPopup(popupPicture));
buttonClosePictures.addEventListener("click", () => closePopup(popupPicture));
popupPicture.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupPicture);
    }
});


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const template = document.querySelector('.element__item').content;
const elements = document.querySelector('.elements');

const pictureFullPopup = document.getElementById("picturefullscreen");
const pictureInfo = document.querySelector(".popup__image");
const pictureSignature = document.querySelector(".popup__signature");

pictureFullPopup.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(pictureFullPopup);
    }
});

function render() {
    initialCards.forEach(function(card) { appendCard(card); });
};

function renderCard(card) {
    const cardElement = template.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = card.name;
    cardElement.querySelector('.element__top').src = card.link;
    cardElement.querySelector('.element__top').alt = card.name;

    const button = cardElement.querySelector(".element__button-delete");
    button.addEventListener("click",
        function(e) {
            const cardElement = e.target.closest(".element");
            cardElement.remove(".element");
        });

    const pictureFull = cardElement.querySelector(".element__top");
    pictureFull.addEventListener("click",
        function(e) {
            const cardElement = e.target.closest(".element");
            pictureSignature.textContent = cardElement.querySelector('.element__top').alt;
            pictureInfo.src = cardElement.querySelector('.element__top').src;
            pictureInfo.alt = cardElement.querySelector('.element__top').alt;
            openPopup(pictureFullPopup);
        }
    );

    return cardElement;
}

function appendCard(card) {
    elements.append(renderCard(card));
};

render();

function prependCard(card) {
    elements.prepend(renderCard(card));
}


const pictureFullCloseButton = document.getElementById("pictureFullClose");
pictureFullCloseButton.addEventListener("click", () => closePopup(pictureFullPopup));

/*adding function*/

const pictureName = document.getElementById("picturename");
const url = document.getElementById("url");

const formElementPicture = document.querySelector("#picturePopup");

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    const picture = new Object();
    picture.name = pictureName.value;
    picture.link = url.value;
    prependCard(picture);
    closePopup(popupPicture);
};

formElementPicture.addEventListener('submit', formSubmitHandlerPicture);

function closePopup(popups) {
    popups.classList.remove("popup_opened");
};

function openPopup(popups) {
    popups.classList.add("popup_opened");
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: '.button__inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error'
});

/*function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('popup__item'));
    const buttonElement = Array.from(formElement.querySelectorAll('popup__button-save'));

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation() {
    let formList = Array.from(document.querySelectorAll('popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('form__set'));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

enableValidation();*/

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button__inactive');
    } else {
        buttonElement.classList.remove('button__inactive');
    }
};