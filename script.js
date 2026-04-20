const storageKey = "scheduleMakerStateV7";

let employees = [
  {
    name: "Mike Sedillo",
    keyType: "B",
    idNumber: "2323",
    drawerNumber: "5v",
    roles: ["T", "FSC"],
    leadEligible: true,
    fixedDayOff: "Monday",
    saturdayGroup: 1,
  },
  {
    name: "Storm Anaya-Gonzales",
    keyType: "A",
    idNumber: "1985",
    drawerNumber: "10v",
    roles: ["T", "FSC", "IRA", "B", "ADV", "L"],
    leadEligible: true,
    fixedDayOff: "Tuesday",
    saturdayGroup: 2,
  },
  {
    name: "Valentina Aragon",
    keyType: "B",
    idNumber: "1983",
    drawerNumber: "1",
    roles: ["T", "FSC", "IRA", "L", "A", "B"],
    leadEligible: true,
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
  },
  {
    name: "Rose Manassara",
    keyType: "A",
    idNumber: "2329",
    drawerNumber: "8v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    fixedDayOff: "Thursday",
    saturdayGroup: 2,
  },
  {
    name: "Joaquin Garcia",
    keyType: "B",
    idNumber: "2199",
    drawerNumber: "2",
    roles: ["T", "FSC", "IRA", "L", "A", "B"],
    leadEligible: true,
    fixedDayOff: "Friday",
    saturdayGroup: 1,
  },
  {
    name: "Rudy Yanez",
    keyType: "B",
    idNumber: "2338",
    drawerNumber: "9v",
    roles: ["T", "FSC", "IRA", "B", "ADV", "L"],
    leadEligible: false,
    fixedDayOff: "Monday",
    saturdayGroup: 2,
  },
  {
    name: "Santiago Martinez",
    keyType: "A",
    idNumber: "2344",
    drawerNumber: "7v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    fixedDayOff: "Tuesday",
    saturdayGroup: 1,
  },
  {
    name: "Rodrigo Chavez",
    keyType: "A",
    idNumber: "2358",
    drawerNumber: "11v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
  },
  {
    name: "Matthew Gutierrez",
    keyType: "B",
    idNumber: "2357",
    drawerNumber: "12v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    fixedDayOff: "Thursday",
    saturdayGroup: 1,
  },
  {
    name: "Christany Silva",
    keyType: "A",
    idNumber: "",
    drawerNumber: "6v",
    roles: ["T", "FSC"],
    leadEligible: false,
    fixedDayOff: "Friday",
    saturdayGroup: 2,
  },
  {
    name: "Laura Witkoffsky Gutierrez",
    keyType: "B",
    idNumber: "",
    drawerNumber: "13v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    fixedDayOff: "Monday",
    saturdayGroup: 1,
  },
];

const customShiftValue = "__CUSTOM_SHIFT__";
const shiftPresets = ["8:00-6:00", "8:30-6:00", "8:00-5:30", "8:30-5:30", "8:00-5:00", "8:30-5:00", "9:00-5:00", "9:00-6:00", "8:30-1:30", "OFF", "PTO", customShiftValue];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const saturdayShift = "8:30-1:30";
const taskConfig = {
  opener: { label: "Opener", dailyRequired: 0 },
  nightDrop: { label: "Night Drop", dailyRequired: 2 },
  driveThru: { label: "Drive Thru", dailyRequired: 1 },
  auditVault: { label: "Audit Vault", dailyRequired: 0 },
};
const dayEvents = {
  Monday: { text: "", color: "none" },
  Tuesday: { text: "", color: "none" },
  Wednesday: { text: "", color: "none" },
  Thursday: { text: "", color: "none" },
  Friday: { text: "", color: "none" },
  Saturday: { text: "", color: "none" },
};
const eventColors = [
  { value: "none", label: "No color" },
  { value: "yellow", label: "Yellow" },
  { value: "pink", label: "Pink" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "gray", label: "Gray" },
];
const leadEligibleNames = new Set([
  "Mike Sedillo",
  "Storm Anaya-Gonzales",
  "Valentina Aragon",
  "Joaquin Garcia",
]);

const state = {
  currentWeekType: "Week A",
  weekStart: getMonday(new Date()),
  assignments: {},
};

