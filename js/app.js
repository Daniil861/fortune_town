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
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    sessionStorage.setItem("chips-4", true);
    sessionStorage.setItem("current-chip", 4);
    create_chip();
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
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.textContent = +sessionStorage.getItem("money") + count));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function get_random_animate() {
        let number = get_random(0, 4);
        let arr = [ "jump", "scale", "rotate", "rotate-2" ];
        let block_icon = document.querySelector(".bank__body img");
        if (block_icon.classList.contains("_anim-icon-jump")) block_icon.classList.remove("_anim-icon-jump"); else if (block_icon.classList.contains("_anim-icon-scale")) block_icon.classList.remove("_anim-icon-scale"); else if (block_icon.classList.contains("_anim-icon-rotate")) block_icon.classList.remove("_anim-icon-rotate"); else if (block_icon.classList.contains("_anim-icon-rotate-2")) block_icon.classList.remove("_anim-icon-rotate-2");
        setTimeout((() => {
            block_icon.classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".bank__body img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
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
        if (document.documentElement.classList.contains("webp")) image.setAttribute("src", `img/icons/check-mark.webp`); else image.setAttribute("src", `img/icons/check-mark.png`);
        item.append(image);
        block.append(item);
    }
    function choice_chip(num, elem) {
        let price = 0;
        if (1 == num) price = config_shop.price_chip_1; else if (2 == num) price = config_shop.price_chip_2; else if (3 == num) price = config_shop.price_chip_3;
        if (sessionStorage.getItem(`chips-${num}`)) {
            get_current_chip(num);
            create_pin(elem);
            create_chip();
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
        if (document.documentElement.classList.contains("webp")) image.setAttribute("src", `img/icons/chip-${num}.webp`); else image.setAttribute("src", `img/icons/chip-${num}.png`);
        image.setAttribute("alt", `Icon`);
        document.querySelector(".block-bet__icon").append(image);
    }
    let config_game = {
        numbers_bet: [],
        numbers_cubs: [],
        same_numbers_cubs: false,
        current_win: 0,
        cub_1_top: 0,
        cub_1_left: 0,
        cub_2_top: 0,
        cub_2_left: 0,
        cub_3_top: 0,
        cub_3_left: 0
    };
    function create_chip_field_bet(block) {
        let item = document.createElement("div");
        item.classList.add("field__chip");
        let image = document.createElement("img");
        let current_chip = sessionStorage.getItem("current-chip");
        image.setAttribute("src", `img/icons/chip-${current_chip}.png`);
        if (document.documentElement.classList.contains("webp")) image.setAttribute("src", `img/icons/chip-${current_chip}.webp`); else image.setAttribute("src", `img/icons/chip-${current_chip}.png`);
        image.setAttribute("alt", "Icon");
        item.append(image);
        block.append(item);
        block.classList.add("_not-active");
    }
    function get_number_item_field(block) {
        return block.dataset.lot;
    }
    function add_delete_class(block) {
        block.classList.add("_closed");
        setTimeout((() => {
            block.classList.remove("_closed");
        }), 500);
    }
    function generate_coord_cubs() {
        config_game.cub_1_top = `${get_random(0, 20)}%`;
        config_game.cub_1_left = `${get_random(0, 55)}%`;
        config_game.cub_2_top = `${get_random(50, 75)}%`;
        config_game.cub_2_left = `${get_random(-10, 5)}%`;
        config_game.cub_3_top = `${get_random(50, 75)}%`;
        config_game.cub_3_left = `${get_random(50, 60)}%`;
    }
    function move_cubs_to_coordinate() {
        document.querySelector(".cubs__cub_1").style.top = config_game.cub_1_top;
        document.querySelector(".cubs__cub_1").style.left = config_game.cub_1_left;
        document.querySelector(".cubs__cub_2").style.top = config_game.cub_2_top;
        document.querySelector(".cubs__cub_2").style.left = config_game.cub_2_left;
        document.querySelector(".cubs__cub_3").style.top = config_game.cub_3_top;
        document.querySelector(".cubs__cub_3").style.left = config_game.cub_3_left;
        document.querySelectorAll(".cubs__cub").forEach((el => {
            el.style.transform = "rotate(0deg)";
        }));
    }
    function move_cubs_to_start_coordinate() {
        document.querySelector(".cubs__cub_1").style.top = "0%";
        document.querySelector(".cubs__cub_1").style.left = "-10%";
        document.querySelector(".cubs__cub_2").style.top = "0%";
        document.querySelector(".cubs__cub_2").style.left = "-10%";
        document.querySelector(".cubs__cub_3").style.top = "0%";
        document.querySelector(".cubs__cub_3").style.left = "-10%";
        document.querySelectorAll(".cubs__cub").forEach((el => {
            el.style.transform = "rotate(-360deg)";
        }));
    }
    function write_value_cubs() {
        document.querySelectorAll(".cubs__cub img").forEach((el => el.remove()));
        let image_1 = document.createElement("img");
        let image_2 = document.createElement("img");
        let image_3 = document.createElement("img");
        config_game.numbers_cubs.push(get_random(1, 7));
        config_game.numbers_cubs.push(get_random(1, 7));
        config_game.numbers_cubs.push(get_random(1, 7));
        image_1.setAttribute("src", `img/game/cub-${config_game.numbers_cubs[0]}.png`);
        image_2.setAttribute("src", `img/game/cub-${config_game.numbers_cubs[1]}.png`);
        image_3.setAttribute("src", `img/game/cub-${config_game.numbers_cubs[2]}.png`);
        document.querySelector(".cubs__cub_1").append(image_1);
        document.querySelector(".cubs__cub_2").append(image_2);
        document.querySelector(".cubs__cub_3").append(image_3);
    }
    function check_win() {
        check_same_numbers_cube();
        if (config_game.same_numbers_cubs) {
            if (config_game.numbers_cubs[0] == config_game.numbers_bet[0]) config_game.current_win = 10 * +sessionStorage.getItem("current-bet"); else if (config_game.numbers_cubs[0] == config_game.numbers_bet[1]) config_game.current_win = 10 * +sessionStorage.getItem("current-bet"); else if (config_game.numbers_cubs[0] == config_game.numbers_bet[2]) config_game.current_win = 10 * +sessionStorage.getItem("current-bet");
        } else config_game.numbers_cubs.forEach((el => {
            if (config_game.numbers_bet[0]) if (el == config_game.numbers_bet[0]) config_game.current_win += 2 * +sessionStorage.getItem("current-bet");
            if (config_game.numbers_bet[1]) if (el == config_game.numbers_bet[1]) config_game.current_win += 2 * +sessionStorage.getItem("current-bet");
            if (config_game.numbers_bet[2]) if (el == config_game.numbers_bet[2]) config_game.current_win += 2 * +sessionStorage.getItem("current-bet");
        }));
        if (config_game.current_win > 0) {
            document.querySelector(".win__text").textContent = config_game.current_win;
            add_remove_className(".win", "_active");
            add_money(config_game.current_win, ".check", 1e3, 1500);
        } else add_remove_className(".loose", "_active");
    }
    function check_same_numbers_cube() {
        if (config_game.numbers_cubs[0] == config_game.numbers_cubs[1] && config_game.numbers_cubs[1] == config_game.numbers_cubs[2]) config_game.same_numbers_cubs = true;
    }
    function reset_game() {
        move_cubs_to_start_coordinate();
        document.querySelector(".block-bet").classList.remove("_hold");
        config_game.numbers_bet = [];
        config_game.numbers_cubs = [];
        config_game.current_win = 0;
        config_game.same_numbers_cubs = false;
        if (document.querySelector(".field__chip")) document.querySelectorAll(".field__chip").forEach((el => el.remove()));
        document.querySelectorAll(".field__item").forEach((el => {
            if (el.classList.contains("_not-active")) el.classList.remove("_not-active");
        }));
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
            let current_chip = +sessionStorage.getItem("current-chip");
            document.querySelectorAll(".shop__item").forEach((el => {
                if (el.dataset.chip == current_chip) create_pin(el);
            }));
        }
        if (targetElement.closest(".main__link_play")) {
            add_remove_className(".main", "_hide");
            if (+sessionStorage.getItem("money") > 0) sessionStorage.setItem("current-bet", 100); else sessionStorage.setItem("current-bet", 0);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".button_home")) {
            add_remove_className(".main", "_hide");
            if (!document.querySelector(".shop").classList.contains("_hide")) add_remove_className(".shop", "_hide"); else reset_game();
        }
        if (targetElement.closest(".shop__button_4")) if (sessionStorage.getItem("chips-4")) {
            get_current_chip(4);
            create_pin(targetElement.closest(".shop__item"));
            create_chip();
        }
        if (targetElement.closest(".shop__button_3")) choice_chip(3, targetElement.closest(".shop__item"));
        if (targetElement.closest(".shop__button_2")) choice_chip(2, targetElement.closest(".shop__item"));
        if (targetElement.closest(".shop__button_1")) choice_chip(1, targetElement.closest(".shop__item"));
        if (targetElement.closest(".block-bet__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet >= 100) {
                sessionStorage.setItem("current-bet", current_bet - 100);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".block-bet__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank - 99 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 100);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
        }
        if (targetElement.closest(".field__item") && +sessionStorage.getItem("money") >= +sessionStorage.getItem("current-bet")) if (config_game.numbers_bet.length < 3) {
            create_chip_field_bet(targetElement.closest(".field__item"));
            config_game.numbers_bet.push(get_number_item_field(targetElement.closest(".field__item")));
            delete_money(+sessionStorage.getItem("current-bet"), ".check");
            document.querySelector(".block-bet").classList.add("_hold");
        } else add_delete_class(targetElement.closest(".field__item")); else if (targetElement.closest(".field__item") && +sessionStorage.getItem("money") < +sessionStorage.getItem("current-bet")) no_money(".check");
        if (targetElement.closest(".bet__button") && config_game.numbers_bet.length > 0) {
            add_remove_className(".bet__button", "_hold");
            generate_coord_cubs();
            move_cubs_to_coordinate();
            setTimeout((() => {
                write_value_cubs();
            }), 300);
            setTimeout((() => {
                check_win();
            }), 1700);
        } else if (targetElement.closest(".bet__button") && 0 == config_game.numbers_bet.length) {
            document.querySelector(".field__body").classList.add("_anim-block");
            setTimeout((() => {
                document.querySelector(".field__body").classList.remove("_anim-block");
            }), 1e3);
        }
        if (targetElement.closest(".loose__button_play") || targetElement.closest(".win__button_play")) {
            if (targetElement.closest(".loose__button_play")) add_remove_className(".loose", "_active"); else add_remove_className(".win", "_active");
            add_remove_className(".bet__button", "_hold");
            reset_game();
            if (+sessionStorage.getItem("money") < +sessionStorage.getItem("current-bet")) {
                +sessionStorage.setItem("current-bet", 0);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
    }));
    window["FLS"] = true;
    isWebp();
})();