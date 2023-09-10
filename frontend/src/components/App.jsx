import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { autorization, registration, getUserData } from "../utils/auth.js";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import EditProfilePopup from "./editProfilePopup/EditprofilePopup.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";
import DeleteCardPopup from "./deleteCardPopup/DeleteCardPopup.jsx";
import ProtectedHome from "./protectedHome/ProtectedHome.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isResultLoginPopupOpen, setIsResultLoginPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isScaleImage, setIsScaleImage] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState("");
  const [isSuccessfully, setIsSuccessfully] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsScaleImage(false);
    setIsResultLoginPopupOpen(false);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    eventListenerForEsc();
  }

  function handleEditProfileClick() {
    eventListenerForEsc();
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    eventListenerForEsc();
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(cardId) {
    eventListenerForEsc();
    setDeleteCard(cardId);
    setIsDeletePlacePopupOpen(true);
  }

  function handleCardClick(card) {
    eventListenerForEsc();
    setSelectedCard(card);
    setIsScaleImage(true);
  }

  useEffect(() => {
    if (isLogged) {
      Promise.all([api.getUserInfoFromSrv(localStorage.jwt), api.getServerCards(localStorage.jwt)])
        .then(([userInfo, cardsInfo]) => {
          setCurrentUser(userInfo);
          setCards(cardsInfo);
        })
        .catch((error) =>
          console.error("Ошибка при формировании страницы " + error)
        );
    }
  }, [isLogged]);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setIsLogged(true);
          navigate("/");
        })
        .catch((error) => console.error(`Ошибка данных авторизации ${error}`));
    } else {
      setIsLogged(false);
    }
  }, [navigate]);

  function handleUpdateUser(input, reset) {
    api
      .setUserInfoToSrv(input, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error("Ошибка сохранения введенных данных" + error)
      )
      .finally(() => reset(false));
  }

  function handleUpdateAvatar(input, reset) {
    api
      .changeAvatar(input, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error("Ошибка обновления аватара " + error))
      .finally(() => reset(false));
  }

  function handleCardDelete() {
    api
      .deleteCardFromSrv(deleteCard, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deleteCard;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error("Ошибка удаления карточки " + error));
  }

  function handleAddPlace(input, reset) {
    api
      .addCardToSrv(input, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error("Ошибка добавления карточки " + error))
      .finally(() => reset(false));
  }

  const closePopupByEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [closeAllPopups]
  );

  const closePopupByOverlay = useCallback(() => {
    closeAllPopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [closeAllPopups, closePopupByEsc]);

  function eventListenerForEsc() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleRegister(password, email) {
    registration(password, email)
      .then(() => {
        setIsResultLoginPopupOpen(true);
        setIsSuccessfully(true);
        navigate("/signin");
      })
      .catch((error) => {
        setIsResultLoginPopupOpen(true);
        setIsSuccessfully(false);
        console.error(`Ошибка регистрации ${error}`);
      })
  }

  function handleLogin(password, email) {
    autorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLogged(true);
        navigate("/");
      })
      .catch((error) => {
        setIsResultLoginPopupOpen(true);
        setIsSuccessfully(false);
        console.error(`Ошибка входа ${error}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={ProtectedHome}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onDeletePlace={handleDeletePlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                userEmail={userEmail}
                inLogged={isLogged}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header name="signUp" />
                <Main name="signUp" onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header name="signIn" />
                <Main name="signIn" onLogin={handleLogin} />
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          onOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closePopupByOverlay}
        />

        <AddPlacePopup
          onOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closePopupByOverlay}
        />

        <EditAvatarPopup
          onOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closePopupByOverlay}
        />

        <DeleteCardPopup
          onOpen={isDeletePlacePopupOpen}
          onClose={closePopupByOverlay}
          onDeleteCard={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onOpen={isScaleImage}
          onClose={closePopupByOverlay}
        />

        <InfoTooltip
          name="result"
          onOpen={isResultLoginPopupOpen}
          isSuccessfully={isSuccessfully}
          onClose={closePopupByOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
