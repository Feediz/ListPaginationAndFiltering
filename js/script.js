/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

// this will hold all the students info that's inside the ul element
const page = document.querySelector(".page");

// get list of all students on the page
let studentList_ul = document.querySelectorAll(".student-list li");

// this configures how many items to show per page
const itemsPerPage = 5;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    }
  }
};

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
  const createElement = (elementName, property, value, className = "") => {
    const element = document.createElement(elementName);
    if (value !== "") element[property] = value;
    //alert(elementName);
    if (className !== "") {
      element["className"] = className;
      //alert(element.textContent);
    }

    return element;
  };

  // remove pagination first
  let currentPagination = document.querySelector(".pagination");
  if (currentPagination) {
    let childLinkItems = currentPagination.lastElementChild;
    //  while (childLinkItems) {
    //    currentPagination.removeChild(childLinkItems);
    //    childLinkItems = currentPagination.lastElementChild;
    //    //currentPagination.removeChild(currentPagination.firstChild);
    //  }
    currentPagination.parentNode.removeChild(currentPagination);
  } else {
    list = studentList_ul;
  }
  //   console.log(list.length);
  let numPages;
  if (list.length > 0) {
    numPages = Math.ceil(list.length / itemsPerPage);
  } else {
    numPages = Math.ceil(studentList_ul.length / itemsPerPage);
  }

  // create div element
  const div = document.createElement("div");
  div.className = "pagination";
  page.appendChild(div);

  const ul = document.createElement("ul");
  div.appendChild(ul);

  for (let i = 0; i < numPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i + 1;
    if (i === 0) {
      a.className = "active";
    }
    li.appendChild(a);

    // handle page click event
    a.addEventListener("click", e => {
      // show/hide items on the page
      showPage(list, parseInt(e.target.textContent));

      // grab all anchor tags to modify class name
      const anchorTags = document.querySelectorAll("a");
      for (let i = 0; i < anchorTags.length; i++) {
        anchorTags[i].classList.remove("active");
      }
      e.target.className = "active";

      // update h2 title to show page number
      var h2Title = document.getElementsByTagName("h2")[0];
      h2Title.innerHTML = "STUDENTS (Page " + e.target.textContent + ")";
    });
  } // -/end for loop
};

/*
<!-- student search HTML to add dynamically -->
        <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>
        <!-- end search -->
        */
const addSearchFeature = () => {
  // access page header
  const pageHeader = document.querySelector(".page-header");

  // create div element
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  pageHeader.appendChild(searchDiv);

  // create input search box
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";
  searchDiv.appendChild(searchInput);

  // create search button
  // commenting this out as I made the search box filter as you type
  // const searchButton = document.createElement("button");
  //searchButton.textContent = "Search";

  //searchDiv.appendChild(searchButton);

  // handle when search button clicked
  searchInput.addEventListener("input", e => {
    let searchedTerm = searchInput.value;
    let list = studentList_ul;
    let searchResultArray = new Array();

    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
      let studentName = list[i].querySelector("h3").textContent;
      let studentEmail = list[i].querySelector("span").textContent;

      //if (searchedTerm === studentName || searchedTerm === studentEmail) {
      if (
        studentName.includes(searchedTerm) ||
        studentEmail.includes(searchedTerm)
      ) {
        searchResultArray = [list[i]];
        list[i].style.display = "block";
      } else {
        list.innerHTML = "no results";
      }
    } // -//end for
    if (searchResultArray === undefined || searchResultArray.length == 0) {
      list.innerHTML = "no results";
    } else {
      appendPageLinks(searchResultArray);
    }
    //appendPageLinks(studentList_ul);
  });
};

// add search box to dom
addSearchFeature();

// filter items on page when loading first time
showPage(studentList_ul, 1);

// update h2 title to show page number
var h2Title = document.getElementsByTagName("h2")[0];
h2Title.innerHTML = "STUDENTS (page 1)";

// add links to the page
appendPageLinks(studentList_ul);
// Remember to delete the comments that came with this file, and replace them with your own code comments.
