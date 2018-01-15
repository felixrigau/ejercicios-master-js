var menu = {
  selectedProductItem:null,
  selectedSubproductItem:null,
  sceneContainer:null,
  desktop:null,
  behavior:{

    nextButtonFirstScene:function (event){
      var sceneContainer = menu.tools.getSceneContainer(),
          scene1 = sceneContainer.querySelector('.scene1'),
          scene2 = sceneContainer.querySelector('.scene2'),
          itemMenuChilds,
          subMenuList = null;
      //Get all child tags contained in the clicked item
      //*this* equals *event.currentTarget* within the function invoked in a addEventListener()
      itemMenuChilds = this.parentElement.childNodes;
      //Add only the UL tags to the second scene
      for (var i = 0; i < itemMenuChilds.length; i++) {
        if (itemMenuChilds[i].nodeName === 'UL') {
          scene2.appendChild(itemMenuChilds[i].cloneNode(true));
          scene2.lastChild.classList.toggle('show');
        }
      }
      //Add a event listener for each button of the second scene
      menu.events.addEListenerToNextButtonSecondScene(scene2);
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

  events:{
    addEListenerToNavigationButton: function(){
      var navigationButton = document.querySelector('.header__navigation-button'),
          menuTag = document.querySelector('.menu');

      navigationButton.addEventListener('click',function (){
        menuTag.classList.toggle('show');
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
        window.setTimeout(function functionName() {
          //Wait 1s to due to the css transition for the left property of menu
          menuTag.classList.toggle('show');
          menu.tools.getSceneContainer().style.width = window.innerWidth+'px';
        }, 1000);
        var activeScene = document.querySelector('.active'),
            scene1 = menu.tools.getSceneContainer().querySelector('.scene1'),
            scene2 = menu.tools.getSceneContainer().querySelector('.scene2'),
            scene3 = menu.tools.getSceneContainer().querySelector('.scene3');
            document.querySelector('.menu__back-icon').classList.add('hidden');
            document.querySelector('.menu__selected-item').innerText = '';
        if (activeScene.classList.contains('scene1')) {

        } else{
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
        if (window.innerWidth >= 1200) {
          menu.desktop = true;
        } else {
          menu.desktop = false;
          menuTag.style.left = window.innerWidth;
        }
      });
    }
  },

  animation:{

  },

  tools:{
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
        var menuTag = document.querySelector('.menu');
        menuTag.style.left = window.innerWidth+'px';
      }
    }
  }
};

(function () {
  menu.events.addEListenerToNavigationButton();
  menu.events.addEListenerToCloseButton();
  menu.events.addEListenerToNextButtonFirstScene();
  menu.events.addBehaviorToBackButton();
  menu.events.windowResize();
  menu.tools.isDesktop();
})();

//TODO
//problema en active de las scene
