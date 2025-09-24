const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

     window.onload = () => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    addBtn.addEventListener("click", () => {
      if (taskInput.value.trim() !== "") {
        createTaskElement(taskInput.value);
        saveTasks();
        taskInput.value = "";
      }
    });

    function createTaskElement(text, completed = false) {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = text;
      if (completed) li.classList.add("completed");

      span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

       const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.classList.add("delete");
      delBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    }

     function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
          text: li.querySelector("span").textContent,
          completed: li.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }



