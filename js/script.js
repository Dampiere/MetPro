$(".about__text").click(function () {
    $(this).children(".child").slideToggle(300);
});

$('.close-div').on('click', function () {
    $(this).closest("#del").remove();
});

$(".about__text1").click(function () {
    $(this).children(".child1").slideToggle(300);
});

$('.close-div1').on('click', function () {
    $(this).closest("#del1").remove();
});


/*
var button = document.getElementById("button");
button.onclick = function () {
    if  (button.style.backgroundImage != "url(photo.png)" ) {
        button.style.backgroundImage = "url(photo2.png)";
    }
}*/
let HIDDEN_CLASS_NAME = 'hidden'
let TARGET_CLASS_NAME = 'target'
let SOURCE_CLASS_NAME = 'source'

let targetIdToShow = 1
let counter = 0;

let order = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    length: function () {
        let buf = 0;
        for (i = 0; i < 6; i++) {
            buf += this[i].length;
        }
        return buf;
    },
    dispatch: function () {
        let buf = []
        for (i = 0; i < 6; i++) {
            for (let j = 0; j < this[i].length; j++) {
                buf.push(this[i][j].replace(/\r?\n/g, ""))
            }
        }
        return buf.join('. ')
    }
};

function main() {
    let targets = getElements(TARGET_CLASS_NAME)
    let sources = getElements(SOURCE_CLASS_NAME)
    sources.forEach(function (sourceNode) {
        let sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME)
        sourceNode.addEventListener('click', function () {
            showTarget(targets, sourceNodeId)
        })
    })
    showTarget(targets, targetIdToShow)
}

function getElements(type) {
    return [].slice.call(document.querySelectorAll('.' + type)).sort(function (targetNode1, targetNode2) {
        let target1Num = extractId(targetNode1, TARGET_CLASS_NAME)
        let target2Num = extractId(targetNode2, TARGET_CLASS_NAME)
        return target1Num > target2Num
    })
}

function extractId(targetNode, baseClass) {
    let currentClassIndex = targetNode.classList.length
    while (currentClassIndex--) {
        let currentClass = targetNode.classList.item(currentClassIndex)
        let maybeIdNum = parseInt(currentClass.split('-')[1])
        if (isNaN(maybeIdNum)) {
            continue
        }
        let classStrinToValidate = baseClass + '-' + maybeIdNum
        if (classStrinToValidate === currentClass) {
            return maybeIdNum
        }
    }
}

function showTarget(targets, targetId) {
    targets.forEach(function (targetNode, targetIndex) {
        let currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME)
        if (currentTargetNodeId === targetId) {
            targetNode.classList.remove(HIDDEN_CLASS_NAME)
        } else {
            targetNode.classList.add(HIDDEN_CLASS_NAME)
        }
    })
}

main()

/*
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; length++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e){
            const popupName = popupLink.getAttribute('href').replace('#','');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}*/


$(document).ready(function () {
    $("#menu").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 600);
    });
});

$(document).ready(function () {
    $("#menu2").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
});