const weekStartInput = document.querySelector("#weekStart");
const weekTypeInput = document.querySelector("#weekType");
const scheduleTitle = document.querySelector("#scheduleTitle");
const scheduleRange = document.querySelector("#scheduleRange");
const scheduleHead = document.querySelector("#scheduleHead");
const scheduleBody = document.querySelector("#scheduleBody");
const coverageSummary = document.querySelector("#coverageSummary");
const cellTemplate = document.querySelector("#employeeCellTemplate");
const resetTasksButton = document.querySelector("#resetTasks");
const resetScheduleButton = document.querySelector("#resetSchedule");
const schedule40Button = document.querySelector("#schedule40");
const employeeForm = document.querySelector("#employeeForm");
const employeeRoster = document.querySelector("#employeeRoster");
const toggleEmployeeFormButton = document.querySelector("#toggleEmployeeForm");
const cancelEmployeeEditButton = document.querySelector("#cancelEmployeeEdit");
const employeeNameInput = document.querySelector("#employeeName");
const employeeKeyTypeInput = document.querySelector("#employeeKeyType");
const employeeIdNumberInput = document.querySelector("#employeeIdNumber");
const employeeDrawerNumberInput = document.querySelector("#employeeDrawerNumber");
const employeeRoleOptions = Array.from(document.querySelectorAll(".employee-role-option"));
const employeeLeadEligibleInput = document.querySelector("#employeeLeadEligible");
const employeeCustomRolesInput = document.querySelector("#employeeCustomRoles");
const employeeFixedDayOffInput = document.querySelector("#employeeFixedDayOff");
const employeeSaturdayGroupInput = document.querySelector("#employeeSaturdayGroup");
const confirmModal = document.querySelector("#confirmModal");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmMessage = document.querySelector("#confirmMessage");
const confirmCancelButton = document.querySelector("#confirmCancel");
const confirmAcceptButton = document.querySelector("#confirmAccept");
const customShiftModal = document.querySelector("#customShiftModal");
const customShiftInput = document.querySelector("#customShiftInput");
const customShiftError = document.querySelector("#customShiftError");
const customShiftCancelButton = document.querySelector("#customShiftCancel");
const customShiftAcceptButton = document.querySelector("#customShiftAccept");

initialize();

function initialize() {
  loadSavedState();
  weekStartInput.value = formatDateInput(state.weekStart);
  weekTypeInput.value = state.currentWeekType;
  populateDayOffOptions();
  resetEmployeeForm();
  buildDefaultAssignments({ preserveAssignments: true });
  bindEvents();
  render();
}

function bindEvents() {
  weekStartInput.addEventListener("change", async (event) => {
    const accepted = await askForConfirmation({
      title: "Change Week Start?",
      message: "This will rebuild the visible week and reset the schedule cells to their default shifts.",
      actionLabel: "Change Week",
    });
    if (!accepted) {
      event.target.value = formatDateInput(state.weekStart);
      return;
    }

    state.weekStart = getMonday(new Date(`${event.target.value}T12:00:00`));
    buildDefaultAssignments({ preserveAssignments: false });
    saveSchedule();
    render();
  });

  weekTypeInput.addEventListener("change", async (event) => {
    const accepted = await askForConfirmation({
      title: "Change Week Type?",
      message: "This will rebuild the Saturday rotation and reset the schedule cells to their default shifts.",
      actionLabel: "Update Rotation",
    });
    if (!accepted) {
      event.target.value = state.currentWeekType;
      return;
    }

    state.currentWeekType = event.target.value;
    buildDefaultAssignments({ preserveAssignments: false });
    saveSchedule();
    render();
  });

  resetTasksButton.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Reset Task Toggles?",
      message: "This clears Lead, Opener, Night Drop, Drive Thru, and Audit Vault selections but keeps shifts and notes.",
      actionLabel: "Reset Tasks",
    });
    if (!accepted) {
      return;
    }

    resetTaskToggles();
    saveSchedule();
    render();
  });

  resetScheduleButton.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Reset Schedule?",
      message: "This rebuilds the schedule from the current employees, Week A/B rotation, and fixed days off. Notes and task selections will be cleared.",
      actionLabel: "Reset Schedule",
      danger: true,
    });
    if (!accepted) {
      return;
    }

    buildDefaultAssignments({ preserveAssignments: false });
    saveSchedule();
    render();
  });

  schedule40Button.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Schedule Everyone To 40 Hours?",
      message: "This will update shifts to total 40 hours per employee where possible. Existing notes and task selections will stay.",
      actionLabel: "Schedule 40 Hours",
    });
    if (!accepted) {
      return;
    }

    scheduleEmployeesTo40Hours();
    saveSchedule();
    render();
  });

  toggleEmployeeFormButton.addEventListener("click", () => {
    const employeeId = employeeForm.dataset.editingId || "";
    toggleEmployeeForm(employeeForm.classList.contains("is-hidden"), employeeId);
  });

  cancelEmployeeEditButton.addEventListener("click", () => {
    resetEmployeeForm();
  });

  employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEmployee();
  });
}

