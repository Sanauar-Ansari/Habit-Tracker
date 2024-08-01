document.addEventListener("click", async function (e) {
  console.log(e.target);
  if (e.target.className == "date") {
    let query = e.target.getAttribute("data-date");
    let id = e.target.getAttribute("data-id");
    console.log(query);
    let updatedQuery = query.split("/").join("_");
    let date = { date: query, id: id };
    let data = await fetch(`/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });
   
    let newData = await data.json();
    console.log(newData);

    newData.forEach((element) => {
      // if (element.date == query) {
      //   if (element.complete){
      //     e.target.innerText = "Completed";
      //   }

      //   else e.target.innerText = "Not completed";
      // }
      if (element.date === query) {
        e.target.innerText = element.complete ? "Completed" : "Not completed";

        // Store completion state in local storage using a key with the data-id
        localStorage.setItem(`completedTask`, element.complete.toString());
        console.log(element.complete.toString());
      }
      window.addEventListener("load", function () {
        // if (e.target.className === "date") {
        // Use the same selector as before
        // const elements = document.querySelectorAll(".date"); // Get all date elements

        newData.forEach((element) => {
          // const id = element.getAttribute("data-id");
          const storedCompleted = localStorage.getItem(`completedTask`);
          console.log(storedCompleted);
          if (storedCompleted !== null) {
            element.innerText =
              storedCompleted === false ? "Completed" : "Not completed";
          }
        });
        // }
      });
    });
  }
});
