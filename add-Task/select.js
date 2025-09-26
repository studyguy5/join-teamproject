


document.addEventListener("DOMContentLoaded", async () => {
  
  initCustomSelects();
  
  document.addEventListener("click", () => closeAllSelects());
});


function initCustomSelects() {
  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".select-trigger"); // button oder input
    let arrowImg = select.querySelector(".assign-img"); // externes img
    const options = select.querySelector(".options");

    if (!trigger || !options) {
      console.warn("Custom select fehlt ein Element:", select);
      return;
    }

    // Falls img innerhalb des Buttons (z.B. Category)
    if (!arrowImg) {
      arrowImg = trigger.querySelector("img");
    }

    setupTrigger(trigger, arrowImg, options, select);
    setupOptions(trigger, options);
  });
}



function setupTrigger(input, arrowImg, options, select) {
  const toggleDropdown = (e) => {
    e.stopPropagation();
    const isOpen = options.style.display === "block";
    closeAllSelects(select);

    if (!isOpen) {
      if (options.id === "contactSelection") {
        renderContactsDropdown(contacts);
      }
      options.style.display = "block";
      toggleArrow(arrowImg, true);
    } else {
      options.style.display = "none";
      toggleArrow(arrowImg, false);
    }
  };

  input.addEventListener("click", toggleDropdown);
  arrowImg.addEventListener("click", toggleDropdown);
}


function setupOptions(trigger, options) {
  options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      if (option.textContent.trim() !== "") {
        if (trigger.tagName.toLowerCase() === "input") {
          trigger.value = option.textContent;
        } else {
          trigger.firstChild.textContent = option.textContent;
        }
        trigger.setAttribute("data-value", option.dataset.value || option.textContent);
      }
      options.style.display = "none";
    });
  });
}


function closeAllSelects(exception) {
  document.querySelectorAll(".custom-select").forEach(select => {
    const options = select.querySelector(".options");
    const arrowImg = select.querySelector(".assign-img") || select.querySelector(".select-trigger img");

    if (!exception || select !== exception) {
      if (options) options.style.display = "none";
      if (arrowImg) toggleArrow(arrowImg, false); // Pfeil zurücksetzen
    }
  });
}



function toggleArrow(img, open) {
  if (!img) return;
  img.src = open 
    ? "../img/icons/arrow_drop_up.svg"
    : "../img/icons/arrow_drop_downaa.svg";
}