function buildDefaultAssignments({ preserveAssignments = true } = {}) {
  const saturdayWorkingGroup = state.currentWeekType === "Week A" ? 1 : 2;
  const previousAssignments = preserveAssignments ? state.assignments : {};
  state.assignments = {};

  employees.forEach((employee) => {
    state.assignments[employee.idNumber] = {};

    weekDays.forEach((day) => {
      const workingSaturday = employee.saturdayGroup === saturdayWorkingGroup;
      const shift = getDefaultShift(employee, day, workingSaturday);
      const priorAssignment = previousAssignments[employee.idNumber]?.[day];
      state.assignments[employee.idNumber][day] = {
        shift: priorAssignment?.shift ?? shift,
        note: priorAssignment?.note ?? "",
        noteColor: priorAssignment?.noteColor ?? "none",
        tasks: priorAssignment?.tasks ?? {
          lead: false,
          opener: false,
          nightDrop: false,
          driveThru: false,
          auditVault: false,
        },
      };

      if (state.assignments[employee.idNumber][day].tasks.lead === undefined) {
        state.assignments[employee.idNumber][day].tasks.lead = false;
      }
      if (state.assignments[employee.idNumber][day].tasks.opener === undefined) {
        state.assignments[employee.idNumber][day].tasks.opener = false;
      }

      if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(state.assignments[employee.idNumber][day].shift)) {
        state.assignments[employee.idNumber][day].shift = shift;
      }
    });
  });
}

function getDefaultShift(employee, day, workingSaturday) {
  if (day === "Saturday") {
    return workingSaturday ? saturdayShift : "OFF";
  }

  if (workingSaturday && day === employee.fixedDayOff) {
    return "OFF";
  }

  return employee.keyType === "A" ? "8:00-5:00" : "8:30-6:00";
}

function render() {
  const dates = weekDays.map((_, index) => addDays(state.weekStart, index));
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(state.weekStart);

  scheduleTitle.textContent = `${monthLabel} Schedule`;
  scheduleRange.textContent = `${state.currentWeekType} • ${formatLongDate(dates[0])} - ${formatLongDate(dates[5])}`;

  renderHeader(dates);
  renderBody();
  renderCoverage();
  renderEmployeeRoster();
}

function renderHeader(dates) {
  scheduleHead.innerHTML = "";
  const row = document.createElement("tr");
  const employeeHead = document.createElement("th");
  employeeHead.className = "employee-head";
  employeeHead.textContent = "Employee";
  row.appendChild(employeeHead);

  dates.forEach((date, index) => {
    const th = document.createElement("th");
    const dayWrap = document.createElement("div");
    dayWrap.className = "day-heading";
    const dayName = weekDays[index];
    const dayEvent = dayEvents[dayName];
    dayWrap.innerHTML = `
      <span>${dayName}</span>
      <span class="date">${date.getDate()}</span>
    `;
    const eventTools = document.createElement("div");
    eventTools.className = `event-tools${dayEvent.text ? " has-event" : ""}${dayEvent.color !== "none" ? " has-color" : ""}`;
    const eventInput = document.createElement("input");
    eventInput.type = "text";
    eventInput.className = getEventInputClass(dayEvent.color);
    eventInput.value = dayEvent.text;
    eventInput.placeholder = "Add event";
    eventInput.addEventListener("input", (event) => {
      dayEvents[dayName].text = event.target.value;
      eventTools.classList.toggle("has-event", Boolean(event.target.value.trim()));
      saveSchedule();
    });

    const colorSelect = document.createElement("select");
    colorSelect.className = "event-color-select";
    eventColors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color.value;
      option.textContent = color.label;
      colorSelect.appendChild(option);
    });
    colorSelect.value = dayEvent.color;
    colorSelect.addEventListener("change", (event) => {
      dayEvents[dayName].color = event.target.value;
      eventInput.className = getEventInputClass(event.target.value);
      eventTools.classList.toggle("has-color", event.target.value !== "none");
      saveSchedule();
    });

    eventTools.appendChild(eventInput);
    eventTools.appendChild(colorSelect);
    dayWrap.appendChild(eventTools);
    th.appendChild(dayWrap);
    row.appendChild(th);
  });

  scheduleHead.appendChild(row);
}

