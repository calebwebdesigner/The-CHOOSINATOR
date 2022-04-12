/* 
copyright © 2022, calebwebdesigner
made by: https://github.com/calebwebdesigner
repo: https://github.com/calebwebdesigner/The-CHOOSINATOR
*/


// about
const about = document.querySelector('#about-link h3');
const aboutPopup = document.querySelector('#about-popup');
const aboutPopupClose = document.querySelector('#about-popup-close');
// heading and stars
const choosinatorTitleContainer = document.querySelector('#choosinator-title');
const choosinatorTitleWord = document.querySelector('#choosinator-title > h1');
const stars = document.querySelectorAll('.stars');
// go!
const goButton = document.querySelector('#go'); // landing page button
let chooserList = ["количество 1", "numero 2", "number 3", "номер 4", "numéro 5"]; // array of list items to choose from (official list being used in this program). these are the set defaults
const chooserItemsDisplayed = document.querySelectorAll('#chooser div');
// popups
const buttons = document.querySelectorAll('#buttons button'); // landing page buttons
console.log(buttons);
const listPopup = document.querySelector('#list-popup');
const listPopupClose = document.querySelector('#list-popup-close');
const listPopupCloseBg = document.querySelector('#list-popup-close-bg');
// edit list
const editListButton = document.querySelector('#edit-list'); // landing page button
const editListForm = document.querySelector('#list-popup form'); // edit list user input form
const editListUserInput = document.getElementById('list-user-input'); // user input from edit list form
const editListSubmitButton = document.querySelector('#edit-list-submit'); // edit list submit button
// upload list
const uploadListButton = document.querySelector('#upload-list'); // landing page button
const uploadListContainer = document.querySelector('#upload-list-container'); // container for all upload list elements on the popup
const uploadedListDisplay = document.querySelector('#upload-list-display ol'); // list shown to user after uploading txt file
const uploadListInput = document.querySelector('#upload-list-input'); // file input element
const uploadListInputButton = document.querySelector('#upload-list-input-button');
const uploadListConfirmButton = document.querySelector('#upload-list-confirm-button');
// show list
const showListButton = document.querySelector('#show-list'); // landing page button
const showListText = document.querySelector('#show-list-display'); // list that's shown to user
// clear list
const clearListButton = document.querySelector('#clear-list'); // landing page button


// open about popup from top on click
about.addEventListener('mousedown', () => {
    if (aboutPopup.style.height != '100%') {
        aboutPopup.style.height = '100%';
    } else {
        aboutPopup.style.height = '0';
    }
});
// close about popup
aboutPopupClose.addEventListener('mousedown', () => {
    aboutPopup.style.height = '0';
});


// stars functionality
let starsIntervals = [];
let starsTimer, currentIntervalId;
// make the stars glow
starsGlowEffect = (star) => {
    if (Math.floor(Math.random() * 10) <= 4) { // blue
        star.style['background-color'] = '#00A6ED';
        star.style.border = '4px solid #00A6ED';
        star.style['box-shadow'] = '0px 0px 32px ' + Math.floor(Math.random() * 10) + 'px #00A6ED'; // create the glow effect with a random radius
    } else { // pink
        star.style['background-color'] = '#EBA4E8';
        star.style.border = '4px solid #EBA4E8';
        star.style['box-shadow'] = '0px 0px 32px ' + Math.floor(Math.random() * 10) + 'px #EBA4E8';
    }
};
// set the intervals on each star
starsGlowStart = (normalSpeed) => {
    starsIntervals.forEach(clearInterval); // clear any previously set intervals on all the stars
    stars.forEach(star => {
        if (normalSpeed) { // randomly change the lighting effect every few hundred ms, normal speed
            starsTimer = Math.floor(Math.random() * 500 + 500);
        } else if (normalSpeed != true) { // 75ms, high speed used when go is clicked
            starsTimer = 75;
        }
        currentIntervalId = setInterval(starsGlowEffect, starsTimer, star); // create setInterval for current star
        starsIntervals.push(currentIntervalId); // and add the id to the intervals array
    });
};


// check if device is a touchy
const isTouch = matchMedia('(hover: none)').matches;

