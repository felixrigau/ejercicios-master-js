var menu = {
  selectedProductItem:null,
  selectedSubproductItem:null,
  sceneContainer:null,
  desktop:null,
  behavior:{

    nextButtonFirstScene:function (event){
      if (menu.desktop) {
        window.alert('menu desktop action')
      } else {
        var sceneContainer = menu.tools.getSceneContainer(),
            scene1 = sceneContainer.querySelector('.scene1'),
            scene2 = sceneContainer.querySelector('.scene2'),
            menuLevel1Childs,
            subMenuList = null;
        //Get all ul child tags contained in the clicked item
        menuLevel1Childs = this.parentElement.querySelectorAll('.menu__level1>ul');
        //Add only the UL tags to the second scene
        for (var i = 0; i < menuLevel1Childs.length; i++) {
          if (menuLevel1Childs[i].nodeName === 'UL') {
            scene2.appendChild(menuLevel1Childs[i].cloneNode(true));
            scene2.lastChild.classList.toggle('show');
          }
        }
        //Add a event listener for each button of the second scene
        menu.eventsMovile.addEListenerToNextButtonSecondScene(scene2);
        //Move the focus to the second scene
        sceneContainer.style.width = (window.innerWidth*2).toString() + 'px';
        scene2.classList.toggle('show');
        sceneContainer.style.left = '-'+window.innerWidth.toString()+'px';
        scene1.classList.toggle('active');
        scene2.classList.toggle('active');
        //Add product's name to the navigation bar
        selectedProductItem = this.previousElementSibling.innerText;
        document.querySelector('.menu__selected-item').innerText = selectedProductItem;
        //Show the back button
        document.querySelector('.menu__back-icon').classList.toggle('hidden');
        //Hide the menu-actions sceneContainer
        document.querySelector('.menu__user-actions').classList.toggle('hidden');
      }
    },

    nextButtonSecondScene:function(event){
      var sceneContainer = menu.tools.getSceneContainer(),
          scene2 = sceneContainer.querySelector('.scene2'),
          scene3 = sceneContainer.querySelector('.scene3'),
          //get all UL tags contained in the clicked item
          subMenuList = this.parentElement.querySelectorAll('ul');
      //Add the UL tags to the third scene
      for (var i = 0; i < subMenuList.length; i++) {
        scene3.appendChild(subMenuList[i].cloneNode(true));
        scene3.lastChild.classList.toggle('show');
      }
      //Move the focus to the third scene
      sceneContainer.style.width = (window.innerWidth*3).toString() + 'px';
      scene3.classList.toggle('show');
      sceneContainer.style.left = '-'+(window.innerWidth*2).toString()+'px';
      scene2.classList.toggle('active');
      scene3.classList.toggle('active');
      //Add product's name to the navigation bar
      selectedSubproductItem = this.previousElementSibling.innerText;
      document.querySelector('.menu__selected-item').innerText = selectedSubproductItem;
    }
  },

  renderView:{

  },

  eventsDesktop:{
    addEListenerToMenuProductItem:function () {
      var menuItems = document.querySelectorAll('.menu__product');
      for (var i = 0; i < menuItems.length; i++) {
        var menuItem,
            subMenu,
            leftPosition,
            triangle;

        menuItems[i].addEventListener('mouseover',function (e) {
          menuItem = this;
          subMenu = menuItem.querySelector('.menu__level1');
          triangle = menuItem.querySelector('.triangle');
          leftPosition = menu.eventsDesktop.getSubmenuPosition(menuItem, subMenu);
          subMenu.style.left = '-'+leftPosition.toString()+'px';
          triangle.style.left = (leftPosition+menuItem.clientWidth/2).toString()+'px';
        });
      }
    },

    getSubmenuPosition:function (menuItem, subMenu) {
      var availableRightMargin = (window.innerWidth * 0.99) - menuItem.offsetLeft
      var subMenuWidth = subMenu.clientWidth
      halfMenuItemOffeset = (subMenu.clientWidth - menuItem.clientWidth)/2
      leftOffset = subMenuWidth - availableRightMargin
      return leftOffset < halfMenuItemOffeset ? halfMenuItemOffeset :leftOffset;
    },

    addEListenerLinkToRelated:function () {
      var linksToRelated = document.querySelectorAll('.link-to-related');
      for (var i = 0; i < linksToRelated.length; i++) {
        linksToRelated[i].addEventListener('mouseover',function (e) {
          var relatedElementsContainer = document.querySelector('.menu__related-elements');
          var subproductNameText = document.querySelector('.subproduct-related');
          relatedElementsContainer.innerHTML = '';
          subproductNameText.innerText = '';
          var relatedElements = this.parentNode.nextElementSibling.children;
          var subproductName = this.parentNode.parentNode.querySelector('.productName').innerText;
          subproductNameText.innerText = subproductName;
          for (var i = 0; i < relatedElements.length; i++) {
            relatedElementsContainer.appendChild(relatedElements[i].cloneNode(true));
          }
        });
      }
    }
  },

  eventsMovile:{
    addEListenerToNavigationButton: function(){
      var navigationButton = document.querySelector('.header__navigation-button'),
          menuTag = document.querySelector('.menu');

      navigationButton.addEventListener('click',function (){
        menuTag.classList.toggle('show');
        menuTag.classList.add('collapsed');
        window.setTimeout(function functionName() {
          menuTag.style.left = '0px';
        });
      });
    },

    addEListenerToCloseButton: function(){
      var closeButton = document.querySelector('.menu__close-button'),
          menuTag = document.querySelector('.menu');

      closeButton.addEventListener('click',function (){
        menuTag.style.left = window.innerWidth+'px';
        //Reset collapsed state's menu
        menuTag.classList.remove('collapsed');
      });
    },

    addEListenerToNextButtonFirstScene: function(){
      //Get all next buttons of the first scene
      var nextButtonsFirstScene = document.querySelectorAll('.menu__product>.menu__icon-container');
      //Add a event listener for each button
      for (var i = 0; i < nextButtonsFirstScene.length; i++) {
        nextButtonsFirstScene[i].addEventListener('click', menu.behavior.nextButtonFirstScene);
      }
    },

    addEListenerToNextButtonSecondScene: function(scene2){
      //Get all next buttons of the second scene
      var nextButtonsSecondScene = scene2.querySelectorAll('.menu__icon-container');
      //Add a event listener for each button
      for (var i = 0; i < nextButtonsSecondScene.length; i++) {
        nextButtonsSecondScene[i].addEventListener('click',menu.behavior.nextButtonSecondScene);
      }
    },

    addBehaviorToBackButton: function(){
      var backButton = document.querySelector('.menu__back-icon'),
          sceneContainer = menu.tools.getSceneContainer();

      backButton.addEventListener('click',function (){
        var activeScene = document.querySelector('.active'),
            scene1 = sceneContainer.querySelector('.scene1'),
            scene2 = sceneContainer.querySelector('.scene2');

          if (activeScene.classList.contains('scene2')) {
            //Move the focus to the first scene and clean the content within the second one
            sceneContainer.style.left = '0px';
            window.setTimeout(function functionName() {
              //Wait 1s to due to the css transition for the left property of sceneContainer
              sceneContainer.style.width = window.innerWidth.toString() + 'px';
              activeScene.innerHTML = '';
              activeScene.classList.toggle('show');
            }, 1000);
            document.querySelector('.menu__back-icon').classList.toggle('hidden');
            activeScene.classList.toggle('active');
            scene1.classList.toggle('active');
            document.querySelector('.menu__selected-item').innerText = '';
            //Show the user-actions container
            document.querySelector('.menu__user-actions').classList.toggle('hidden');
          } else {
            //Else the third scene is active therefore we move the focus to the first scene
            //and clean the content within the third one
            sceneContainer.style.left = '-'+(window.innerWidth).toString()+'px';
            window.setTimeout(function functionName() {
              //Wait 1s to due to the css transition for the left property of sceneContainer
              sceneContainer.style.width = (window.innerWidth*2).toString() + 'px';
              activeScene.innerHTML = '';
              activeScene.classList.toggle('show');
            }, 1000);
            activeScene.classList.toggle('active');
            scene2.classList.toggle('active');
            //Add subproduct's name to the navigation bar
            document.querySelector('.menu__selected-item').innerText = selectedProductItem;
          }
      });
    },

    windowResize:function () {
      var menuTag = document.querySelector('.menu');
      window.addEventListener('resize',function functionName() {
        if (menu.tools.isDesktop()) {
          //Reset inline style for the menu__scene-container
          document.querySelector('.menu__scene-container').style = '';
          menu.tools.cleanSecundariesSceneAndMenuTopBar();
        }
      });
    },

    addEListenerMenuTransitionFinished:function () {
      document.querySelector('.menu').addEventListener('webkitTransitionEnd',function (e) {
        if (e.target.classList.contains('menu') && !e.target.classList.contains('collapsed')) {
          var menuTag = document.querySelector('.menu');
          menuTag.classList.remove('show');
          menu.tools.getSceneContainer().style.width = window.innerWidth+'px';
          menu.tools.cleanSecundariesSceneAndMenuTopBar();
        }
      });
    }
  },

  animation:{

  },

  tools:{
    cleanSecundariesSceneAndMenuTopBar: function () {
      //Reset all secundaries scenes
      var menuTag = document.querySelector('.menu'),
          activeScene = document.querySelector('.active'),
          scene1 = menu.tools.getSceneContainer().querySelector('.scene1'),
          scene2 = menu.tools.getSceneContainer().querySelector('.scene2'),
          scene3 = menu.tools.getSceneContainer().querySelector('.scene3');
      if (!activeScene.classList.contains('scene1')) {
        scene2.innerHTML = '';
        scene3.innerHTML = '';
        menu.tools.getSceneContainer().style.left = '0px';
        scene1.classList.add('active');
        scene2.classList.remove('active');
        scene2.classList.remove('show');
        scene3.classList.remove('active');
        scene3.classList.remove('show');
        document.querySelector('.menu__user-actions').classList.remove('hidden');
      }
      //Reset menu__top-bar's elements
      document.querySelector('.menu__back-icon').classList.add('hidden');
      document.querySelector('.menu__selected-item').innerText = '';
      //Reset collapsed state's menu
      menuTag.classList.remove('collapsed');
    },

    //Singlenton to sceneContainer
    getSceneContainer:function () {
      if (menu.sceneContainer) {
        return menu.sceneContainer;
      } else {
        return document.querySelector('.menu__scene-container');
      }
    },
    isDesktop:function () {
      if (window.innerWidth >= 1200) {
        menu.desktop = true;
      } else {
        menu.desktop = false;
      }
      return menu.desktop;
    }
  }
};

(function () {
  menu.tools.isDesktop();
  menu.eventsDesktop.addEListenerToMenuProductItem();
  menu.eventsDesktop.addEListenerLinkToRelated();
  menu.eventsMovile.addEListenerToNavigationButton();
  menu.eventsMovile.addEListenerToCloseButton();
  menu.eventsMovile.addEListenerToNextButtonFirstScene();
  menu.eventsMovile.addBehaviorToBackButton();
  menu.eventsMovile.windowResize();
  menu.eventsMovile.addEListenerMenuTransitionFinished();
})();

//TODO
//