function renderBody() {
  scheduleBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.appendChild(buildEmployeeInfoCell(employee));

    weekDays.forEach((day) => {
      const cell = cellTemplate.content.firstElementChild.cloneNode(true);
      const assignment = state.assignments[employee.idNumber][day];
      const select = cell.querySelector(".shift-select");
      const notes = cell.querySelector(".cell-notes");
      const noteInput = cell.querySelector(".cell-note-input");
      const noteColorSelect = cell.querySelector(".note-color-select");
      const taskEditor = cell.querySelector(".task-editor");
      const taskEditorButton = cell.querySelector(".task-editor-button");
      const taskDoneButton = cell.querySelector(".task-done-button");
      const toggles = Array.from(cell.querySelectorAll(".task-toggle"));
      const openEditorKey = `${employee.idNumber}-${day}`;

      shiftPresets.forEach((preset) => {
        const option = document.createElement("option");
        option.value = preset;
        option.textContent = getShiftOptionLabel(preset);
        select.appendChild(option);
      });

      if (!shiftPresets.includes(assignment.shift)) {
        const customOption = document.createElement("option");
        customOption.value = assignment.shift;
        customOption.textContent = assignment.shift;
        select.insertBefore(customOption, select.querySelector(`option[value="${customShiftValue}"]`));
      }

      if (day === "Saturday") {
        select.querySelectorAll("option").forEach((option) => {
          if (!["OFF", saturdayShift, "PTO"].includes(option.value) && option.value !== assignment.shift) {
            option.disabled = true;
          }
        });
      }

      select.value = assignment.shift;
      select.addEventListener("change", async (event) => {
        if (day === "Saturday" && event.target.value === customShiftValue) {
          event.target.value = assignment.shift;
          return;
        }

        if (event.target.value === customShiftValue) {
          const customShift = await askForCustomShift(assignment.shift);
          if (!customShift) {
            event.target.value = assignment.shift;
            return;
          }
          assignment.shift = customShift;
          saveSchedule();
          render();
          return;
        }

        if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(event.target.value)) {
          event.target.value = assignment.shift;
          return;
        }

        assignment.shift = event.target.value;
        if (["OFF", "PTO"].includes(assignment.shift)) {
          assignment.tasks = {
            lead: false,
            opener: false,
            nightDrop: false,
            driveThru: false,
            auditVault: false,
          };
        }
        saveSchedule();
        render();
      });

      noteInput.value = assignment.note;
      assignment.noteColor ??= "none";
      noteInput.className = getNoteInputClass(assignment.noteColor);
      noteInput.disabled = false;
      noteInput.placeholder =
        assignment.shift === "OFF"
          ? "Optional off note"
          : assignment.shift === "PTO"
            ? "Optional PTO note"
            : "Add note";
      noteInput.addEventListener("input", (event) => {
        assignment.note = event.target.value;
        saveSchedule();
      });

      eventColors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color.value;
        option.textContent = color.label;
        noteColorSelect.appendChild(option);
      });
      noteColorSelect.value = assignment.noteColor;
      noteColorSelect.addEventListener("change", (event) => {
        assignment.noteColor = event.target.value;
        noteInput.className = getNoteInputClass(event.target.value);
        saveSchedule();
      });

      taskEditor.classList.toggle("is-open", state.openTaskEditor === openEditorKey);
      taskEditorButton.addEventListener("click", () => {
        state.openTaskEditor = state.openTaskEditor === openEditorKey ? "" : openEditorKey;
        render();
      });
      taskDoneButton.addEventListener("click", () => {
        state.openTaskEditor = "";
        render();
      });

      toggles.forEach((toggle) => {
        const checkbox = toggle.querySelector("input");
        const taskName = checkbox.dataset.task;
        checkbox.checked = assignment.tasks[taskName];
        toggle.classList.toggle("is-active", assignment.tasks[taskName]);
        toggle.classList.toggle("is-disabled", ["OFF", "PTO"].includes(assignment.shift));
        checkbox.disabled = ["OFF", "PTO"].includes(assignment.shift);
        checkbox.addEventListener("change", () => {
          if (["OFF", "PTO"].includes(assignment.shift)) {
            return;
          }

          assignment.tasks[taskName] = checkbox.checked;
          state.openTaskEditor = openEditorKey;
          saveSchedule();
          render();
        });
      });

      const activeTaskCount = Object.values(assignment.tasks).filter(Boolean).length;
      taskEditor.classList.toggle("has-tasks", activeTaskCount > 0);
      taskEditorButton.textContent = "Tasks";
      cell.classList.toggle("is-off", assignment.shift === "OFF");
      cell.classList.toggle("is-pto", assignment.shift === "PTO");
      appendCellNotes(notes, employee, day, assignment);
      row.appendChild(cell);
    });

    scheduleBody.appendChild(row);
  });
}