// landing page button cosmetics
buttons.forEach(button => {
    buttonMousedown = () => {
        button.style['background-color'] = '#00A6ED';
        button.style['box-shadow'] = '0 0 8px 0 #00A6ED7d';
        button.style.margin = '2px 6px';
        button.style.padding = '10px 18px';
    };
    buttonMouseout = () => {
        button.style['background-color'] = '#EBA4E8';
        button.style['box-shadow'] = '0 0 16px 0 #00A6ED80';
        button.style.margin = '4px 8px';
        button.style.padding = '8px 16px';
    };
    // set different listeners depending on the device, touch devices act wierd with mouse events
    if (isTouch) {
        button.addEventListener('touchstart', buttonMousedown);
        button.addEventListener('touchend', buttonMouseout);
    } else {
        button.addEventListener('mousedown', buttonMousedown);
        button.addEventListener('mouseout', buttonMouseout);
        button.addEventListener('mouseover', () => {
            button.style['background-color'] = '#00A6ED';
            button.style.margin = '0 4px';
            button.style.padding = '12px 20px';
        });
    }
});


// show popup, all popups use the same base popup
showPopup = () => {
    listPopupCloseBg.style.display = 'block';
    listPopup.style.display = 'block';
};
// close list popup, no matter which list popup it is (showList/editlist/etc.)
closePopup = () => {
    listPopupCloseBg.style.display = 'none';
    listPopup.style.display = 'none';
    editListForm.style.display = 'none';
    uploadListContainer.style.display = 'none';
    uploadedListDisplay.innerHTML = '';
    showListText.style.display = 'none';
};


// update the 5 on-screen chooser items, used when editing the list manually, uploading a text file, clicking go!, or when clearing the list
let userInput;
let randomItem;
updateDisplayedChooserItems = () => {
    if (chooserList.length == 0) { // if the chooserList array is empty (so there's nothing to choose from)
        chooserItemsDisplayed.forEach(item => { // foreach of the 5 displayed chooser divs, display a random value below to let the user know there's nothing on the list
            randomItem = Math.floor(Math.random() * 10);
            if (randomItem <= 3) {
                item.innerHTML = 'null';
            } else if (randomItem <= 6) {
                item.innerHTML = 'undefined';
            } else if (randomItem <= 8) {
                item.innerHTML = 'nothing';
            } else {
                item.innerHTML = 'n@d@';
            }
        });
    } else { // if there is at least 1 value in the chooserList array
        let alreadyDisplayed = []; // reset this array before every run to ensure that items aren't 'blocked' because they were selected in a previous instance
        chooserItemsDisplayed.forEach(item => { // for each of the 5 displayed chooser divs
            randomItem = Math.floor(Math.random() * chooserList.length); // choose random integer from 0-length of chooserList array
            if (chooserList.length >= 5) { // if there are at least 5 items in chooserList array, if there isn't at least 5, then there'll be duplicates to ensure there's always 5 items shown
                while (alreadyDisplayed.includes(randomItem)) { // keep choosing random integer until a new one not previously chosen is selected, ensures no duplicates are shown
                    randomItem = Math.floor(Math.random() * chooserList.length);
                }
                alreadyDisplayed = alreadyDisplayed.concat(randomItem); // add index of item just chosen to be displayed to alreadyDisplayed array, to ensure it isn't displayed again
            }
            item.innerHTML = chooserList[randomItem]; // show the chosen item from chooserList array
        });
    }
};


// cosmetics for buttons within the popups, event is a variable with information about the (i.e mousedown) event
listPopupButtonMouseover = (event) => {
    event.target.style['background-color'] = '#00A6ED';
    event.target.style['box-shadow'] = '0 8px 20px 0 #0e0e0ec5';
};
listPopupButtonMousedown = (event) => {
    if (isTouch) {
        event.target.style['background-color'] = '#00A6ED'; // make the button flash blue when tapped, goes blue on hover if not on touch device
    }
    event.target.style['box-shadow'] = '0 0 8px 0 #00A6ED7d';
};
listPopupButtonMouseout = (event) => {
    event.target.style['background-color'] = '#0e0e0e';
    event.target.style['box-shadow'] = '0 4px 16px 0 #0e0e0ec5';
};