$(document).ready(function () {
    $('form').submit(function (e) {
        $('.button_add').click(function () {
            return function () {
                return false
            }
        });
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize() + '&add=' + encodeURIComponent(order.dispatch())
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('.button_add').text('ДОПОВНИТИ ЗАМОВЛЕННЯ');
            $('.popup__body .portfolio').remove();
            $('.popup__body .target').remove();
            $('.popup').fadeOut('slow');
            $('form').trigger('reset');
            for (let i = 0; i < 6; i++) {
                order[i] = [];
            }
        });
        return false;
    })

    $('.button_add').click(function () {

        showPortfolio();

        $('.popup__content').fadeOut();

        $('.popup__body .portfolio__item').each(function (i) {

            $(this).on('click', function (e) {
                counter++
                e.preventDefault();

                if ($('.popup__body').children(`.target-${i+1}`).length > 0) {
                    $('.popup__body .portfolio').fadeOut('fast');
                    $('.popup__body .portfolio .popup__button').fadeOut('fast');
                    $(`.popup__body .target-${i+1}`).fadeIn();
                    $('.button_manipulate').fadeIn();
                } else {
                    $(`.original .target-${i+1}`).clone().addClass(`popup_manipulate popup_manipulate-${i+1}`).removeClass('hidden').appendTo(".popup__body:last").fadeIn('slow');
                    $(".popup__body .portfolio").fadeOut('fast');
                    $('.popup__body .portfolio .popup__button').fadeOut();
                    if (counter > 1) {
                        $(`
                        <div class="popup__button button_added">
                        <a href="#popup">
                        <button class="button button_added_btn">ДОДАТИ (0)</button>
                        </a>
                        </div>
                        <div class="popup__button button_manipulate">
                        <a href="#popup">
                        <button class="button button_close_inner">НАЗАД</button>
                        </a>
                        </div>`).appendTo(`.popup__body .target-${i+1}`).fadeIn();
                    } else {
                        $(`
                        <div class="popup__button button_added">
                        <a href="#popup">
                        <button class="button button_added_btn">ДОДАТИ (0)</button>
                        </a>
                        </div>
                        <div class="popup__button button_manipulate">
                        <a href="#popup">
                        <button class="button button_close_inner">НАЗАД</button>
                        </a>
                        </div>`).appendTo(".popup__body .popup_manipulate").fadeIn();
                    }
                }
                if (i == 0) {
                    $('.popup__body .portfolio__security__button__element').remove()
                }
                if (i == 5) {
                    $('.popup__body .portfolio__window__button__element').remove()
                }

                if ($(`.target-${i+1}`).children('.button_manipulate').length > 1) {
                    $(`.target-${i+1} .button_manipulate`).eq(1).remove();
                }

                function textListener() {
                    $(`.popup__body .target-${i+1} .portfolio__modal__text`).each(function (j) {
                        $(this).on('click', function () {
                            $('.target a').on('click', function (evn) {
                                evn.preventDefault();
                            });
                            if ($(this).hasClass('portfolio__modal__text__active') || isInArray(order[i], $(this).text())) {
                                $(this).removeClass('portfolio__modal__text__active');
                                contains(order[i], $(this).text());
                                $('.button_added_btn').text(`ДОДАТИ (${order[i].length})`);
                            } else {
                                $(this).addClass('portfolio__modal__text__active');
                                contains(order[i], $(this).text());
                                $('.button_added_btn').text(`ДОДАТИ (${order[i].length})`);
                            }
                        });
                    });
                }
                textListener();

                function removeTextListener() {
                    $(`.popup__body .target-${i+1} .portfolio__modal__text`).each(function (j) {
                        $(this).unbind('click');
                    });
                }


                // if ($('.popup__body .portfolio__item').eq(i).hasClass('portfolio__item-add')) {
                //     $('.popup__body .portfolio__item').eq(i).removeClass('portfolio__item-add');
                //     contains(popupAddInfo, $('.popup__body .portfolio__item').eq(i).text());
                //     e.stopPropagation();
                //     if (popupAddInfo.length == 0) {
                //         $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ`);
                //     } else {
                //         $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ (${popupAddInfo.length})`);
                //     }
                // } else {
                //     $('.popup__body .portfolio__item').eq(i).addClass('portfolio__item-add');
                //     contains(popupAddInfo, $('.popup__body .portfolio__item').eq(i).text());
                //     e.stopPropagation();
                //     if (popupAddInfo.length == 0) {
                //         $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ`);
                //     } else {
                //         $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ (${popupAddInfo.length})`);
                //     }
                // }
                if ((i == 0 || i == 5)) {
                    if (order[i].length == 1) {
                        $(`.target-${i+1} .button_added_btn`).text('ВИДАЛИТИ');
                    } else {
                        $(`.target-${i+1} .button_added_btn`).text('ДОДАТИ (1)');
                    }
                }


                $('.button_added_btn').click(function (e) {
                    e.stopPropagation();
                    removeTextListener();
                    if (i == 0 || i == 5) {
                        if (order[i].length == 1) {
                            order[i] = [];
                            $('.popup__body .portfolio__item').eq(i).removeClass('portfolio__item-add');
                        } else {
                            order[i][0] = $(`.popup__body .source-${i+1}`).text();
                            $('.popup__body .portfolio__item').eq(i).addClass('portfolio__item-add');
                        }
                    } else {
                        if (order[i].length !== 0) {
                            $('.popup__body .portfolio__item').eq(i).addClass('portfolio__item-add');
                        } else {
                            $('.popup__body .portfolio__item').eq(i).removeClass('portfolio__item-add');
                        }
                    }

                    $('.popup__body .popup_manipulate').fadeOut();
                    $('.button_manipulate').fadeOut();
                    $('.popup__body .portfolio').fadeIn();
                    $('.popup__body .portfolio .popup__button').fadeIn();
                    $('.button_added_btn').unbind('click');
                    $('.button_close_inner').unbind('click');
                });

                $('.button_close_inner').click(function (e) {
                    e.stopPropagation();
                    if (i != 0 && i != 5) {
                        if ($('.popup__body .portfolio__item').eq(i).hasClass('portfolio__item-add') || order[i].length == 0) {
                            $('.popup__body .portfolio__item').eq(i).removeClass('portfolio__item-add');
                        } else {
                            $('.popup__body .portfolio__item').eq(i).addClass('portfolio__item-add');
                        }
                    }
                    $('.popup__body .popup_manipulate').fadeOut();
                    $('.button_manipulate').fadeOut();
                    $('.popup__body .portfolio').fadeIn()
                    $('.popup__body .portfolio .popup__button').fadeIn()
                    removeTextListener();
                    $('.button_close_inner').unbind('click');
                    $('.button_added_btn').unbind('click');
                });
            });
        });

        $('.button_added_btn').unbind('click');

        $('.button_close').click(function (e) {
            e.stopPropagation();
            $('.popup__content').fadeIn();
            $(".popup__body .portfolio").fadeOut();
            $('.popup__body .portfolio .popup__button').fadeOut();
            $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ (${order.length()})`)
            $('.popup__body .portfolio__item').each(function (i) {
                $(this).unbind('click');
            });
        });
    });

    $('.portfolio_button_add-modal').each(function (index) {
        $(this).on('click', function () {
            if ($('.popup__body').children(`.portfolio`).length > 0) {

            } else {
                $(".portfolio").clone().appendTo(".popup__body:last").fadeOut('fast');
                $(`<div class="popup__button mt-50">
                <a href="#popup">
                <button class="button button_close">НАЗАД</button>
                </a>
                </div>`).appendTo(".popup__body .portfolio");
            }
            if (index == 0) {
                buttonAddModalPortfolio(this, 0)
            } else if (index == 1) {
                buttonAddModalPortfolio(this, 5)
            } else {

            }
        });
    });

    $('.popup-link').on('click', function () {
        $('.button_add').text(`ДОПОВНИТИ ЗАМОВЛЕННЯ (${order.length()})`)
        $('.popup').fadeIn('slow')
    });

});

function contains(arr, elem) {
    let isDel = false;
    if (!arr) {
        arr[0] = elem;
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            arr.splice(i, 1);
            isDel = true;
        }
    }
    if (!isDel) {
        arr.push(elem);
    }
}

function isInArray(arr, elem) {
    if (!arr) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false
}

function showPortfolio() {
    if ($('.popup__body').children(`.portfolio`).length > 0) {
        $('.popup__body .portfolio').fadeIn('slow');
        $('.popup__body .portfolio .popup__button').fadeIn('slow');
    } else {
        $(".portfolio").clone().appendTo(".popup__body:last").fadeIn('slow');
        $(`<div class="popup__button mt-50">
        <a href="#popup">
        <button class="button button_close">НАЗАД</button>
        </a>
        </div>`).appendTo(".popup__body .portfolio");
    }
}

function buttonAddModalPortfolio(context, ind) {
    if (order[ind].length > 0) {
        $('.popup__body .portfolio__item').eq(ind).removeClass('portfolio__item-add');
        order[ind][0] = []
        $(context).text('ДОДАТИ В ЗАМОВЛЕННЯ')
    } else {
        $('.popup__body .portfolio__item').eq(ind).addClass('portfolio__item-add');
        order[ind][0] = $('.popup__body .portfolio__item').eq(ind).text()
        $(context).text('ВИДАЛИТИ З ЗАМОВЛЕННЯ')
    }
}