function buildEmployeeInfoCell(employee) {
  const cell = document.createElement("th");
  cell.scope = "row";
  cell.className = "employee-info";
  const scheduledHours = getEmployeeScheduledHours(employee);
  const leadBadge = isLeadEligible(employee)
    ? `<span class="badge badge-lead">Lead Eligible</span>`
    : "";

  cell.innerHTML = `
    <strong>${employee.name}</strong>
    <div class="meta-line">
      <span class="badge">${employee.keyType} Key</span>
      <span class="badge">ID ${employee.idNumber}</span>
      <span class="badge">Drawer ${employee.drawerNumber || "N/A"}</span>
      <span class="badge badge-saturday">Group ${employee.saturdayGroup}</span>
      <span class="badge hours-badge">${formatHours(scheduledHours)} hrs</span>
      ${leadBadge}
    </div>
    <div class="roles-line">${employee.roles.join(", ")}</div>
  `;

  return cell;
}

function appendCellNotes(notesRoot, employee, day, assignment) {
  if (assignment.shift === "OFF") {
    const offTag = document.createElement("span");
    offTag.className = "note-pill off-note";
    offTag.textContent =
      day === "Saturday"
        ? "Saturday OFF"
        : day === employee.fixedDayOff &&
          employee.saturdayGroup === (state.currentWeekType === "Week A" ? 1 : 2)
          ? "Fixed day off"
          : "OFF";
    notesRoot.appendChild(offTag);
    return;
  }

  if (assignment.shift === "PTO") {
    const ptoTag = document.createElement("span");
    ptoTag.className = "note-pill pto-note";
    ptoTag.textContent = "PTO";
    notesRoot.appendChild(ptoTag);
    return;
  }

  if (assignment.tasks.lead) {
    const leadTag = document.createElement("span");
    leadTag.className = "note-pill lead-note";
    leadTag.textContent = day === "Saturday" ? "Closing Lead" : "Lead";
    notesRoot.appendChild(leadTag);
  }

  Object.entries(assignment.tasks).forEach(([taskName, isActive]) => {
    if (taskName === "lead" || !isActive) {
      return;
    }
    const note = document.createElement("span");
    note.className =
      taskName === "auditVault"
        ? "note-pill audit-note"
        : taskName === "opener"
          ? "note-pill opener-note"
        : taskName === "driveThru"
          ? "note-pill info-note"
          : "note-pill";
    note.textContent = taskConfig[taskName].label;
    notesRoot.appendChild(note);
  });

}

function renderCoverage() {
  coverageSummary.innerHTML = "";

  weekDays.forEach((day) => {
    const totals = employees.reduce(
      (summary, employee) => {
        const assignment = state.assignments[employee.idNumber][day];
        if (!["OFF", "PTO"].includes(assignment.shift)) {
          summary.staffed += 1;
        }

        Object.keys(taskConfig).forEach((taskName) => {
          if (assignment.tasks[taskName]) {
            summary[taskName] += 1;
          }
        });

        return summary;
      },
      {
        staffed: 0,
        opener: 0,
        nightDrop: 0,
        driveThru: 0,
        auditVault: 0,
      }
    );

    const openerWarning =
      totals.opener > 0 && hasOpenerCoverageIssue(day)
        ? `<div class="coverage-warning">Opener needs another person scheduled</div>`
        : "";
    const card = document.createElement("article");
    card.className = "coverage-item";
    card.innerHTML = `
      <strong>${day}</strong>
      <div>Staffed: ${totals.staffed}</div>
      <div>Opener: ${totals.opener}</div>
      <div>Night Drop: ${totals.nightDrop}/2</div>
      <div>Drive Thru: ${totals.driveThru}/1</div>
      <div>Audit Vault: ${totals.auditVault}</div>
      ${openerWarning}
    `;
    coverageSummary.appendChild(card);
  });
}

