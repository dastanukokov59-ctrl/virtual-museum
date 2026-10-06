/* ==========================================================
   НАСТРОЙКИ ЭКСПОНАТОВ
   Здесь вы можете легко менять название, дату, описание и фото.
   ========================================================== */
const exhibits = [
    {
        id: 1,
        title: "Экспонат №1: Название",
        date: "XIX век",
        description: "Подробное описание первого экспоната. Расскажите об истории его создания, авторе или значимости для музея.",
        image: "exhibit1.jpg",
        pitch: 0,
        yaw: -120 // Координаты точки на панораме (настраиваются)
    },
    {
        id: 2,
        title: "Экспонат №2: Название",
        date: "1920-е годы",
        description: "Подробное описание второго экспоната. Здесь можно указать интересные факты.",
        image: "exhibit2.jpg",
        pitch: 5,
        yaw: -90
    },
    {
        id: 3,
        title: "Экспонат №3: Название",
        date: "Средневековье",
        description: "Подробное описание третьего экспоната.",
        image: "exhibit3.jpg",
        pitch: -10,
        yaw: -60
    },
    {
        id: 4,
        title: "Экспонат №4: Название",
        date: "XX век",
        description: "Подробное описание четвертого экспоната.",
        image: "exhibit4.jpg",
        pitch: 0,
        yaw: -30
    },
    {
        id: 5,
        title: "Экспонат №5: Название",
        date: "Древний мир",
        description: "Подробное описание пятого экспоната.",
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

    /* ==========================================================
       ИНИЦИАЛИЗАЦИЯ ПАНОРАМЫ PANNELLUM
       ========================================================== */
    const hotspots = exhibits.map(exhibit => {
        return {
            pitch: exhibit.pitch,
            yaw: exhibit.yaw,
            type: "info",
            text: `Экспонат №${exhibit.id}`,
            clickHandlerFunc: () => openModal(exhibit),
            // Создаем кастомный элемент точки
            createTooltipFunc: hotSpotDiv => {
                hotSpotDiv.classList.add("pannelum-hotspot-custom");
                hotSpotDiv.innerText = exhibit.id;
            }
        };
    });

    pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "panorama.jpg",
        "autoLoad": true,
        "compass": false,
        "hfov": 110,
        "hotSpots": hotspots
    });
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
    modalImg.src = exhibit.image;
    modalImg.onerror = function() {
        this.src = `https://via.placeholder.com/600x400?text=Экспонат+${exhibit.id}`;
    };
    modalBadge.innerText = `Экспонат №${exhibit.id}`;
    modalTitle.innerText = exhibit.title;
    modalDate.innerText = exhibit.date;
    modalDesc.innerText = exhibit.description;
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы под модалкой
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);

// Закрытие по клику вне модального окна
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по клавише Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});