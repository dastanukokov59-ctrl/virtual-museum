/* ==========================================================
   НАСТРОЙКИ ЭКСПОНАТОВ
   Здесь вы можете легко менять название, дату, описание и фото.
   ========================================================== */
const exhibits = [
    {
        id: 1,
        title: "Экспонат №1: Восток",
        date: "X-XII ғасырлар",
        description: "Суретте шығыс архитектурасы үлгісінде нақышталған, күмбезі мен мұнаралары бар, ортасында сағаты орнатылған бірегей сәндік туынды.",
        image: "exhibit1.jpg",
        pitch: 0,
        yaw: -120 // Координаты точки на панораме (настраиваются)
    },
    {
        id: 2,
        title: "Экспонат №2: Қайыр хан",
        date: "XII соңы-XIII басы",
        description: "Отырар қаласының билеушісі, қолбасшы Қайыр ханның бейнесі сомдалған ағаштан ойылған бірегей мүсін туындысы.",
        image: "exhibit2.jpg",
        pitch: 5,
        yaw: -90
    },
    {
        id: 3,
        title: "Экспонат №3: Шоқан Уәлиханов",
        date: "XIX ғасыр",
        description: "Қазақтың ұлы ғалымы, ағартушысы, шығыстанушы және саяхатшы Шоқан Уәлихановтың өмірі мен ғылыми мұрасына арналған экспонат.",
        image: "exhibit3.jpg",
        pitch: -10,
        yaw: -60
    },
    {
        id: 4,
        title: "Экспонат №4: Абылай хан",
        date: "XVIII ғасыр",
        description: "Қазақ хандығының күшеюі мен бірігуіне зор үлес қосқан ұлы хан әрі қолбасшы Абылайдың ағаштан қашалған көркем бейнесі.",
        image: "exhibit4.jpg",
        pitch: 0,
        yaw: -30
    },
    {
        id: 5,
        title: "Экспонат №5: Малайсары батыр",
        date: "XVIII ғасыр",
        description: "Абылай ханның жақын серігі, айбынды қолбасшы Малайсары батырдың қасына көкбөрі бейнесі қоса өрілген ағаштан жасалған өнер үлгісі.",
        image: "exhibit5.jpg",
        pitch: 10,
        yaw: 0
    },
    {
        id: 6,
        title: "Экспонат №6: Название",
        date: "Эпоха Возрождения",
        description: "Подробное описание шестого экспоната.",
        image: "exhibit6.jpg",
        pitch: -5,
        yaw: 30
    },
    {
        id: 7,
        title: "Экспонат №7: Название",
        date: "1950-е годы",
        description: "Подробное описание седьмого экспоната.",
        image: "exhibit7.jpg",
        pitch: 5,
        yaw: 60
    },
    {
        id: 8,
        title: "Экспонат №8: Название",
        date: "XVIII век",
        description: "Подробное описание восьмого экспоната.",
        image: "exhibit8.jpg",
        pitch: 0,
        yaw: 90
    },
    {
        id: 9,
        title: "Экспонат №9: Название",
        date: "Начало XXI века",
        description: "Подробное описание девятого экспоната.",
        image: "exhibit9.jpg",
        pitch: -15,
        yaw: 120
    },
    {
        id: 10,
        title: "Экспонат №10: Название",
        date: "1880-е годы",
        description: "Подробное описание десятого экспоната.",
        image: "exhibit10.jpg",
        pitch: 10,
        yaw: 150
    },
    {
        id: 11,
        title: "Экспонат №11: Название",
        date: "Античность",
        description: "Подробное описание одиннадцатого экспоната.",
        image: "exhibit11.jpg",
        pitch: 0,
        yaw: 180
    },
    {
        id: 12,
        title: "Экспонат №12: Название",
        date: "1970-е годы",
        description: "Подробное описание двенадцатого экспоната.",
        image: "exhibit12.jpg",
        pitch: 5,
        yaw: -150
    },
    {
        id: 13,
        title: "Экспонат №13: Название",
        date: "XVII век",
        description: "Подробное описание тринадцатого экспоната.",
        image: "exhibit13.jpg",
        pitch: -10,
        yaw: -170
    },
    {
        id: 14,
        title: "Экспонат №14: Название",
        date: "1990-е годы",
        description: "Подробное описание четырнадцатого экспоната.",
        image: "exhibit14.jpg",
        pitch: 15,
        yaw: -100
    },
    {
        id: 15,
        title: "Экспонат №15: Название",
        date: "Современность",
        description: "Подробное описание пятнадцатого экспоната.",
        image: "exhibit15.jpg",
        pitch: -5,
        yaw: 100
    }
];

/* ==========================================================
   ИНИЦИАЛИЗАЦИЯ КАТАЛОГА КАРТОЧЕК
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const catalogGrid = document.getElementById("catalogGrid");
    
    if (catalogGrid) {
        exhibits.forEach(exhibit => {
            const card = document.createElement("div");
            card.className = "catalog-card";
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${exhibit.image}" alt="${exhibit.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Экспонат+${exhibit.id}'">
                    <span class="card-badge">№${exhibit.id}</span>
                </div>
                <div class="card-content">
                    <h3>${exhibit.title}</h3>
                    <p>${exhibit.description}</p>
                </div>
            `;
            card.addEventListener("click", () => openModal(exhibit));
            catalogGrid.appendChild(card);
        });
    }

    /* ==========================================================
       ИНИЦИАЛИЗАЦИЯ ПАНОРАМЫ PANNELLUM
       ========================================================== */
    const panoramaContainer = document.getElementById("panorama");
    if (panoramaContainer && typeof pannellum !== 'undefined') {
        const hotspots = [];

        pannellum.viewer('panorama', {
            "type": "equirectangular",
            "panorama": "panorama.jpg",
            "autoLoad": true,
            "compass": false,
            "hfov": 110,
            "hotSpots": hotspots
        });
    }
});

/* ==========================================================
   УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
   ========================================================== */
const modal = document.getElementById("exhibitModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalBadge = document.getElementById("modalBadge");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDesc = document.getElementById("modalDesc");

function openModal(exhibit) {
    if (!modal) return;
    
    if (modalImg) {
        modalImg.src = exhibit.image;
        modalImg.onerror = function() {
            this.src = `https://via.placeholder.com/600x400?text=Экспонат+${exhibit.id}`;
        };
    }
    if (modalBadge) modalBadge.innerText = `Экспонат №${exhibit.id}`;
    if (modalTitle) modalTitle.innerText = exhibit.title;
    if (modalDate) modalDate.innerText = exhibit.date;
    if (modalDesc) modalDesc.innerText = exhibit.description;
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы под модалкой
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

// Закрытие по клику вне модального окна
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Закрытие по клавише Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
    }
});