function hasOpenerCoverageIssue(day) {
  return employees.some((employee) => {
    const openerAssignment = state.assignments[employee.idNumber][day];
    if (!openerAssignment?.tasks.opener || ["OFF", "PTO"].includes(openerAssignment.shift)) {
      return false;
    }

    const openerStart = getShiftStart(openerAssignment.shift);
    if (openerStart === null) {
      return true;
    }

    return !employees.some((otherEmployee) => {
      if (otherEmployee.idNumber === employee.idNumber) {
        return false;
      }

      const otherAssignment = state.assignments[otherEmployee.idNumber][day];
      return shiftCoversTime(otherAssignment?.shift, openerStart);
    });
  });
}

function renderEmployeeRoster() {
  employeeRoster.innerHTML = "";

  employees.forEach((employee) => {
    const card = document.createElement("article");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${employee.name}</strong>
      <p>${employee.keyType} Key • ID ${employee.idNumber || "N/A"} • Drawer ${employee.drawerNumber || "N/A"}</p>
      <p>Roles: ${employee.roles.join(", ")}</p>
      <p>Fixed Day Off: ${employee.fixedDayOff} • Saturday Group ${employee.saturdayGroup}</p>
      <div class="employee-card-actions">
        <button type="button" data-action="edit">Edit</button>
        <button type="button" class="secondary-button" data-action="remove">Remove</button>
      </div>
    `;

    card.querySelector('[data-action="edit"]').addEventListener("click", () => {
      loadEmployeeIntoForm(employee);
    });

    card.querySelector('[data-action="remove"]').addEventListener("click", () => {
      removeEmployee(employee.idNumber);
    });

    employeeRoster.appendChild(card);
  });
}

function populateDayOffOptions() {
  employeeFixedDayOffInput.innerHTML = "";
  weekDays.slice(0, 5).forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    employeeFixedDayOffInput.appendChild(option);
  });
}

function toggleEmployeeForm(isOpen, employeeId = "") {
  employeeForm.classList.toggle("is-hidden", !isOpen);
  toggleEmployeeFormButton.textContent = isOpen
    ? employeeId
      ? "Editing Employee"
      : "Hide Form"
    : "Add Employee";
}

function resetEmployeeForm() {
  employeeForm.reset();
  employeeForm.dataset.editingId = "";
  employeeRoleOptions.forEach((option) => {
    option.checked = ["T", "FSC"].includes(option.value);
  });
  employeeLeadEligibleInput.checked = false;
  employeeCustomRolesInput.value = "";
  employeeDrawerNumberInput.value = "";
  employeeFixedDayOffInput.value = "Monday";
  employeeSaturdayGroupInput.value = "1";
  employeeKeyTypeInput.value = "A";
  toggleEmployeeForm(false);
}

function loadEmployeeIntoForm(employee) {
  employeeNameInput.value = employee.name;
  employeeKeyTypeInput.value = employee.keyType;
  employeeIdNumberInput.value = employee.idNumber;
  employeeDrawerNumberInput.value = employee.drawerNumber || "";
  employeeRoleOptions.forEach((option) => {
    option.checked = employee.roles.includes(option.value);
  });
  employeeLeadEligibleInput.checked = isLeadEligible(employee);
  employeeCustomRolesInput.value = employee.roles
    .filter((role) => !employeeRoleOptions.some((option) => option.value === role))
    .join(", ");
  employeeFixedDayOffInput.value = employee.fixedDayOff;
  employeeSaturdayGroupInput.value = String(employee.saturdayGroup);
  employeeForm.dataset.editingId = employee.idNumber;
  toggleEmployeeForm(true, employee.idNumber);
}

function saveEmployee() {
  const name = employeeNameInput.value.trim();
  const keyType = employeeKeyTypeInput.value;
  const idNumber = employeeIdNumberInput.value.trim();
  const drawerNumber = employeeDrawerNumberInput.value.trim();
  const selectedRoles = employeeRoleOptions
    .filter((option) => option.checked)
    .map((option) => option.value);
  const customRoles = employeeCustomRolesInput.value
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
  const roles = [...new Set([...selectedRoles, ...customRoles])];
  const leadEligible = employeeLeadEligibleInput.checked;
  const fixedDayOff = employeeFixedDayOffInput.value;
  const saturdayGroup = Number(employeeSaturdayGroupInput.value);
  const editingId = employeeForm.dataset.editingId;

  if (!name || roles.length === 0) {
    return;
  }

  const duplicate = idNumber
    ? employees.find((employee) => employee.idNumber === idNumber && employee.idNumber !== editingId)
    : null;
  if (duplicate) {
    return;
  }

  const employeeRecord = { name, keyType, idNumber, drawerNumber, roles, leadEligible, fixedDayOff, saturdayGroup };
  const existingIndex = employees.findIndex((employee) => employee.idNumber === editingId);

  if (existingIndex >= 0) {
    employees.splice(existingIndex, 1, employeeRecord);
    if (editingId !== idNumber) {
      state.assignments[idNumber] = state.assignments[editingId];
      delete state.assignments[editingId];
    }
  } else {
    employees.push(employeeRecord);
  }

  buildDefaultAssignments({ preserveAssignments: true });
  saveSchedule();
  render();
  resetEmployeeForm();
}

async function removeEmployee(idNumber) {
  const accepted = await askForConfirmation({
    title: "Remove Employee?",
    message: "This removes the employee and their current schedule row.",
    actionLabel: "Remove Employee",
    danger: true,
  });
  if (!accepted) {
    return;
  }

  const index = employees.findIndex((employee) => employee.idNumber === idNumber);
  if (index < 0) {
    return;
  }

  employees.splice(index, 1);
  delete state.assignments[idNumber];
  saveSchedule();
  render();
}

function resetTaskToggles() {
  employees.forEach((employee) => {
    weekDays.forEach((day) => {
      state.assignments[employee.idNumber][day].tasks = {
        lead: false,
        opener: false,
        nightDrop: false,
        driveThru: false,
        auditVault: false,
      };
    });
  });
}

function scheduleEmployeesTo40Hours() {
  const saturdayWorkingGroup = state.currentWeekType === "Week A" ? 1 : 2;

  employees.forEach((employee) => {
    const worksSaturday = employee.saturdayGroup === saturdayWorkingGroup;
    let longWeekdayCount = 0;

    weekDays.forEach((day) => {
      const assignment = state.assignments[employee.idNumber][day];

      if (day === "Saturday") {
        assignment.shift = worksSaturday ? saturdayShift : "OFF";
      } else if (worksSaturday && day === employee.fixedDayOff) {
        assignment.shift = "OFF";
      } else if (worksSaturday) {
        assignment.shift = longWeekdayCount < 2 ? "8:00-6:00" : "8:30-6:00";
        longWeekdayCount += 1;
      } else {
        assignment.shift = "8:00-5:00";
      }

      if (["OFF", "PTO"].includes(assignment.shift)) {
        assignment.tasks = {
          lead: false,
          opener: false,
          nightDrop: false,
          driveThru: false,
          auditVault: false,
        };
      }
    });
  });
}

function getEmployeeScheduledHours(employee) {
  return weekDays.reduce((total, day) => {
    const assignment = state.assignments[employee.idNumber]?.[day];
    return total + getShiftHours(assignment?.shift);
  }, 0);
}

function getShiftHours(shift) {
  if (!shift || ["OFF", "PTO"].includes(shift)) {
    return 0;
  }

  const [start, end] = shift.split("-");
  const startMinutes = parseShiftTime(start);
  const endMinutes = parseShiftTime(end);
  if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
    return 0;
  }

  const rawHours = (endMinutes - startMinutes) / 60;
  return rawHours >= 6 ? rawHours - 1 : rawHours;
}

function parseShiftTime(time) {
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 1 || hours > 12 || minutes > 59) {
    return null;
  }
  if (hours < 7) {
    hours += 12;
  }

  return hours * 60 + minutes;
}

function isShiftTime(shift) {
  if (!shift || !shift.includes("-")) {
    return false;
  }

  const [start, end] = shift.split("-");
  const startMinutes = parseShiftTime(start);
  const endMinutes = parseShiftTime(end);
  return startMinutes !== null && endMinutes !== null && endMinutes > startMinutes;
}

function getShiftStart(shift) {
  if (!shift || ["OFF", "PTO"].includes(shift) || !shift.includes("-")) {
    return null;
  }

  return parseShiftTime(shift.split("-")[0]);
}

function shiftCoversTime(shift, targetMinutes) {
  if (!shift || ["OFF", "PTO"].includes(shift) || !shift.includes("-")) {
    return false;
  }

  const [start, end] = shift.split("-");
  const startMinutes = parseShiftTime(start);
  const endMinutes = parseShiftTime(end);
  return startMinutes !== null && endMinutes !== null && startMinutes <= targetMinutes && endMinutes > targetMinutes;
}

function isLeadEligible(employee) {
  return employee.leadEligible === true || leadEligibleNames.has(employee.name);
}

function formatHours(hours) {
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

function getShiftOptionLabel(preset) {
  return preset === customShiftValue ? "Custom..." : preset;
}

function askForConfirmation({ title, message, actionLabel = "Continue", danger = false }) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmAcceptButton.textContent = actionLabel;
  confirmAcceptButton.classList.toggle("danger-button", danger);
  confirmModal.classList.remove("is-hidden");
  confirmCancelButton.focus();

  return new Promise((resolve) => {
    const cleanup = (answer) => {
      confirmModal.classList.add("is-hidden");
      confirmAcceptButton.classList.remove("danger-button");
      confirmCancelButton.removeEventListener("click", onCancel);
      confirmAcceptButton.removeEventListener("click", onAccept);
      confirmModal.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKeydown);
      resolve(answer);
    };

    const onCancel = () => cleanup(false);
    const onAccept = () => cleanup(true);
    const onBackdrop = (event) => {
      if (event.target === confirmModal) {
        cleanup(false);
      }
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") {
        cleanup(false);
      }
    };

    confirmCancelButton.addEventListener("click", onCancel);
    confirmAcceptButton.addEventListener("click", onAccept);
    confirmModal.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKeydown);
  });
}

function askForCustomShift(currentShift = "") {
  customShiftInput.value = isShiftTime(currentShift) ? currentShift : "";
  customShiftError.textContent = "";
  customShiftModal.classList.remove("is-hidden");
  customShiftInput.focus();

  return new Promise((resolve) => {
    const cleanup = (value) => {
      customShiftModal.classList.add("is-hidden");
      customShiftCancelButton.removeEventListener("click", onCancel);
      customShiftAcceptButton.removeEventListener("click", onAccept);
      customShiftModal.removeEventListener("click", onBackdrop);
      customShiftInput.removeEventListener("keydown", onInputKeydown);
      document.removeEventListener("keydown", onDocumentKeydown);
      resolve(value);
    };

    const onCancel = () => cleanup("");
    const onAccept = () => {
      const shift = customShiftInput.value.trim();
      if (!isShiftTime(shift)) {
        customShiftError.textContent = "Enter a valid shift like 8:00-5:30.";
        return;
      }
      cleanup(shift);
    };
    const onBackdrop = (event) => {
      if (event.target === customShiftModal) {
        cleanup("");
      }
    };
    const onInputKeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onAccept();
      }
    };
    const onDocumentKeydown = (event) => {
      if (event.key === "Escape") {
        cleanup("");
      }
    };

    customShiftCancelButton.addEventListener("click", onCancel);
    customShiftAcceptButton.addEventListener("click", onAccept);
    customShiftModal.addEventListener("click", onBackdrop);
    customShiftInput.addEventListener("keydown", onInputKeydown);
    document.addEventListener("keydown", onDocumentKeydown);
  });
}

function saveSchedule() {
  const savedState = {
    employees,
    dayEvents,
    currentWeekType: state.currentWeekType,
    weekStart: formatDateInput(state.weekStart),
    assignments: state.assignments,
  };

  localStorage.setItem(storageKey, JSON.stringify(savedState));
}

function loadSavedState() {
  const rawState = localStorage.getItem(storageKey);
  if (!rawState) {
    return;
  }

  try {
    const savedState = JSON.parse(rawState);

    if (Array.isArray(savedState.employees)) {
      employees = savedState.employees;
    }

    if (savedState.dayEvents) {
      weekDays.forEach((day) => {
        if (typeof savedState.dayEvents[day] === "string") {
          dayEvents[day] = {
            text: savedState.dayEvents[day],
            color: "none",
          };
          return;
        }

        if (savedState.dayEvents[day]) {
          dayEvents[day] = {
            text: savedState.dayEvents[day].text ?? "",
            color: savedState.dayEvents[day].color ?? "none",
          };
        }
      });
    }

    if (savedState.currentWeekType) {
      state.currentWeekType = savedState.currentWeekType;
    }

    if (savedState.weekStart) {
      state.weekStart = getMonday(new Date(`${savedState.weekStart}T12:00:00`));
    }

    if (savedState.assignments) {
      state.assignments = savedState.assignments;
    }
  } catch (error) {
    console.warn("Saved schedule could not be loaded.", error);
  }
}

function getMonday(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(12, 0, 0, 0);
  return copy;
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function formatDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getEventInputClass(color) {
  return color === "none" ? "event" : `event event-${color}`;
}

function getNoteInputClass(color) {
  return color === "none" ? "cell-note-input" : `cell-note-input note-${color}`;
}
