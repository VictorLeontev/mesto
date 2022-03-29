/*Variables for Editing popup */
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonCloseProfile = document.querySelector("#buttonCloseProfile");
const popupProfile = document.querySelector("#profileedit");

const formElementProfile = document.querySelector("#profilePopup");

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about-us');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about-us");

/*Variables for Picture inserter*/
const buttonAdd = document.querySelector(".profile__button-add");
const buttonClosePictures = document.querySelector("#buttonClosePicture");
const popupPicture = document.querySelector("#pictureadding");
const buttonAddInPopup = document.querySelector('#profileAddButton');

/*Variables for Cards*/
const template = document.querySelector('.element__item').content;
const elements = document.querySelector('.elements');

const pictureFullPopup = document.getElementById("picturefullscreen");
const pictureInfo = document.querySelector(".popup__image");
const pictureSignature = document.querySelector(".popup__signature");

const pictureFullCloseButton = document.getElementById("pictureFullClose");

const pictureName = document.getElementById("picturename");
const url = document.getElementById("url");

const formElementPicture = document.querySelector("#picturePopup");

const buttonLikeSwitch = (evt) => {
    evt.target.classList.toggle('element__button-like_active');
};

/*Function of Editing popup*/

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

const closePopupByEsc = (evt) => {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(activePopup);
    };
};

/* функции для картинки */

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

function render() {
    initialCards.forEach(function(card) { appendCard(card); });
};

function renderCard(card) {
    const cardElement = template.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = card.name;
    cardElement.querySelector('.element__top').src = card.link;
    cardElement.querySelector('.element__top').alt = card.name;

    const buttonLike = cardElement.querySelector(".element__button-like");
    buttonLike.addEventListener('click', buttonLikeSwitch);

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
    buttonAddInPopup.classList.add('popup__button-save_inactive');
}

/*adding function*/

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    const picture = {
        name: pictureName.value,
        link: url.value
    };
    prependCard(picture);
    closePopup(popupPicture);
};

function resetForm() {
    const formList = document.querySelectorAll('.popup__form');
    formList.forEach((element) => {
        element.reset();
    });
};

function deleteErrorInput() {
    const errorItem = document.querySelectorAll('.popup-error');
    const inputItem = document.querySelectorAll('.popup__item');

    inputItem.forEach((element) => {
        element.classList.remove('form__input_type_error');
    });

    errorItem.forEach((element) => {
        element.classList.remove('form__input-error');
        element.textContent = '';
    });
};

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEsc);
    resetForm();
    deleteErrorInput();

    popup.classList.remove("popup_opened");
};

function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEsc);

    popup.classList.add("popup_opened");
};

buttonEdit.addEventListener("click", () => openPopup(popupProfile));
buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));
popupProfile.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

buttonAdd.addEventListener("click", () => openPopup(popupPicture));
buttonClosePictures.addEventListener("click", () => closePopup(popupPicture));
popupPicture.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupPicture);
    }
});

pictureFullPopup.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(pictureFullPopup);
    }
});

pictureFullCloseButton.addEventListener("click", () => closePopup(pictureFullPopup));

formElementPicture.addEventListener('submit', formSubmitHandlerPicture);