// edit list
editList = () => {
    editListForm.style.display = 'flex';
    editListUserInput.placeholder = 'Type\nup\nyour\nlist\nhere\n.\nJust\nlike\nthis\n.'; // ensure the default message is displayed everytime the popup is opened
};
// edit list submit button
editListSubmitMousedown = () => {
    listPopupButtonMousedown(event); // pass in the event variable from mousedown event listener
    // update chooserList array with user input 
    if (editListUserInput.value.trim() == '') {
        editListUserInput.placeholder = 'You haven\'t typed anything yet!';
        editListUserInput.value = '';
    } else if (editListUserInput.value.trim() != '') {
        userInputArray = editListUserInput.value.split('\n').filter(item => item != ''); // remove any items that are just white-space
        userInputArray = userInputArray.map(item => item.trim()); // trim the white-space from both ends of remaining items
        chooserList = chooserList.concat(userInputArray); // append filtered user input to the end of chooserList
        updateDisplayedChooserItems();
        editListUserInput.value = ''; // empty the array after it's added to the chooserList, so if the user keeps clicking the 'add to list' button it doesn't keep adding to chooserList array
        editListUserInput.placeholder = 'Successfully added to the list!'; // provide confirmation the list is added
    }
};
// set different listeners depending on the device, touch devices act weird with mouse events
if (isTouch) {
    editListSubmitButton.addEventListener('touchstart', editListSubmitMousedown);
    editListSubmitButton.addEventListener('touchend', listPopupButtonMouseout);
} else {
    editListSubmitButton.addEventListener('mouseover', listPopupButtonMouseover);
    editListSubmitButton.addEventListener('mousedown', editListSubmitMousedown);
    editListSubmitButton.addEventListener('mouseout', listPopupButtonMouseout);
}


// upload list
uploadList = () => {
    uploadListContainer.style.display = 'flex';
    uploadedListDisplay.innerHTML = 'Make sure you\'re .txt file is in a list format! (:'; // ensure the default message is displayed everytime the popup is opened
};
// process file once it's uploaded
let uploadedList;
uploadListInput.addEventListener('change', () => {
    if (uploadListInput.files[0].type == 'text/plain') { // bit of file validation, ensures that a ".txt" file is uploaded, nothing else. only reads the file name extension
        let uploadListReader = new FileReader(); // create file reader with which the file will be processed/"read"
        uploadListReader.readAsText(uploadListInput.files[0]); // read the uploaded file
        uploadListReader.onload = () => {
            uploadedList = uploadListReader.result.split('\n').map(item => item.trim()); // take content of file, split on newlines, then remove any trailing whitespace (i.e the \r)
            uploadedListDisplay.innerHTML = ''; // clear list/message that's shown to user
            uploadedList.forEach(item => { // then populate that list with items from text file
                uploadedListDisplay.innerHTML += `<li>${item}</li>`;
            });
        };
    } else {
        uploadedListDisplay.innerHTML = 'Only ".txt" files are allowed!';
    }
});
// upload list confirm button
uploadListConfirmButtonMousedown = () => {
    listPopupButtonMousedown(event); // pass in the event variable from mousedown event listener
    // add list from text file to chooserList
    if (uploadedListDisplay.innerHTML == '' || 
    uploadedListDisplay.innerHTML == 'You haven\'t added a valid text file yet!' || 
    uploadedListDisplay.innerHTML == 'Only ".txt" files are allowed!' ||
    uploadedListDisplay.innerHTML == 'Make sure you\'re .txt file is in a list format! (:') {
        uploadedListDisplay.innerHTML = 'You haven\'t added a valid text file yet!';
    } else if (uploadedList != '') {
        chooserList = chooserList.concat(uploadedList); // add list from text file to chooserList
        updateDisplayedChooserItems();
        uploadedList = ''; // empty the array after it's added to the chooserList, so if the user keeps clicking the confirm button it doesn't keep adding to chooserList
        uploadedListDisplay.innerHTML = 'List from text file added!'; // give user confirmation that the list is updated
    }
};
// set different listeners depending on the device, touch devices act wierd with mouse events
if (isTouch) {
    uploadListInputButton.addEventListener('touchstart', listPopupButtonMousedown);
    uploadListInputButton.addEventListener('touchend', listPopupButtonMouseout);
    uploadListConfirmButton.addEventListener('touchstart', uploadListConfirmButtonMousedown);
    uploadListConfirmButton.addEventListener('touchend', listPopupButtonMouseout);
} else {
    uploadListInputButton.addEventListener('mouseover', listPopupButtonMouseover);
    uploadListInputButton.addEventListener('mousedown', listPopupButtonMousedown);
    uploadListInputButton.addEventListener('mouseout', listPopupButtonMouseout);
    uploadListConfirmButton.addEventListener('mouseover', listPopupButtonMouseover);
    uploadListConfirmButton.addEventListener('mousedown', uploadListConfirmButtonMousedown);
    uploadListConfirmButton.addEventListener('mouseout', listPopupButtonMouseout);
}


