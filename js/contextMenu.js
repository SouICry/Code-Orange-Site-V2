/*
//
 * Note: This is a slightly modified fork with onclose disabled because it was being fired
 * on undefined after a fix to stop it from hogging focus on contenteditable click.
 *
 * ** Also changed to close on any key press
 */

/*
 *contextMenu.js v 1.4.1
 *Author: Sudhanshu Yadav
 *s-yadav.github.com
 *Copyright (c) 2013-2015 Sudhanshu Yadav.
 *Dual licensed under the MIT and GPL licenses
 */
;
(function($, window, document, undefined) {
    "use strict";

    $.single = (function() {
        var single = $({});
        return function(elm) {
            single[0] = elm;
            return single;
        };
    }());

    $.fn.contextMenu = function(method, selector, option) {

        //parameter fix
        if (!methods[method]) {
            option = selector;
            selector = method;
            method = 'popup';
        }
        //need to check for array object
        else if (selector) {
            if (!((selector instanceof Array) || (typeof selector === 'string') || (selector.nodeType) || (selector.jquery))) {
                option = selector;
                selector = null;
            }
        }

        if ((selector instanceof Array) && (method != 'update')) {
            method = 'menu';
        }

        var myoptions = option;
        if ($.inArray(method, ['menu', 'popup', 'close', 'destroy']) > -1) {
            option = iMethods.optionOtimizer(method, option);
            this.each(function() {
                var $this = $(this)
                myoptions = $.extend({}, $.fn.contextMenu.defaults, option);
                if (!myoptions.baseTrigger) {
                    myoptions.baseTrigger = $this;
                }
                methods[method].call($this, selector, myoptions)
            });
        } else {
            methods[method].call(this, selector, myoptions)
        }
        return this;
    };
    $.fn.contextMenu.defaults = {
        triggerOn: 'click', //avaliable options are all event related mouse plus enter option
        subMenuTriggerOn: 'hover click',
        displayAround: 'cursor', // cursor or trigger
        mouseClick: 'left',
        verAdjust: 0,
        horAdjust: 0,
        top: 'auto',
        left: 'auto',
        closeOther: true, //to close other already opened context menu
        containment: window,
        winEventClose: true,
        position: 'auto', //allowed values are top, left, bottom and right
        closeOnClick: true, //close context menu on click/ trigger of any item in menu

        //callback
        onOpen: function(data, event) {},
        afterOpen: function(data, event) {},
        onClose: function(data, event) {}
    };

    var methods = {
        menu: function(selector, option) {
            selector = iMethods.createMenuList(this, selector, option);
            iMethods.contextMenuBind.call(this, selector, option, 'menu');
        },
        popup: function(selector, option) {
            $(selector).addClass('iw-contextMenu');
            iMethods.contextMenuBind.call(this, selector, option, 'popup');
        },
        update: function(selector, option) {
            var self = this;
            option = option || {};

            this.each(function() {
                var trgr = $(this),
                    menuData = trgr.data('iw-menuData');
                //refresh if any new element is added
                if (!menuData) {
                    self.contextMenu('refresh');
                    menuData = trgr.data('iw-menuData');
                }

                var menu = menuData.menu;
                if (typeof selector === 'object') {

                    for (var i = 0; i < selector.length; i++) {
                        var name = selector[i].name,
                            disable = selector[i].disable,
                            fun = selector[i].fun,
                            img = selector[i].img,
                            title = selector[i].title,
                            className = selector[i].className,
                            elm = menu.children('li').filter(function() {
                                return $(this).contents().filter(function() {
                                        return this.nodeType == 3;
                                    }).text() == name;
                            }),
                            subMenu = selector[i].subMenu;

                        //toggle disable if provided on update method
                        disable != undefined && (disable ? elm.addClass('iw-mDisable') : elm.removeClass('iw-mDisable'));

                        //bind new function if provided
                        fun && elm.unbind('click.contextMenu').bind('click.contextMenu', fun);

                        //update title
                        title != undefined && elm.attr('title', title);

                        //update class name
                        className != undefined && elm.attr('class', className);

                        //update image
                        if (img) {
                            var imgIcon = elm.find('.iw-mIcon');
                            if (imgIcon.length) {
                                imgIcon[0].src = img;
                            } else {
                                elm.prepend('<img src="' + img + '" align="absmiddle" class="iw-mIcon" />');
                            }
                        }

                        //to change submenus
                        if (subMenu) {
                            elm.contextMenu('update', subMenu);
                        }
                    }

                }

                iMethods.onOff(menu);

                //bind event again if trigger option has changed.
                var triggerOn = option.triggerOn;
                if (triggerOn) {
                    trgr.unbind('.contextMenu');

                    //add contextMenu identifier on all events
                    triggerOn = triggerOn.split(" ");
                    var events = [];
                    for (var i = 0, ln = triggerOn.length; i < ln; i++) {
                        events.push(triggerOn[i] + '.contextMenu')
                    }

                    //to bind event
                    trgr.bind(events.join(' '), iMethods.eventHandler);
                }

                //set menu data back to trigger element
                menuData.option = $.extend({}, menuData.option, option);
                trgr.data('iw-menuData', menuData);
            });
        },
        refresh: function() {
            var menuData = this.filter(function() {
                    return !!$(this).data('iw-menuData');
                }).data('iw-menuData'),
                newElm = this.filter(function() {
                    return !$(this).data('iw-menuData');
                });
            //to change basetrigger on refresh
            menuData.option.baseTrigger = this;
            iMethods.contextMenuBind.call(newElm, menuData.menuSelector, menuData.option);
        },
        open: function(sel, data) {
            data = data || {};
            var e = data.event || $.Event('click');
            if (data.top) e.clientY = data.top;
            if (data.left) e.clientX = data.left;
            this.each(function() {
                iMethods.eventHandler.call(this, e);
            });
        },
        //to force context menu to close
        close: function() {
            var menuData = this.data('iw-menuData');
            if (menuData) {
                iMethods.closeContextMenu(menuData.option, this, menuData.menu, null);
            }
        },
        //to get value of a key
        value: function(key) {
            var menuData = this.data('iw-menuData');
            if (menuData[key]) {
                return menuData[key];
            } else if (menuData.option) {
                return menuData.option[key];
            }
            return null;
        },
        destroy: function() {
            var trgr = this,
                menuId = trgr.data('iw-menuData').menuId,
                menu = $('.iw-contextMenu[menuId=' + menuId + ']'),
                menuData = menu.data('iw-menuData');

            //Handle the situation of dynamically added element.
            if (!menuData) return;


            if (menuData.noTrigger == 1) {
                if (menu.hasClass('iw-created')) {
                    menu.remove();
                } else {
                    menu.removeClass('iw-contextMenu ' + menuId)
                        .removeAttr('menuId').removeData('iw-menuData');
                    //to destroy submenus
                    menu.find('li.iw-mTrigger').contextMenu('destroy');
                }
            } else {
                menuData.noTrigger--;
                menu.data('iw-menuData', menuData);
            }
            trgr.unbind('.contextMenu').removeClass('iw-mTrigger').removeData('iw-menuData');
        }
    };
    var iMethods = {
        contextMenuBind: function(selector, option, method) {
            var trigger = this,
                menu = $(selector),
                menuData = menu.data('iw-menuData');

            //fallback
            if (menu.length == 0) {
                menu = trigger.find(selector);
                if (menu.length == 0) {
                    return;
                }
            }

            if (method == 'menu') {
                iMethods.menuHover(menu);
            }
            //get base trigger
            var baseTrigger = option.baseTrigger;


            if (!menuData) {
                var menuId;
                if (!baseTrigger.data('iw-menuData')) {
                    menuId = Math.ceil(Math.random() * 100000);
                    baseTrigger.data('iw-menuData', {
                        'menuId': menuId
                    });
                } else {
                    menuId = baseTrigger.data('iw-menuData').menuId;
                }
                //create clone menu to calculate exact height and width.
                var cloneMenu = menu.clone();
                cloneMenu.appendTo('body');

                menuData = {
                    'menuId': menuId,
                    'menuWidth': cloneMenu.outerWidth(true),
                    'menuHeight': cloneMenu.outerHeight(true),
                    'noTrigger': 1,
                    'trigger': trigger
                };


                //to set data on selector
                menu.data('iw-menuData', menuData).attr('menuId', menuId);
                //remove clone menu
                cloneMenu.remove();
            } else {
                menuData.noTrigger++;
                menu.data('iw-menuData', menuData);
            }

            //to set data on trigger
            trigger.addClass('iw-mTrigger').data('iw-menuData', {
                'menuId': menuData.menuId,
                'option': option,
                'menu': menu,
                'menuSelector': selector,
                'method': method
            });

            //hover fix
            var triggerOn = option.triggerOn;
            if (triggerOn.indexOf('hover') != -1) {
                triggerOn = triggerOn.replace('hover', 'mouseenter');
                //hover out if display is of context menu is on hover
                if (baseTrigger.index(trigger) != -1) {
                    baseTrigger.add(menu).bind('mouseleave.contextMenu', function(e) {
                        if ($(e.relatedTarget).closest('.iw-contextMenu').length == 0) {
                            $('.iw-contextMenu[menuId="' + menuData.menuId + '"]').fadeOut(100);
                        }
                    });
                }

            }

            trigger.delegate('input,a,.needs-click', 'click', function(e) {
                e.stopImmediatePropagation()
            });

            //add contextMenu identifier on all events
            triggerOn = triggerOn.split(' ');
            var events = [];
            for (var i = 0, ln = triggerOn.length; i < ln; i++) {
                events.push(triggerOn[i] + '.contextMenu')
            }

            //to bind event
            trigger.bind(events.join(' '), iMethods.eventHandler);

            //to stop bubbling in menu
            menu.bind('click mouseenter', function(e) {
                e.stopPropagation();
            });

            menu.delegate('li', 'click', function(e) {
                if (option.closeOnClick && !$.single(this).hasClass('iw-has-submenu')) iMethods.closeContextMenu(option, trigger, menu, e);
            });
        },
        eventHandler: function(e) {
            e.preventDefault();
            var trigger = $(this),
                trgrData = trigger.data('iw-menuData'),
                menu = trgrData.menu,
                menuData = menu.data('iw-menuData'),
                option = trgrData.option,
                cntnmnt = option.containment,
                clbckData = {
                    trigger: trigger,
                    menu: menu
                },
            //check conditions
                cntWin = cntnmnt == window,
                btChck = option.baseTrigger.index(trigger) == -1;

            //to close previous open menu.
            if (!btChck && option.closeOther) {
                $('.iw-contextMenu').css('display', 'none');
            }

            //to reset already selected menu item
            menu.find('.iw-mSelected').removeClass('iw-mSelected');

            //call open callback
            option.onOpen.call(this, clbckData, e);


            var cObj = $(cntnmnt),
                cHeight = cObj.innerHeight(),
                cWidth = cObj.innerWidth(),
                cTop = 0,
                cLeft = 0,
                menuHeight = menuData.menuHeight,
                menuWidth = menuData.menuWidth,
                va, ha,
                left = 0,
                top = 0,
                bottomMenu,
                rightMenu,
                verAdjust = va = parseInt(option.verAdjust),
                horAdjust = ha = parseInt(option.horAdjust);

            if (!cntWin) {
                cTop = cObj.offset().top;
                cLeft = cObj.offset().left;

                //to add relative position if no position is defined on containment
                if (cObj.css('position') == 'static') {
                    cObj.css('position', 'relative');
                }

            }


            if (option.displayAround == 'cursor') {
                left = cntWin ? e.clientX : e.clientX + $(window).scrollLeft() - cLeft;
                top = cntWin ? e.clientY : e.clientY + $(window).scrollTop() - cTop;
                bottomMenu = top + menuHeight;
                rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                        } else {
                            left = 0;
                            ha = 0;
                        }
                    } else {
                        left = left - menuWidth;
                        ha = -1 * ha;
                    }
                }
            } else if (option.displayAround == 'trigger') {
                var triggerHeight = trigger.outerHeight(true),
                    triggerWidth = trigger.outerWidth(true),
                    triggerLeft = cntWin ? trigger.offset().left - cObj.scrollLeft() : trigger.offset().left - cLeft,
                    triggerTop = cntWin ? trigger.offset().top - cObj.scrollTop() : trigger.offset().top - cTop,
                    leftShift = triggerWidth;

                left = triggerLeft + triggerWidth;
                top = triggerTop;


                bottomMenu = top + menuHeight;
                rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight + triggerHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                            leftShift = -triggerWidth;
                        } else {
                            left = 0;
                            ha = 0;
                            leftShift = 0;
                        }
                    } else {
                        left = left - menuWidth - triggerWidth;
                        ha = -1 * ha;
                        leftShift = -triggerWidth;
                    }
                }
                //test end
                if (option.position == 'top') {
                    top = triggerTop - menuHeight;
                    va = verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'left') {
                    left = triggerLeft - menuWidth;
                    ha = horAdjust;
                } else if (option.position == 'bottom') {
                    top = triggerTop + triggerHeight;
                    va = verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'right') {
                    left = triggerLeft + triggerWidth;
                    ha = horAdjust;
                }
            }

            //applying css property
            var cssObj = {
                'position': (cntWin || btChck) ? 'fixed' : 'absolute',
                'display': 'inline-block',
                'height': '',
                'width': ''
            };


            //to get position from offset parent
            if (option.left != 'auto') {
                left = iMethods.getPxSize(option.left, cWidth);
            }
            if (option.top != 'auto') {
                top = iMethods.getPxSize(option.top, cHeight);
            }
            if (!cntWin) {
                var oParPos = trigger.offsetParent().offset();
                if (btChck) {
                    left = left + cLeft - $(window).scrollLeft();
                    top = top + cTop - $(window).scrollTop();
                } else {
                    left = left - (cLeft - oParPos.left);
                    top = top - (cTop - oParPos.top);
                }
            }
            cssObj.left = left + ha + 'px';
            cssObj.top = top + va + 'px';

            menu.css(cssObj);

            //to call after open call back
            option.afterOpen.call(this, clbckData, e);


            //to add current menu class
            if (trigger.closest('.iw-contextMenu').length == 0) {
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
            }


            var dataParm = {
                trigger: trigger,
                menu: menu,
                option: option,
                method: trgrData.method
            };
            $('html').unbind('click', iMethods.clickEvent).click(dataParm, iMethods.clickEvent);
            $(document).unbind('keydown', iMethods.keyEvent).keydown(dataParm, iMethods.keyEvent);
            if (option.winEventClose) {
                $(window).bind('scroll resize', dataParm, iMethods.scrollEvent);
            }
        },

        scrollEvent: function(e) {
            iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
        },

        clickEvent: function(e) {
            var button = e.data.trigger.get(0);

            if ((button !== e.target) && ($(e.target).closest('.iw-contextMenu').length == 0)) {
                iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
            }
        },
        keyEvent: function(e) {
            e.preventDefault();
            var menu = e.data.menu,
                option = e.data.option,
                keyCode = e.keyCode;
            // handle cursor keys

            //Changed Modified
            //Closes on any button press
            //if (keyCode == 27) {
                iMethods.closeContextMenu(option, e.data.trigger, menu, e);
            //}
            if (e.data.method == 'menu') {
                var curMenu = $('.iw-curMenu'),
                    optList = curMenu.children('li:not(.iw-mDisable)'),
                    selected = optList.filter('.iw-mSelected'),
                    index = optList.index(selected),
                    focusOn = function(elm) {
                        iMethods.selectMenu(curMenu, elm);
                        var menuData = elm.data('iw-menuData');
                        if (menuData) {
                            iMethods.eventHandler.call(elm[0], e);

                        }
                    },
                    first = function() {
                        focusOn(optList.filter(':first'));
                    },
                    last = function() {
                        focusOn(optList.filter(':last'));
                    },
                    next = function() {
                        focusOn(optList.filter(':eq(' + (index + 1) + ')'));
                    },
                    prev = function() {
                        focusOn(optList.filter(':eq(' + (index - 1) + ')'));
                    },
                    subMenu = function() {
                        var menuData = selected.data('iw-menuData');
                        if (menuData) {
                            iMethods.eventHandler.call(selected[0], e);
                            var selector = menuData.menu;
                            selector.addClass('iw-curMenu');
                            curMenu.removeClass('iw-curMenu');
                            curMenu = selector;
                            optList = curMenu.children('li:not(.iw-mDisable)');
                            selected = optList.filter('.iw-mSelected');
                            first();
                        }
                    },
                    parMenu = function() {
                        var selector = curMenu.data('iw-menuData').trigger;
                        var parMenu = selector.closest('.iw-contextMenu');
                        if (parMenu.length != 0) {
                            curMenu.removeClass('iw-curMenu').css('display', 'none');
                            parMenu.addClass('iw-curMenu');
                        }
                    };

                //Changed modified
                //switch (keyCode) {
                //    case 13:
                //        selected.click();
                //        break;
                //    case 40:
                //        (index == optList.length - 1 || selected.length == 0) ? first() : next();
                //        break;
                //    case 38:
                //        (index == 0 || selected.length == 0) ? last() : prev();
                //        break;
                //    case 33:
                //        first();
                //        break;
                //    case 34:
                //        last();
                //        break;
                //    case 37:
                //        parMenu();
                //        break;
                //    case 39:
                //        subMenu();
                //        break;
                //}
            }
        },
        closeContextMenu: function(option, trigger, menu, e) {

            //unbind all events from top DOM
            $(document).unbind('keydown', iMethods.keyEvent);
            $('html').unbind('click', iMethods.clickEvent);
            $(window).unbind('scroll resize', iMethods.scrollEvent);
            $('.iw-contextMenu').css('display', 'none');
            $(document).focus();

            /*/call close function
            option.onClose.call(this, {
                trigger: trigger,
                menu: menu
            }, e);*/
        },
        getPxSize: function(size, of) {
            if (!isNaN(size)) {
                return size;
            }
            if (size.indexOf('%') != -1) {
                return parseInt(size) * of / 100;
            } else {
                return parseInt(size);
            }
        },
        selectMenu: function(menu, elm) {
            //to select the list
            var selected = menu.find('li.iw-mSelected'),
                submenu = selected.find('.iw-contextMenu');
            if ((submenu.length != 0) && (selected[0] != elm[0])) {
                submenu.fadeOut(100);
            }
            selected.removeClass('iw-mSelected');
            elm.addClass('iw-mSelected');
        },
        menuHover: function(menu) {
            var lastEventTime = Date.now();
            menu.children('li').bind('mouseenter.contextMenu click.contextMenu', function(e) {
                //to make curmenu
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
                iMethods.selectMenu(menu, $(this));
            });
        },
        createMenuList: function(trgr, selector, option) {
            var baseTrigger = option.baseTrigger,
                randomNum = Math.floor(Math.random() * 10000);
            if ((typeof selector == 'object') && (!selector.nodeType) && (!selector.jquery)) {
                var menuList = $('<ul class="iw-contextMenu iw-created iw-cm-menu" id="iw-contextMenu' + randomNum + '"></ul>');
                $.each(selector, function(index, selObj) {
                    var name = selObj.name,
                        fun = selObj.fun || function() {},
                        subMenu = selObj.subMenu,
                        img = selObj.img || '',
                        title = selObj.title || "",
                        className = selObj.className || "",
                        disable = selObj.disable,
                        list = $('<li title="' + title + '" class="' + className + '">' + name + '</li>');

                    if (img) {
                        list.prepend('<img src="' + img + '" align="absmiddle" class="iw-mIcon" />');
                    }

                    //to add disable
                    if (disable) {
                        list.addClass('iw-mDisable');
                    }

                    if (!subMenu) {
                        list.bind('click.contextMenu', function(e) {
                            fun.call(this, {
                                trigger: baseTrigger,
                                menu: menuList
                            }, e);
                        });
                    }

                    //to create sub menu
                    menuList.append(list);
                    if (subMenu) {
                        list.addClass('iw-has-submenu').append('<div class="iw-cm-arrow-right" />');
                        iMethods.subMenu(list, subMenu, baseTrigger, option);
                    }
                });

                if (baseTrigger.index(trgr[0]) == -1) {
                    trgr.append(menuList);
                } else {
                    var par = option.containment == window ? 'body' : option.containment;
                    $(par).append(menuList);
                }

                iMethods.onOff($('#iw-contextMenu' + randomNum));
                return '#iw-contextMenu' + randomNum;
            } else if ($(selector).length != 0) {
                var element = $(selector);
                element.removeClass('iw-contextMenuCurrent')
                    .addClass('iw-contextMenu iw-cm-menu iw-contextMenu' + randomNum)
                    .attr('menuId', 'iw-contextMenu' + randomNum)
                    .css('display', 'none');

                //to create subMenu
                element.find('ul').each(function(index, element) {
                    var subMenu = $(this),
                        parent = subMenu.parent('li');
                    parent.append('<div class="iw-cm-arrow-right" />');
                    subMenu.addClass('iw-contextMenuCurrent');
                    iMethods.subMenu(parent, '.iw-contextMenuCurrent', baseTrigger, option);
                });
                iMethods.onOff($('.iw-contextMenu' + randomNum));
                return '.iw-contextMenu' + randomNum;
            }
        },
        subMenu: function(trigger, selector, baseTrigger, option) {
            trigger.contextMenu('menu', selector, {
                triggerOn: option.subMenuTriggerOn,
                displayAround: 'trigger',
                position: 'auto',
                mouseClick: 'left',
                baseTrigger: baseTrigger,
                containment: option.containment
            });
        },
        onOff: function(menu) {

            menu.find('.iw-mOverlay').remove();
            menu.find('.iw-mDisable').each(function() {
                var list = $(this);
                list.append('<div class="iw-mOverlay"/>');
                list.find('.iw-mOverlay').bind('click mouseenter', function(event) {
                    event.stopPropagation();
                });

            });

        },
        optionOtimizer: function(method, option) {
            if (!option) {
                return;
            }
            if (method == 'menu') {
                if (!option.mouseClick) {
                    option.mouseClick = 'right';
                }
            }
            if ((option.mouseClick == 'right') && (option.triggerOn == 'click')) {
                option.triggerOn = 'contextmenu';
            }

            if ($.inArray(option.triggerOn, ['hover', 'mouseenter', 'mouseover', 'mouseleave', 'mouseout', 'focusin', 'focusout']) != -1) {
                option.displayAround = 'trigger';
            }
            return option;
        }
    };
})(jQuery, window, document);

