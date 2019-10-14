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

// this will hold list of students
const li = document.querySelectorAll(".student-item");

console.log("scripts.js");
console.log(li);
// how many items to show per page
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

function showPage(list, page) {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (i >= startIndex && i <= endIndex) {
      item.style.display = "block";
      //document.getElementById("pagination").appendChild(item);
      console.log(item);
    } else {
      item.style.display = "none";
    }
  }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  /*
<div class="pagination">
        <ul>
          <li>
            <a class="active" href="#">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
      */

  const div = document.createElement("div");
  div.className = "pagination";

  const ul = document.createElement("ul");
  // inserting ul element inside div
  div.appendChild(ul);

  let numOfLIs = list.length / itemsPerPage;
  numOfLIs = Math.ceil(numOfLIs);

  for (let i = 1; i < numOfLIs; i++) {
    let activeClassName = "";
    if (i == 1) {
      activeClassName = "active";
      // only show the first page at first
      showPage(li, 1);
    } // -/end if
    const newLI = document.createElement("li");
    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", "#");
    anchorElement.className = activeClassName;
    anchorElement.innerHTML = i;
    newLI.appendChild(anchorElement);
    ul.appendChild(newLI);
    document.getElementById("pagination").appendChild(div);
  } // -/end for
} // -/end appendPageLinks function

// set up links
appendPageLinks(li);
/**
const paginationLinkList = document.querySelectorAll(".pagination");

paginationLinkList.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    const clickedIndex = parseInt(e.target.textContent);

    // display requested page
    showPage(li, clickedIndex);
  }
});
**/

// get all a elements inside li's to add event listener
const liItems = document.querySelectorAll("a");
for (let i = 1; i < liItems.length; i++) {
  const aElement = liItems[i];
  aElement.addEventListener("click", e => {
    //aElement.activeClassName = "";
    let clickedIndex = parseInt(e.target.textContent);

    for (let i = 0; i < liItems.length; i++) {
      //alert("i is: " + typeof i + " and clicked is: " + typeof clickedIndex);
      // if (i == clickedIndex) {
      //   // this is the page number requested
      //   // we give the link active class
      //   alert("Clicked: " + clickedIndex + " current: " + i);
      //   e.target.className = "active";
      // } else {
      //   e.target.classList.remove("active");
      // }

      if (e.target.className === "active") {
        e.target.classList.remove("active");
      }
    }

    //document.getElementById("pagination").appendChild(aElement);
    showPage(li, e.target.textContent);
  });
} // -/end for

// Remember to delete the comments that came with this file, and replace them with your own code comments.
