(function () {
  let dragableItemsContainer = document.querySelector(
    ".dragable-elements-container"
  );
  let selectedDropEffect = document.querySelector(".select-drop-effect");
  let droppableContainer = document.querySelector(".droppable-container");

  for (let index = 0; index < 8; index++) {
    let ele = document.createElement("p");
    ele.classList.add("draggable-field");
    ele.setAttribute("draggable", true);
    ele.setAttribute("id", index);
    ele.innerText = "Item " + index;
    dragableItemsContainer.appendChild(ele);
  }

  let draggableFields = document.querySelectorAll(".draggable-field");

  draggableFields.forEach((element) => {
    element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("application/my-app", event.target.id);
      event.dataTransfer.effectAllowed = selectedDropEffect.value;
      event.target.classList.add("draggable-field-drag-effect");

      var dragImage = new Image();
      dragImage.src = "https://cdn-icons-png.flaticon.com/512/636/636045.png";

      event.dataTransfer.setDragImage(dragImage, 5, 5);
    });
  });

  droppableContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = selectedDropEffect.value;
  });

  droppableContainer.addEventListener("drop", (event) => {
    const data = event.dataTransfer.getData("application/my-app");
    const draggedItem = document.getElementById(data);

    draggedItem.classList.remove("draggable-field-drag-effect");
    draggedItem.classList.add("draggable-field-drop-effect");

    switch (selectedDropEffect.value) {
      case "copy":
        const newNode = draggedItem.cloneNode(true);
        newNode.id = Math.random(1, 5);
        event.target.appendChild(newNode);
        break;
      case "move":
        event.target.appendChild(draggedItem);
        break;
      default:
    }
  });
})();
