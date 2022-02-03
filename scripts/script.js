let buttonEdit = document.querySelector(".profile__button-edit");
let buttonCloseProfile = document.querySelector("#buttonCloseProfile");
let popupProfile = document.querySelector("#profileedit");

let formElementProfile = document.querySelector("#profilePopup");

let nameInput = document.getElementById('name');
let jobInput = document.getElementById('about-us');
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__about-us");

function openPopupProfile() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupProfile.classList.add("popup_opened");
}

function closePopupProfile() {
    popupProfile.classList.remove("popup_opened");
}


function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile();
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonCloseProfile.addEventListener("click", closePopupProfile);

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
/* функции для картинки */
let buttonAdd = document.querySelector(".profile__button-add");
let buttonClosePictures = document.querySelector("#buttonClosePicture");
let popupPicture = document.querySelector("#pictureadding");

function openPopupPicture() {
    popupPicture.classList.add("popup_opened");
}

function closePopupPicture() {
    popupPicture.classList.remove("popup_opened");
}

buttonAdd.addEventListener("click", openPopupPicture);
buttonClosePictures.addEventListener("click", closePopupPicture);

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

function render() {
    initialCards.forEach(function(card) { appendCard(card, true); });
};

function appendCard(card, toBack) {
    let cardElement = template.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = card.name;
    cardElement.querySelector('.element__top').src = card.link;
    cardElement.querySelector('.element__top').alt = card.name;

    const button = cardElement.querySelector(".element__button-delete");
    button.addEventListener("click",
        function(e) {

            const cardElement = e.target.parentElement;

            elements.removeChild(cardElement);
        });

    const pictureFull = cardElement.querySelector(".element__top");
    pictureFull.addEventListener("click",
        function(e) {
            let pictureFullPopup = document.getElementById("picturefullscreen");
            let pictureInfo = document.querySelector(".popup-image");
            const cardElement = e.target.parentElement;
            pictureInfo.src = cardElement.querySelector('.element__top').src;
            pictureInfo.alt = cardElement.querySelector('.element__top').alt;
            pictureFullPopup.classList.add("popup_opened");
        }
    );

    if (toBack) {
        elements.append(cardElement);
    } else {
        elements.prepend(cardElement);
    }

};

render();


const pictureFullCloseButton = document.getElementById("pictureFullClose");
pictureFullCloseButton.addEventListener("click",
    function(e) {
        let pictureFullPopup = document.getElementById("picturefullscreen");
        pictureFullPopup.classList.remove("popup_opened");
    });


/*adding function*/

let pictureName = document.getElementById('picturename');
let url = document.getElementById('url');

let formElementPicture = document.querySelector("#picturePopup");

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    let picture = new Object();
    picture.name = pictureName.value;
    picture.link = url.value;
    initialCards.unshift(picture);
    appendCard(picture, false);
    closePopupPicture();
}

formElementPicture.addEventListener('submit', formSubmitHandlerPicture);