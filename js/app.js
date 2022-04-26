(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            console.log(el);
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    sessionStorage.setItem("chips-4", true);
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function add_remove_className(block, className) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className); else document.querySelector(block).classList.add(className);
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let block_icon = document.querySelector(".bank__body img");
        if (block_icon.classList.contains("_anim-icon-jump")) block_icon.classList.remove("_anim-icon-jump"); else if (block_icon.classList.contains("_anim-icon-scale")) block_icon.classList.remove("_anim-icon-scale"); else if (block_icon.classList.contains("_anim-icon-rotate")) block_icon.classList.remove("_anim-icon-rotate");
        block_icon.classList.add(`_anim-icon-${arr[number]}`);
    }
    if (document.querySelector(".bank__body img")) setInterval((() => {
        get_random_animate();
    }), 2e4);
    let config_shop = {
        price_chip_1: 4e3,
        price_chip_2: 6e3,
        price_chip_3: 1e4
    };
    function check_bought_chips() {
        document.querySelectorAll(".shop__item").forEach((el => {
            if (sessionStorage.getItem("chips-1")) if (1 == el.dataset.chip) {
                el.classList.add("_buy");
                document.querySelector(".shop__button_1").innerHTML = "<p>select</p>";
            }
            if (sessionStorage.getItem("chips-2")) if (2 == el.dataset.chip) {
                el.classList.add("_buy");
                document.querySelector(".shop__button_2").innerHTML = "<p>select</p>";
            }
            if (sessionStorage.getItem("chips-3")) if (3 == el.dataset.chip) {
                el.classList.add("_buy");
                document.querySelector(".shop__button_3").innerHTML = "<p>select</p>";
            }
            if (sessionStorage.getItem("chips-4")) if (4 == el.dataset.chip) {
                el.classList.add("_buy");
                document.querySelector(".shop__button_4").innerHTML = "<p>select</p>";
            }
        }));
    }
    function get_current_chip(num) {
        sessionStorage.setItem("current-chip", num);
    }
    function create_pin(block) {
        if (document.querySelector(".shop__check-mark")) document.querySelector(".shop__check-mark").remove();
        let item = document.createElement("div");
        item.classList.add("shop__check-mark");
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/check-mark.png");
        item.append(image);
        block.append(item);
    }
    function choice_chip(num, elem) {
        let price = 0;
        if (1 == num) price = config_shop.price_chip_1; else if (2 == num) price = config_shop.price_chip_2; else if (3 == num) price = config_shop.price_chip_3;
        if (sessionStorage.getItem(`chips-${num}`)) {
            get_current_chip(num);
            create_pin(elem);
        } else if (+sessionStorage.getItem("money") >= price) {
            sessionStorage.setItem(`chips-${num}`, true);
            delete_money(price, ".check");
            check_bought_chips();
        } else no_money(".check");
    }
    function create_chip() {
        if (document.querySelector(".block-bet__icon img")) document.querySelector(".block-bet__icon img").remove();
        let num = sessionStorage.getItem("current-chip");
        let image = document.createElement("img");
        image.setAttribute("src", `img/icons/chip-${num}.png`);
        image.setAttribute("alt", `Icon`);
        document.querySelector(".block-bet__icon").append(image);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".main__link_store")) {
            add_remove_className(".main", "_hide");
            add_remove_className(".shop", "_hide");
            check_bought_chips();
        }
        if (targetElement.closest(".main__link_play")) {
            create_chip();
            add_remove_className(".main", "_hide");
            add_remove_className(".game", "_hide");
            sessionStorage.setItem("current-bet", 100);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".button_home")) {
            add_remove_className(".main", "_hide");
            if (!document.querySelector(".shop").classList.contains("_hide")) add_remove_className(".shop", "_hide"); else if (!document.querySelector(".game").classList.contains("_hide")) add_remove_className(".game", "_hide");
        }
        if (targetElement.closest(".shop__button_4")) if (sessionStorage.getItem("chips-4")) {
            get_current_chip(4);
            create_pin(targetElement.closest(".shop__item"));
        }
        if (targetElement.closest(".shop__button_3")) choice_chip(3, targetElement.closest(".shop__item"));
        if (targetElement.closest(".shop__button_2")) choice_chip(2, targetElement.closest(".shop__item"));
        if (targetElement.closest(".shop__button_1")) choice_chip(1, targetElement.closest(".shop__item"));
        if (targetElement.closest(".block-bet__minus")) {
            console.log("Нажали на кнопку минус");
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet >= 100) {
                sessionStorage.setItem("current-bet", current_bet - 100);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".block-bet__plus")) {
            console.log("Нажали на кнопку плюс");
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank - 99 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 100);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
        }
    }));
    window["FLS"] = true;
    isWebp();
})();