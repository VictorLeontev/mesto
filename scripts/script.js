const buttonEdit = document.querySelector(".profile__button-edit");
const buttonCloseProfile = document.querySelector("#buttonCloseProfile");
const popupProfile = document.querySelector("#profileedit");

const formElementProfile = document.querySelector("#profilePopup");

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about-us');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about-us");

function openPopupProfile() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

buttonEdit.addEventListener("click", /*openPopupProfile*/ () => openPopup(popupProfile));
buttonCloseProfile.addEventListener("click", () => popupProfile.classList.remove("popup_opened"));

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

/* функции для картинки */

const buttonAdd = document.querySelector(".profile__button-add");
const buttonClosePictures = document.querySelector("#buttonClosePicture");
const popupPicture = document.querySelector("#pictureadding");

/*function openPopupPicture() {
    popupPicture.classList.add("popup_opened");
}*/

buttonAdd.addEventListener("click", /*openPopupPicture*/ () => openPopup(popupPicture));
buttonClosePictures.addEventListener("click", () => popupPicture.classList.remove("popup_opened"));

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

function render() {
    initialCards.forEach(function(card) { appendCard(card /*, true*/ ); });
};

function renderCard(card) {
    const cardElement = template.cloneNode(true);
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
            const cardElement = e.target.parentElement;
            pictureSignature.textContent = cardElement.querySelector('.element__top').alt;
            pictureInfo.src = cardElement.querySelector('.element__top').src;
            pictureInfo.alt = cardElement.querySelector('.element__top').alt;
            pictureFullPopup.classList.add("popup_opened");
        }
    );

    return cardElement;
}

function appendCard(card, /*toBack*/ ) {
    /*const cardElement = template.cloneNode(true);
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
            const cardElement = e.target.parentElement;
            pictureSignature.textContent = cardElement.querySelector('.element__top').alt;
            pictureInfo.src = cardElement.querySelector('.element__top').src;
            pictureInfo.alt = cardElement.querySelector('.element__top').alt;
            pictureFullPopup.classList.add("popup_opened");
        }
    );

    /*if (toBack) {
        elements.append(cardElement);
    } else {
        elements.prepend(cardElement);
    }*/
    elements.append(renderCard(card));
};

render();

function prependCard(card) {
    /*const cardElement = template.cloneNode(true);
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
            const cardElement = e.target.parentElement;
            pictureSignature.textContent = cardElement.querySelector('.element__top').alt;
            pictureInfo.src = cardElement.querySelector('.element__top').src;
            pictureInfo.alt = cardElement.querySelector('.element__top').alt;
            pictureFullPopup.classList.add("popup_opened");
        }
    );*/
    elements.prepend(renderCard(card));
}


const pictureFullCloseButton = document.getElementById("pictureFullClose");
pictureFullCloseButton.addEventListener("click", () => pictureFullPopup.classList.remove("popup_opened"));

/*adding function*/

const pictureName = document.getElementById("picturename");
const url = document.getElementById("url");

const formElementPicture = document.querySelector("#picturePopup");

function formSubmitHandlerPicture(evt) {
    evt.preventDefault();
    const picture = new Object();
    picture.name = pictureName.value;
    picture.link = url.value;
    /*appendCard(picture, false);*/
    prependCard(picture);
    /*document.addEventListener('animationend', function(e) {
        if (e.animationName === 'fade-out') {
            e.target.classList.remove('did-fade-in');
        }
    });*/
}

formElementPicture.addEventListener('submit', formSubmitHandlerPicture);

const profileSaveButton = document.getElementById("profileSaveButton");
const profileAddButton = document.getElementById("profileAddButton");
profileSaveButton.addEventListener("click", () => popupProfile.classList.remove("popup_opened")); /* Когда вставляю функцию closePopup в функцию formSubmitHandler, evt.preventDefault мешает закрытию, передавая на e.target значение undefined. В данном же случае и preventDefault отрабатывает и closePopup так же корректно ведет себя */
profileAddButton.addEventListener("click", () => popupPicture.classList.remove("popup_opened"));

/*function closePopup(popups) {
    //let popups;

    if (evt.target === buttonCloseProfile || evt.target === profileSaveButton) {
        popups = popupProfile;
    } else if (evt.target === buttonClosePictures || evt.target === profileAddButton) {
        popups = popupPicture;
    } else {
        popups = pictureFullPopup;
    }

    popups.classList.remove("popup_opened");
}*/

function openPopup(popups) {

    //let popups;

    if (popups === popupProfile) {
        openPopupProfile();
    };

    //popups.classList.remove("popup_closed");
    popups.classList.add("popup_opened");
}
/*Беспорядок в обЪвлении переменных я устраню. Если я сейчас это сделаю, то просто запутаюсь где-что.*/