// go! button functionality
go = () => {
    let goCheer = new Audio('sounds/cheer.mp3'); // create cheering audio variable, needs to be created each time so if the go is spammed a new audio can play before the previous one ends
    goCheer.volume = 0.8; // make it a tad quieter
    goButton.removeEventListener('mousedown', go); // stop the go button from being spammed while it's already running the go function
    chooserItemsDisplayed[2].classList.remove('the-final-choice'); // remove the glow effect (will be there if go has already been pressed)
    starsGlowStart(false); // start stars glow effect at high speed

    // start the chooser at high speed
    let goTimer = 45;
    let goTimerDelay = 45;
    let goInterval = setInterval(() => {
        goTimer--;
        if (goTimer <= 0) { // stop the chooser on this fast speed once it's cycled 45 times
            clearInterval(goInterval);
        }
        updateDisplayedChooserItems();
        goTimerDelay --; // once delay == 0, then the chooser's slow speed can start
    }, 50);

    // slow down the chooser as it nears completion
    goTimer2FirstTime = true; // used to stop the go timer from being reset every run
    goIntervalTwo = setInterval(() => {
        if (goTimerDelay == 0 && goTimer2FirstTime) {
            goTimer = 12;
            goTimer2FirstTime = false;
        } else if (goTimerDelay == 0) {
            goTimer--;
            if (goTimer == 2) { // get the cheering audio to start a tad early so it syncs up with the final choice being displayed
                goCheer.play();
            }
            if (goTimer == 0) { // stop the chooser and show the final choice! once it's cycled 12 times
                clearInterval(goIntervalTwo);
                setTimeout(() => {
                    chooserItemsDisplayed[2].classList.add('the-final-choice');
                }, 50);
                goButton.addEventListener('mousedown', go); // make the go button function again
                starsGlowStart(true); // start stars glow effect at normal speed
            }
            updateDisplayedChooserItems();
        }
    }, 100);
};


// show list
showList = () => {
    showListText.style.display = 'block';
    if (chooserList.length >= 1) { // only run if there's actually something in the chooserList to show, otherwise leave the "empty ):" message from clearList up (only way there'll be nothing in list)
        showListText.innerHTML = ''; // clear list that's shown to user
        chooserList.forEach(item => { // then repopulate that list, i.e. the list that's shown will be updated to match the chooserList array every time a user clicks "show list"
            showListText.innerHTML += `<li>${item}</li>`;
        });
    }
};


// clear list contents
clearList = () => {
    chooserList = []; // empty list
    showListText.innerHTML = 'empty ):'; // make it clear the list is empty when user clicks show list
    chooserItemsDisplayed[2].classList.remove('the-final-choice'); // remove the glow effect (will be there if go has already been pressed)
    updateDisplayedChooserItems();
};


// event listeners
editListButton.addEventListener('mousedown', showPopup);
editListButton.addEventListener('mousedown', editList);
uploadListButton.addEventListener('mousedown', showPopup);
uploadListButton.addEventListener('mousedown', uploadList);
goButton.addEventListener('mousedown', go);
showListButton.addEventListener('mousedown', showPopup);
showListButton.addEventListener('mousedown', showList);
clearListButton.addEventListener('mousedown', clearList);
// close popup
listPopupCloseBg.addEventListener('mousedown', closePopup); // close by clicking outside of list popup
listPopupClose.addEventListener('mousedown', closePopup); // close via "x"


// onload
starsGlowStart(true); // start stars glow effect at normal speed
