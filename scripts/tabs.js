/*!
 * --------------------------------------- START OF LICENSE NOTICE ------------------------------------------------------
 * Copyright (c) 2018 Software Robotics Corporation Limited ("Soroco"). All rights reserved.
 *
 * NO WARRANTY. THE PRODUCT IS PROVIDED BY SOROCO "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL SOROCO BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE PRODUCT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 * ---------------------------------------- END OF LICENSE NOTICE -------------------------------------------------------
 *
 *   Candidate: FULL NAME - <EMAIL ID>
 *   Purpose: Soroco Front-end hands on assignment
 */


 /*
    Function to render existing tab, can be called anywhere in the application with a user object of type { "name": "", "login": }
 */
function renderTab(user){
  if(states.tabsList.length > 1){ // add conditions to support dynamic width of tabs
    // combined width of tabs are more than allowed
    renderSeeMore();
  } else {
    $(".tab-container").children().children().removeClass("active");

    let temp =
    `<div class="src-tab active" onclick="setActiveTab(event); getTabDetails(event.currentTarget.children[0].innerText);">
      <div class="tab-line1">` + user.name + `</div>
      <div class="tab-line2">` + user.login + `</div>
      <i class="material-icons" onclick="closeTab(event)">close</i>
    </div>`;

    $("#dynamic-tabs").append(temp);
    getTabDetails(user.name);
  }
}

/*
   Function to create a new tab and takes values from the input fields on UI
*/
function createTab(){
  let user;
  if ($('#user-name').val() && $('#user-login').val()) {
    user = {
      'name': $('#user-name').val(),
      'login': $('#user-login').val()
    }

    states.tabsList.push(user); // append newly created tab to "tabsList"
    renderTab(user);

    // reset "Add transaction" fields
    $('#user-name').val('');
    $('#user-login').val('');
  }
}

/*
   Function to close a tab
*/
function closeTab(event){
  event.currentTarget.parentNode.parentElement.removeChild(event.currentTarget.parentNode)
  if (!$("#dynamic-tabs").children().length) {
    $(".add-transaction-tab").addClass("active");
    event.stopPropagation();
  }
}

/*
   Function to set a particular tab-heading as active when clicked on it
*/
function setActiveTab(event){
  $(".tab-container").children().children().removeClass("active");

  if (!event) {
    $(".add-transaction-tab").addClass("active");
  } else {
    event.currentTarget.classList.add("active");
  }

  getTabDetails();
}

/*
   Function to fetch/render tab details of particular tab while switching between tabs
*/
function getTabDetails(name){
  if (!name) {
    $("#add-new-entry").css("display", "block");
    $("#employee-details").css("display", "none");
  } else {
    $("#add-new-entry").css("display", "none");
    $("#employee-details").css("display", "block");
    $("#employee-tab-details").text(name);
  }
}


/*
   Function to render See more tabs when the length of tabs is more than 3. Please try to make this based on the screen width available
   and compute the number of tabs to be visible on the screen accordingly.
*/
function renderSeeMore(){
  if($('#more-list').length){
      $('#more-count').text((states.tabsList.length - 1) + ' More');
  } else {
    var temp =
    `<div class = "src-tab" onclick="populateDropdown()" style="vertical-align:bottom;">
      <div id="more-count" class="tab-line1"> ` + (states.tabsList.length - 1) + ` More </div>
      <i class="material-icons">arrow_drop_down</i>
      <div id="more-list"></div> 
    </div>`;

    $('#dynamic-tabs').append(temp);
  }
}

/*
   Function to populate the see more menu dropdown list
*/
function populateDropdown(){
  $('#more-list').html('');
  for (var i = 1; i < states.tabsList.length; i++) {
    let temp =
    `<div class="more-list-item">
      <div class="list-item1">` + states.tabsList[i].name + `</div>
      <div class="list-item2">` + states.tabsList[i].login + `</div>
    </div>`;
    $("#more-list").append(temp);
  }

  toggleDropdown();
}

/*
   Function to show/hide the dropdown list when See more tab is clicked
*/
function toggleDropdown(){
  var e = document.getElementById('more-list');

  if(!e.style.visibility) {
    e.style.visibility = 'visible';
  } else if(e.style.visibility == 'visible') {
    e.style.visibility = 'hidden';
  } else if(e.style.visibility == 'hidden') {
    e.style.visibility = 'visible';
  }
}

/*
   Function to switch to a tab selected from the see more list and set it as the active tab visible on the screen,
  while one of the tabs earlier visible on the screen gets added to the dropdown list
*/
function switchDropdown(){

}
