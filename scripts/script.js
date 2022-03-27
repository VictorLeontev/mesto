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

/*Function of Editing popup*/

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

buttonEdit.addEventListener("click", () => openPopup(popupProfile));
buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));
popupProfile.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector(".popup_opened");
        closePopup(popupActive);
    }
});

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

/* функции для картинки */

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

pictureFullCloseButton.addEventListener("click", () => closePopup(pictureFullPopup));

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

formElementPicture.addEventListener('submit', formSubmitHandlerPicture);

function resetForm() {
    const formList = document.querySelectorAll('.popup__form');
    formList.forEach((element) => {
        element.reset();
    });
};

function deleteErrorInput() {
    const errorList = document.querySelectorAll('.popup-error');

    errorList.forEach((element) => {
        element.classList.remove('.form__input-error_active');
        element.textContent = '';
    });
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    resetForm();
    deleteErrorInput();
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
};