/*
!function(e,n,t,i){"use strict";e.single=function(){var n=e({});return function(e){return n[0]=e,n}}(),e.fn.contextMenu=function(n,t,i){a[n]?t&&(t instanceof Array||"string"==typeof t||t.nodeType||t.jquery||(i=t,t=null)):(i=t,t=n,n="popup"),t instanceof Array&&"update"!=n&&(n="menu");var r=i;return e.inArray(n,["menu","popup","close","destroy"])>-1?(i=o.optionOtimizer(n,i),this.each(function(){var o=e(this);r=e.extend({},e.fn.contextMenu.defaults,i),r.baseTrigger||(r.baseTrigger=o),a[n].call(o,t,r)})):a[n].call(this,t,r),this},e.fn.contextMenu.defaults={triggerOn:"click",subMenuTriggerOn:"hover click",displayAround:"cursor",mouseClick:"left",verAdjust:0,horAdjust:0,top:"auto",left:"auto",closeOther:!0,containment:n,winEventClose:!0,position:"auto",closeOnClick:!0,onOpen:function(){},afterOpen:function(){},onClose:function(){}};var a={menu:function(e,n){e=o.createMenuList(this,e,n),o.contextMenuBind.call(this,e,n,"menu")},popup:function(n,t){e(n).addClass("iw-contextMenu"),o.contextMenuBind.call(this,n,t,"popup")},update:function(n,t){var a=this;t=t||{},this.each(function(){var r=e(this),u=r.data("iw-menuData");u||(a.contextMenu("refresh"),u=r.data("iw-menuData"));var c=u.menu;if("object"==typeof n)for(var s=0;s<n.length;s++){var l=n[s].name,d=n[s].disable,f=n[s].fun,m=n[s].img,g=n[s].title,p=n[s].className,h=c.children("li").filter(function(){return e(this).contents().filter(function(){return 3==this.nodeType}).text()==l}),v=n[s].subMenu;if(d!=i&&(d?h.addClass("iw-mDisable"):h.removeClass("iw-mDisable")),f&&h.unbind("click.contextMenu").bind("click.contextMenu",f),g!=i&&h.attr("title",g),p!=i&&h.attr("class",p),m){var w=h.find(".iw-mIcon");w.length?w[0].src=m:h.prepend('<img src="'+m+'" align="absmiddle" class="iw-mIcon" />')}v&&h.contextMenu("update",v)}o.onOff(c);var M=t.triggerOn;if(M){r.unbind(".contextMenu"),M=M.split(" ");for(var x=[],s=0,b=M.length;b>s;s++)x.push(M[s]+".contextMenu");r.bind(x.join(" "),o.eventHandler)}u.option=e.extend({},u.option,t),r.data("iw-menuData",u)})},refresh:function(){var n=this.filter(function(){return!!e(this).data("iw-menuData")}).data("iw-menuData"),t=this.filter(function(){return!e(this).data("iw-menuData")});n.option.baseTrigger=this,o.contextMenuBind.call(t,n.menuSelector,n.option)},open:function(n,t){t=t||{};var i=t.event||e.Event("click");t.top&&(i.clientY=t.top),t.left&&(i.clientX=t.left),this.each(function(){o.eventHandler.call(this,i)})},close:function(){var e=this.data("iw-menuData");e&&o.closeContextMenu(e.option,this,e.menu,null)},value:function(e){var n=this.data("iw-menuData");return n[e]?n[e]:n.option?n.option[e]:null},destroy:function(){var n=this,t=n.data("iw-menuData").menuId,i=e(".iw-contextMenu[menuId="+t+"]"),a=i.data("iw-menuData");a&&(1==a.noTrigger?i.hasClass("iw-created")?i.remove():(i.removeClass("iw-contextMenu "+t).removeAttr("menuId").removeData("iw-menuData"),i.find("li.iw-mTrigger").contextMenu("destroy")):(a.noTrigger--,i.data("iw-menuData",a)),n.unbind(".contextMenu").removeClass("iw-mTrigger").removeData("iw-menuData"))}},o={contextMenuBind:function(n,t,i){var a=this,r=e(n),u=r.data("iw-menuData");if(0!=r.length||(r=a.find(n),0!=r.length)){"menu"==i&&o.menuHover(r);var c=t.baseTrigger;if(u)u.noTrigger++,r.data("iw-menuData",u);else{var s;c.data("iw-menuData")?s=c.data("iw-menuData").menuId:(s=Math.ceil(1e5*Math.random()),c.data("iw-menuData",{menuId:s}));var l=r.clone();l.appendTo("body"),u={menuId:s,menuWidth:l.outerWidth(!0),menuHeight:l.outerHeight(!0),noTrigger:1,trigger:a},r.data("iw-menuData",u).attr("menuId",s),l.remove()}a.addClass("iw-mTrigger").data("iw-menuData",{menuId:u.menuId,option:t,menu:r,menuSelector:n,method:i});var d=t.triggerOn;-1!=d.indexOf("hover")&&(d=d.replace("hover","mouseenter"),-1!=c.index(a)&&c.add(r).bind("mouseleave.contextMenu",function(n){0==e(n.relatedTarget).closest(".iw-contextMenu").length&&e('.iw-contextMenu[menuId="'+u.menuId+'"]').fadeOut(100)})),a.delegate("input,a,.needs-click","click",function(e){e.stopImmediatePropagation()}),d=d.split(" ");for(var f=[],m=0,g=d.length;g>m;m++)f.push(d[m]+".contextMenu");a.bind(f.join(" "),o.eventHandler),r.bind("click mouseenter",function(e){e.stopPropagation()}),r.delegate("li","click",function(n){t.closeOnClick&&!e.single(this).hasClass("iw-has-submenu")&&o.closeContextMenu(t,a,r,n)})}},eventHandler:function(i){i.preventDefault();var a=e(this),r=a.data("iw-menuData"),u=r.menu,c=u.data("iw-menuData"),s=r.option,l=s.containment,d={trigger:a,menu:u},f=l==n,m=-1==s.baseTrigger.index(a);!m&&s.closeOther&&e(".iw-contextMenu").css("display","none"),u.find(".iw-mSelected").removeClass("iw-mSelected"),s.onOpen.call(this,d,i);var g,p,h,v,w=e(l),M=w.innerHeight(),x=w.innerWidth(),b=0,C=0,k=c.menuHeight,y=c.menuWidth,D=0,O=0,T=g=parseInt(s.verAdjust),I=p=parseInt(s.horAdjust);if(f||(b=w.offset().top,C=w.offset().left,"static"==w.css("position")&&w.css("position","relative")),"cursor"==s.displayAround)D=f?i.clientX:i.clientX+e(n).scrollLeft()-C,O=f?i.clientY:i.clientY+e(n).scrollTop()-b,h=O+k,v=D+y,h>M&&(0>O-k?k-O>h-M?(O=M-k,g=-1*g):(O=0,g=0):(O-=k,g=-1*g)),v>x&&(0>D-y?y-D>v-x?(D=x-y,p=-1*p):(D=0,p=0):(D-=y,p=-1*p));else if("trigger"==s.displayAround){var A=a.outerHeight(!0),E=a.outerWidth(!0),H=f?a.offset().left-w.scrollLeft():a.offset().left-C,S=f?a.offset().top-w.scrollTop():a.offset().top-b,j=E;D=H+E,O=S,h=O+k,v=D+y,h>M&&(0>O-k?k-O>h-M?(O=M-k,g=-1*g):(O=0,g=0):(O=O-k+A,g=-1*g)),v>x&&(0>D-y?y-D>v-x?(D=x-y,p=-1*p,j=-E):(D=0,p=0,j=0):(D=D-y-E,p=-1*p,j=-E)),"top"==s.position?(O=S-k,g=T,D-=j):"left"==s.position?(D=H-y,p=I):"bottom"==s.position?(O=S+A,g=T,D-=j):"right"==s.position&&(D=H+E,p=I)}var z={position:f||m?"fixed":"absolute",display:"inline-block",height:"",width:""};if("auto"!=s.left&&(D=o.getPxSize(s.left,x)),"auto"!=s.top&&(O=o.getPxSize(s.top,M)),!f){var P=a.offsetParent().offset();m?(D=D+C-e(n).scrollLeft(),O=O+b-e(n).scrollTop()):(D-=C-P.left,O-=b-P.top)}z.left=D+p+"px",z.top=O+g+"px",u.css(z),s.afterOpen.call(this,d,i),0==a.closest(".iw-contextMenu").length&&(e(".iw-curMenu").removeClass("iw-curMenu"),u.addClass("iw-curMenu"));var L={trigger:a,menu:u,option:s,method:r.method};e("html").unbind("click",o.clickEvent).click(L,o.clickEvent),e(t).unbind("keydown",o.keyEvent).keydown(L,o.keyEvent),s.winEventClose&&e(n).bind("scroll resize",L,o.scrollEvent)},scrollEvent:function(e){o.closeContextMenu(e.data.option,e.data.trigger,e.data.menu,e)},clickEvent:function(n){var t=n.data.trigger.get(0);t!==n.target&&0==e(n.target).closest(".iw-contextMenu").length&&o.closeContextMenu(n.data.option,n.data.trigger,n.data.menu,n)},keyEvent:function(n){n.preventDefault();var t=n.data.menu,i=n.data.option,a=n.keyCode;if(27==a&&o.closeContextMenu(i,n.data.trigger,t,n),"menu"==n.data.method){var r=e(".iw-curMenu"),u=r.children("li:not(.iw-mDisable)"),c=u.filter(".iw-mSelected"),s=u.index(c),l=function(e){o.selectMenu(r,e);var t=e.data("iw-menuData");t&&o.eventHandler.call(e[0],n)},d=function(){l(u.filter(":first"))},f=function(){l(u.filter(":last"))},m=function(){l(u.filter(":eq("+(s+1)+")"))},g=function(){l(u.filter(":eq("+(s-1)+")"))},p=function(){var e=c.data("iw-menuData");if(e){o.eventHandler.call(c[0],n);var t=e.menu;t.addClass("iw-curMenu"),r.removeClass("iw-curMenu"),r=t,u=r.children("li:not(.iw-mDisable)"),c=u.filter(".iw-mSelected"),d()}},h=function(){var e=r.data("iw-menuData").trigger,n=e.closest(".iw-contextMenu");0!=n.length&&(r.removeClass("iw-curMenu").css("display","none"),n.addClass("iw-curMenu"))};switch(a){case 13:c.click();break;case 40:s==u.length-1||0==c.length?d():m();break;case 38:0==s||0==c.length?f():g();break;case 33:d();break;case 34:f();break;case 37:h();break;case 39:p()}}},closeContextMenu:function(i,a,r,u){e(t).unbind("keydown",o.keyEvent),e("html").unbind("click",o.clickEvent),e(n).unbind("scroll resize",o.scrollEvent),e(".iw-contextMenu").css("display","none"),e(t).focus(),i.onClose.call(this,{trigger:a,menu:r},u)},getPxSize:function(e,n){return isNaN(e)?-1!=e.indexOf("%")?parseInt(e)*n/100:parseInt(e):e},selectMenu:function(e,n){var t=e.find("li.iw-mSelected"),i=t.find(".iw-contextMenu");0!=i.length&&t[0]!=n[0]&&i.fadeOut(100),t.removeClass("iw-mSelected"),n.addClass("iw-mSelected")},menuHover:function(n){Date.now();n.children("li").bind("mouseenter.contextMenu click.contextMenu",function(){e(".iw-curMenu").removeClass("iw-curMenu"),n.addClass("iw-curMenu"),o.selectMenu(n,e(this))})},createMenuList:function(t,i,a){var r=a.baseTrigger,u=Math.floor(1e4*Math.random());if("object"==typeof i&&!i.nodeType&&!i.jquery){var c=e('<ul class="iw-contextMenu iw-created iw-cm-menu" id="iw-contextMenu'+u+'"></ul>');if(e.each(i,function(n,t){var i=t.name,u=t.fun||function(){},s=t.subMenu,l=t.img||"",d=t.title||"",f=t.className||"",m=t.disable,g=e('<li title="'+d+'" class="'+f+'">'+i+"</li>");l&&g.prepend('<img src="'+l+'" align="absmiddle" class="iw-mIcon" />'),m&&g.addClass("iw-mDisable"),s||g.bind("click.contextMenu",function(e){u.call(this,{trigger:r,menu:c},e)}),c.append(g),s&&(g.addClass("iw-has-submenu").append('<div class="iw-cm-arrow-right" />'),o.subMenu(g,s,r,a))}),-1==r.index(t[0]))t.append(c);else{var s=a.containment==n?"body":a.containment;e(s).append(c)}return o.onOff(e("#iw-contextMenu"+u)),"#iw-contextMenu"+u}if(0!=e(i).length){var l=e(i);return l.removeClass("iw-contextMenuCurrent").addClass("iw-contextMenu iw-cm-menu iw-contextMenu"+u).attr("menuId","iw-contextMenu"+u).css("display","none"),l.find("ul").each(function(){var n=e(this),t=n.parent("li");t.append('<div class="iw-cm-arrow-right" />'),n.addClass("iw-contextMenuCurrent"),o.subMenu(t,".iw-contextMenuCurrent",r,a)}),o.onOff(e(".iw-contextMenu"+u)),".iw-contextMenu"+u}},subMenu:function(e,n,t,i){e.contextMenu("menu",n,{triggerOn:i.subMenuTriggerOn,displayAround:"trigger",position:"auto",mouseClick:"left",baseTrigger:t,containment:i.containment})},onOff:function(n){n.find(".iw-mOverlay").remove(),n.find(".iw-mDisable").each(function(){var n=e(this);n.append('<div class="iw-mOverlay"/>'),n.find(".iw-mOverlay").bind("click mouseenter",function(e){e.stopPropagation()})})},optionOtimizer:function(n,t){return t?("menu"==n&&(t.mouseClick||(t.mouseClick="right")),"right"==t.mouseClick&&"click"==t.triggerOn&&(t.triggerOn="contextmenu"),-1!=e.inArray(t.triggerOn,["hover","mouseenter","mouseover","mouseleave","mouseout","focusin","focusout"])&&(t.displayAround="trigger"),t):void 0}}}(jQuery,window,document);

    */