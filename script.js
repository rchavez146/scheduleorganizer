const storageKey = "scheduleMakerStateV9";

let employees = [
  {
    uid: "mike-sedillo",
    name: "Mike Sedillo",
    keyType: "B",
    idNumber: "2323",
    drawerNumber: "5v",
    roles: ["T", "FSC"],
    leadEligible: true,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Monday",
    saturdayGroup: 1,
  },
  {
    uid: "storm-anaya-gonzales",
    name: "Storm Anaya-Gonzales",
    keyType: "A",
    idNumber: "1985",
    drawerNumber: "10v",
    roles: ["T", "FSC", "IRA", "B", "ADV", "L"],
    leadEligible: true,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Tuesday",
    saturdayGroup: 2,
  },
  {
    uid: "valentina-aragon",
    name: "Valentina Aragon",
    keyType: "B",
    idNumber: "1983",
    drawerNumber: "1",
    roles: ["T", "FSC", "IRA", "L", "A", "B"],
    leadEligible: true,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
  },
  {
    uid: "rose-manassara",
    name: "Rose Manassara",
    keyType: "A",
    idNumber: "2329",
    drawerNumber: "8v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Thursday",
    saturdayGroup: 2,
  },
  {
    uid: "joaquin-garcia",
    name: "Joaquin Garcia",
    keyType: "B",
    idNumber: "2199",
    drawerNumber: "2",
    roles: ["T", "FSC", "IRA", "L", "A", "B"],
    leadEligible: true,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Friday",
    saturdayGroup: 1,
  },
  {
    uid: "rudy-yanez",
    name: "Rudy Yanez",
    keyType: "B",
    idNumber: "2338",
    drawerNumber: "9v",
    roles: ["T", "FSC", "IRA", "B", "ADV", "L"],
    leadEligible: false,
    employmentType: "part_time",
    targetHours: 20,
    fixedDayOff: "Monday",
    saturdayGroup: 2,
  },
  {
    uid: "santiago-martinez",
    name: "Santiago Martinez",
    keyType: "A",
    idNumber: "2344",
    drawerNumber: "7v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Tuesday",
    saturdayGroup: 1,
  },
  {
    uid: "rodrigo-chavez",
    name: "Rodrigo Chavez",
    keyType: "A",
    idNumber: "2358",
    drawerNumber: "11v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
  },
  {
    uid: "matthew-gutierrez",
    name: "Matthew Gutierrez",
    keyType: "B",
    idNumber: "2357",
    drawerNumber: "12v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Thursday",
    saturdayGroup: 1,
  },
  {
    uid: "christany-silva",
    name: "Christany Silva",
    keyType: "A",
    idNumber: "",
    drawerNumber: "6v",
    roles: ["T", "FSC"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Friday",
    saturdayGroup: 2,
  },
  {
    uid: "laura-witkoffsky-gutierrez",
    name: "Laura Witkoffsky Gutierrez",
    keyType: "B",
    idNumber: "",
    drawerNumber: "13v",
    roles: ["T", "FSC", "L"],
    leadEligible: false,
    employmentType: "full_time",
    targetHours: 40,
    fixedDayOff: "Monday",
    saturdayGroup: 1,
  },
];

const customShiftValue = "__CUSTOM_SHIFT__";
const shiftPresets = ["8:00-6:00", "8:30-6:00", "8:00-5:30", "8:30-5:30", "8:00-5:00", "8:30-5:00", "9:00-5:00", "9:00-6:00", "8:30-1:30", "OFF", "PTO", customShiftValue];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const saturdayShift = "8:30-1:30";
const taskConfig = {
  closingLead: { label: "Closing Lead", dailyRequired: 0 },
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
  activeCell: null,
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
const printScheduleButton = document.querySelector("#printSchedule");
const saveScheduleFileButton = document.querySelector("#saveScheduleFile");
const resetScheduleButton = document.querySelector("#resetSchedule");
const schedule40Button = document.querySelector("#schedule40");
const employeeForm = document.querySelector("#employeeForm");
const employeeRoster = document.querySelector("#employeeRoster");
const toggleEmployeeFormButton = document.querySelector("#toggleEmployeeForm");
const cancelEmployeeEditButton = document.querySelector("#cancelEmployeeEdit");
const employeeNameInput = document.querySelector("#employeeName");
const employeeKeyTypeInput = document.querySelector("#employeeKeyType");
const employeeCustomKeyTypeInput = document.querySelector("#employeeCustomKeyType");
const employeeIdNumberInput = document.querySelector("#employeeIdNumber");
const employeeDrawerNumberInput = document.querySelector("#employeeDrawerNumber");
const employeeRoleOptions = Array.from(document.querySelectorAll(".employee-role-option"));
const employeeLeadEligibleInput = document.querySelector("#employeeLeadEligible");
const employeeCustomRolesInput = document.querySelector("#employeeCustomRoles");
const employeeFixedDayOffInput = document.querySelector("#employeeFixedDayOff");
const employeeSaturdayGroupInput = document.querySelector("#employeeSaturdayGroup");
const employeeEmploymentTypeInput = document.querySelector("#employeeEmploymentType");
const employeeTargetHoursInput = document.querySelector("#employeeTargetHours");
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
const cellEditor = document.querySelector("#cellEditor");
const closeCellEditorButton = document.querySelector("#closeCellEditor");
const cellEditorTitle = document.querySelector("#cellEditorTitle");
const cellEditorSubtitle = document.querySelector("#cellEditorSubtitle");
const cellEditorShift = document.querySelector("#cellEditorShift");
const cellEditorCustomShiftButton = document.querySelector("#cellEditorCustomShift");
const cellEditorPtoHours = document.querySelector("#cellEditorPtoHours");
const cellEditorNote = document.querySelector("#cellEditorNote");
const cellEditorNoteColor = document.querySelector("#cellEditorNoteColor");
const taskLeadInput = document.querySelector("#taskLead");
const taskClosingLeadInput = document.querySelector("#taskClosingLead");
const taskOpenerInput = document.querySelector("#taskOpener");
const taskNightDropInput = document.querySelector("#taskNightDrop");
const taskDriveThruInput = document.querySelector("#taskDriveThru");
const taskAuditVaultInput = document.querySelector("#taskAuditVault");

initialize();

function initialize() {
  hydrateEmployees(employees);
  loadSavedState();
  hydrateEmployees(employees);
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
      message: "This will rebuild the week template. Week A and B use Saturday rotation, while Custom leaves Saturday open for manual planning.",
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

  printScheduleButton.addEventListener("click", () => {
    window.print();
  });

  saveScheduleFileButton.addEventListener("click", () => {
    downloadScheduleHtml();
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
    const employeeUid = employeeForm.dataset.editingUid || "";
    toggleEmployeeForm(employeeForm.classList.contains("is-hidden"), employeeUid);
  });

  cancelEmployeeEditButton.addEventListener("click", () => {
    resetEmployeeForm();
  });

  employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEmployee();
  });

  employeeEmploymentTypeInput.addEventListener("change", () => {
    syncTargetHoursField();
  });

  employeeKeyTypeInput.addEventListener("change", () => {
    syncCustomKeyField();
  });

  closeCellEditorButton.addEventListener("click", () => {
    state.activeCell = null;
    render();
  });
}

function buildDefaultAssignments({ preserveAssignments = true } = {}) {
  const saturdayWorkingGroup = state.currentWeekType === "Week A" ? 1 : 2;
  const isCustomWeek = state.currentWeekType === "Custom";
  const previousAssignments = preserveAssignments ? state.assignments : {};
  state.assignments = {};

  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    const previousEmployeeAssignments =
      previousAssignments[employeeUid] ??
      (employee.idNumber ? previousAssignments[employee.idNumber] : undefined);
    state.assignments[employeeUid] = {};

    weekDays.forEach((day) => {
      const workingSaturday = !isCustomWeek && employee.saturdayGroup === saturdayWorkingGroup;
      const shift = getDefaultShift(employee, day, workingSaturday);
      const priorAssignment = previousEmployeeAssignments?.[day];
      state.assignments[employeeUid][day] = {
        shift: priorAssignment?.shift ?? shift,
        note: priorAssignment?.note ?? "",
        noteColor: priorAssignment?.noteColor ?? "none",
        ptoHours: priorAssignment?.ptoHours ?? 0,
        tasks: priorAssignment?.tasks ?? {
          lead: false,
          closingLead: false,
          opener: false,
          nightDrop: false,
          driveThru: false,
          auditVault: false,
        },
      };

      if (state.assignments[employeeUid][day].tasks.lead === undefined) {
        state.assignments[employeeUid][day].tasks.lead = false;
      }
      if (state.assignments[employeeUid][day].tasks.closingLead === undefined) {
        state.assignments[employeeUid][day].tasks.closingLead = false;
      }
      if (state.assignments[employeeUid][day].tasks.opener === undefined) {
        state.assignments[employeeUid][day].tasks.opener = false;
      }
      if (state.assignments[employeeUid][day].ptoHours === undefined) {
        state.assignments[employeeUid][day].ptoHours = 0;
      }

      if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(state.assignments[employeeUid][day].shift)) {
        state.assignments[employeeUid][day].shift = shift;
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
  renderCellEditor();
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
    const employeeUid = getEmployeeUid(employee);

    weekDays.forEach((day) => {
      const cell = cellTemplate.content.firstElementChild.cloneNode(true);
      const assignment = state.assignments[employeeUid][day];
      const notes = cell.querySelector(".cell-notes");
      const shiftDisplay = cell.querySelector(".shift-display");
      shiftDisplay.textContent = assignment.shift;
      cell.classList.toggle("is-off", assignment.shift === "OFF");
      cell.classList.toggle("is-pto", assignment.shift === "PTO");
      cell.classList.toggle(
        "is-selected",
        state.activeCell?.employeeUid === employeeUid && state.activeCell?.day === day
      );
      cell.addEventListener("click", () => {
        state.activeCell = { employeeUid, day };
        render();
      });
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

function renderCellEditor() {
  if (!state.activeCell) {
    cellEditor.classList.add("is-hidden");
    return;
  }

  const employee = employees.find((entry) => getEmployeeUid(entry) === state.activeCell.employeeUid);
  const assignment = employee ? state.assignments[state.activeCell.employeeUid]?.[state.activeCell.day] : null;
  if (!employee || !assignment) {
    cellEditor.classList.add("is-hidden");
    return;
  }

  cellEditor.classList.remove("is-hidden");
  cellEditorTitle.textContent = `${employee.name} • ${state.activeCell.day}`;
  cellEditorSubtitle.textContent = `${employee.keyType} Key • Drawer ${employee.drawerNumber || "N/A"}`;

  populateShiftEditorOptions(assignment.shift, state.activeCell.day);
  cellEditorShift.value = assignment.shift;
  cellEditorShift.onchange = async (event) => {
    await updateAssignmentShift(employee, state.activeCell.day, assignment, event.target.value);
  };

  cellEditorCustomShiftButton.disabled = state.activeCell.day === "Saturday";
  cellEditorCustomShiftButton.onclick = async () => {
    if (state.activeCell.day === "Saturday") {
      return;
    }
    const customShift = await askForCustomShift(assignment.shift);
    if (!customShift) {
      return;
    }
    assignment.shift = customShift;
    saveSchedule();
    render();
  };

  cellEditorPtoHours.value = assignment.ptoHours || "";
  cellEditorPtoHours.disabled = assignment.shift !== "PTO";
  cellEditorPtoHours.oninput = (event) => {
    const value = Number(event.target.value);
    assignment.ptoHours = Number.isFinite(value) ? Math.max(0, value) : 0;
    saveSchedule();
    renderBody();
  };

  cellEditorNote.value = assignment.note;
  cellEditorNote.placeholder = assignment.shift === "PTO" ? "Optional PTO note" : "Add note";
  cellEditorNote.className = getNoteInputClass(assignment.noteColor);
  cellEditorNote.oninput = (event) => {
    assignment.note = event.target.value;
    saveSchedule();
    renderBody();
  };

  populateColorOptions(cellEditorNoteColor);
  cellEditorNoteColor.value = assignment.noteColor ?? "none";
  cellEditorNoteColor.onchange = (event) => {
    assignment.noteColor = event.target.value;
    cellEditorNote.className = getNoteInputClass(event.target.value);
    saveSchedule();
    renderBody();
  };

  bindTaskCheckbox(taskLeadInput, assignment, "lead");
  bindTaskCheckbox(taskClosingLeadInput, assignment, "closingLead");
  bindTaskCheckbox(taskOpenerInput, assignment, "opener");
  bindTaskCheckbox(taskNightDropInput, assignment, "nightDrop");
  bindTaskCheckbox(taskDriveThruInput, assignment, "driveThru");
  bindTaskCheckbox(taskAuditVaultInput, assignment, "auditVault");
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
    ptoTag.textContent = assignment.ptoHours ? `PTO ${formatHours(assignment.ptoHours)} hrs` : "PTO";
    notesRoot.appendChild(ptoTag);
    return;
  }

  if (assignment.note.trim()) {
    const noteTag = document.createElement("span");
    noteTag.className = "note-pill note-banner";
    if (assignment.noteColor && assignment.noteColor !== "none") {
      noteTag.classList.add(`note-${assignment.noteColor}`);
    }
    noteTag.textContent = assignment.note.trim();
    notesRoot.appendChild(noteTag);
  }

  if (assignment.tasks.lead) {
    const leadTag = document.createElement("span");
    leadTag.className = "note-pill lead-note";
    leadTag.textContent = "Lead";
    notesRoot.appendChild(leadTag);
  }

  if (assignment.tasks.closingLead) {
    const closingLeadTag = document.createElement("span");
    closingLeadTag.className = "note-pill closing-lead-note";
    closingLeadTag.textContent = "Closing Lead";
    notesRoot.appendChild(closingLeadTag);
  }

  Object.entries(assignment.tasks).forEach(([taskName, isActive]) => {
    if (taskName === "lead" || taskName === "closingLead" || !isActive) {
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
          : "note-pill task-note";
    note.textContent = taskConfig[taskName].label;
    notesRoot.appendChild(note);
  });

}

function populateShiftEditorOptions(currentShift, day) {
  cellEditorShift.innerHTML = "";
  shiftPresets.forEach((preset) => {
    if (preset === customShiftValue) {
      return;
    }
    const option = document.createElement("option");
    option.value = preset;
    option.textContent = getShiftOptionLabel(preset);
    if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(preset) && preset !== currentShift) {
      option.disabled = true;
    }
    cellEditorShift.appendChild(option);
  });

  if (!shiftPresets.includes(currentShift)) {
    const customOption = document.createElement("option");
    customOption.value = currentShift;
    customOption.textContent = currentShift;
    cellEditorShift.appendChild(customOption);
  }
}

async function updateAssignmentShift(employee, day, assignment, nextShift) {
  if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(nextShift)) {
    cellEditorShift.value = assignment.shift;
    return;
  }

  assignment.shift = nextShift;
  if (["OFF", "PTO"].includes(assignment.shift)) {
    assignment.tasks = {
      lead: false,
      closingLead: false,
      opener: false,
      nightDrop: false,
      driveThru: false,
      auditVault: false,
    };
  }
  if (assignment.shift !== "PTO") {
    assignment.ptoHours = 0;
  }
  saveSchedule();
  render();
}

function bindTaskCheckbox(input, assignment, taskName) {
  input.checked = assignment.tasks[taskName];
  input.disabled = ["OFF", "PTO"].includes(assignment.shift);
  input.onchange = () => {
    if (["OFF", "PTO"].includes(assignment.shift)) {
      return;
    }
    assignment.tasks[taskName] = input.checked;
    saveSchedule();
    render();
  };
}

function populateColorOptions(selectElement) {
  selectElement.innerHTML = "";
  eventColors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.value;
    option.textContent = color.label;
    selectElement.appendChild(option);
  });
}

function renderCoverage() {
  coverageSummary.innerHTML = "";

  weekDays.forEach((day) => {
    const totals = employees.reduce(
      (summary, employee) => {
        const assignment = state.assignments[getEmployeeUid(employee)][day];
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
    const openerAssignment = state.assignments[getEmployeeUid(employee)][day];
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

      const otherAssignment = state.assignments[getEmployeeUid(otherEmployee)][day];
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
      <p>${employee.employmentType === "part_time" ? `Part Time • ${formatHours(employee.targetHours)} hrs` : "Full Time • 40 hrs"} • Fixed Day Off: ${employee.fixedDayOff} • Saturday Group ${employee.saturdayGroup}</p>
      <div class="employee-card-actions">
        <button type="button" data-action="edit">Edit</button>
        <button type="button" class="secondary-button" data-action="remove">Remove</button>
      </div>
    `;

    card.querySelector('[data-action="edit"]').addEventListener("click", () => {
      loadEmployeeIntoForm(employee);
    });

    card.querySelector('[data-action="remove"]').addEventListener("click", () => {
      removeEmployee(getEmployeeUid(employee));
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
  employeeForm.dataset.editingUid = "";
  employeeRoleOptions.forEach((option) => {
    option.checked = ["T", "FSC"].includes(option.value);
  });
  employeeLeadEligibleInput.checked = false;
  employeeCustomRolesInput.value = "";
  employeeDrawerNumberInput.value = "";
  employeeFixedDayOffInput.value = "Monday";
  employeeSaturdayGroupInput.value = "1";
  employeeKeyTypeInput.value = "A";
  employeeCustomKeyTypeInput.value = "";
  employeeEmploymentTypeInput.value = "full_time";
  employeeTargetHoursInput.value = "40";
  syncCustomKeyField();
  syncTargetHoursField();
  toggleEmployeeForm(false);
}

function loadEmployeeIntoForm(employee) {
  employeeNameInput.value = employee.name;
  if (["A", "B"].includes(employee.keyType)) {
    employeeKeyTypeInput.value = employee.keyType;
    employeeCustomKeyTypeInput.value = "";
  } else {
    employeeKeyTypeInput.value = "CUSTOM";
    employeeCustomKeyTypeInput.value = employee.keyType;
  }
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
  employeeEmploymentTypeInput.value = employee.employmentType || "full_time";
  employeeTargetHoursInput.value = String(employee.targetHours ?? 40);
  employeeForm.dataset.editingUid = getEmployeeUid(employee);
  syncCustomKeyField();
  syncTargetHoursField();
  toggleEmployeeForm(true, employee.idNumber);
  employeeForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveEmployee() {
  const name = employeeNameInput.value.trim();
  const keyType =
    employeeKeyTypeInput.value === "CUSTOM"
      ? employeeCustomKeyTypeInput.value.trim()
      : employeeKeyTypeInput.value;
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
  const employmentType = employeeEmploymentTypeInput.value;
  const targetHours = employmentType === "part_time" ? Number(employeeTargetHoursInput.value) || 0 : 40;
  const editingUid = employeeForm.dataset.editingUid;

  if (!name || !keyType || roles.length === 0) {
    return;
  }

  const duplicate = idNumber
    ? employees.find((employee) => employee.idNumber === idNumber && getEmployeeUid(employee) !== editingUid)
    : null;
  if (duplicate) {
    return;
  }

  const employeeRecord = {
    uid: editingUid || createEmployeeUid(name),
    name,
    keyType,
    idNumber,
    drawerNumber,
    roles,
    leadEligible,
    employmentType,
    targetHours,
    fixedDayOff,
    saturdayGroup,
  };
  const existingIndex = employees.findIndex((employee) => getEmployeeUid(employee) === editingUid);

  if (existingIndex >= 0) {
    employees.splice(existingIndex, 1, employeeRecord);
  } else {
    employees.push(employeeRecord);
  }

  buildDefaultAssignments({ preserveAssignments: true });
  saveSchedule();
  render();
  resetEmployeeForm();
}

async function removeEmployee(employeeUid) {
  const accepted = await askForConfirmation({
    title: "Remove Employee?",
    message: "This removes the employee and their current schedule row.",
    actionLabel: "Remove Employee",
    danger: true,
  });
  if (!accepted) {
    return;
  }

  const index = employees.findIndex((employee) => getEmployeeUid(employee) === employeeUid);
  if (index < 0) {
    return;
  }

  employees.splice(index, 1);
  delete state.assignments[employeeUid];
  saveSchedule();
  render();
}

function resetTaskToggles() {
  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    weekDays.forEach((day) => {
      state.assignments[employeeUid][day].tasks = {
        lead: false,
        closingLead: false,
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
  const isCustomWeek = state.currentWeekType === "Custom";
  const weekdayShiftOptions = shiftPresets.filter((shift) =>
    !["OFF", "PTO", customShiftValue, saturdayShift].includes(shift)
  );

  employees.forEach((employee) => {
    const worksSaturday = !isCustomWeek && employee.saturdayGroup === saturdayWorkingGroup;
    const employeeUid = getEmployeeUid(employee);
    const weekdaySlots = worksSaturday ? 4 : 5;
    const targetHours = Number(employee.targetHours ?? 40);
    const saturdayHours = worksSaturday ? getShiftHours(saturdayShift) : 0;
    const weekdayPlan = chooseShiftsForTarget(
      Math.max(0, targetHours - saturdayHours),
      weekdaySlots,
      weekdayShiftOptions
    );
    let weekdayIndex = 0;

    weekDays.forEach((day) => {
      const assignment = state.assignments[employeeUid][day];

      if (day === "Saturday") {
        assignment.shift = worksSaturday ? saturdayShift : "OFF";
      } else if (worksSaturday && day === employee.fixedDayOff) {
        assignment.shift = "OFF";
      } else if (!worksSaturday) {
        assignment.shift = weekdayPlan[weekdayIndex] ?? "OFF";
        weekdayIndex += 1;
      }
      if (worksSaturday && day !== "Saturday" && day !== employee.fixedDayOff) {
        assignment.shift = weekdayPlan[weekdayIndex] ?? "OFF";
        weekdayIndex += 1;
      }

      if (["OFF", "PTO"].includes(assignment.shift)) {
        assignment.tasks = {
          lead: false,
          closingLead: false,
          opener: false,
          nightDrop: false,
          driveThru: false,
          auditVault: false,
        };
        assignment.ptoHours = 0;
      }
    });
  });
}

function getEmployeeScheduledHours(employee) {
  const employeeUid = getEmployeeUid(employee);
  return weekDays.reduce((total, day) => {
    const assignment = state.assignments[employeeUid]?.[day];
    return total + getAssignmentHours(assignment);
  }, 0);
}

function getAssignmentHours(assignment) {
  if (!assignment) {
    return 0;
  }

  if (assignment.shift === "PTO") {
    return Number(assignment.ptoHours) || 0;
  }

  return getShiftHours(assignment.shift);
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
  return employee.leadEligible === true;
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

function downloadScheduleHtml() {
  const title = scheduleTitle.textContent;
  const range = scheduleRange.textContent;
  const tableMarkup = document.querySelector(".schedule-table")?.outerHTML ?? "";
  const styles = `
    body { font-family: Arial, Helvetica, sans-serif; margin: 24px; color: #111; }
    h1 { margin: 0; font-size: 32px; font-family: Georgia, "Times New Roman", serif; font-style: italic; }
    p { margin: 8px 0 18px; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th, td { border: 2px solid #1a1a1a; vertical-align: top; }
    thead th { background: #fff; padding: 10px 8px; text-align: center; }
    .employee-info { padding: 10px 12px; background: #fff; text-align: center; }
    .employee-info strong { display: block; margin-bottom: 10px; }
    .meta-line, .cell-notes { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
    .badge, .note-pill { display: inline-flex; align-items: center; min-height: 24px; padding: 0 8px; border: 1px solid #1a1a1a; font-size: 12px; font-weight: 800; }
    .hours-badge, .chip-lead, .note-pill { color: #fff; }
    .schedule-cell { min-height: 96px; padding: 0; background: #fff; }
    .shift-line { min-height: 42px; display: flex; align-items: flex-start; justify-content: center; padding: 8px 6px 6px; }
    .shift-display { width: 100%; text-align: center; font-weight: 800; }
    .note-pill.info-note, .note-blue { background: #5c9ed6; color: #fff; border-color: #5c9ed6; }
    .note-pill.lead-note { background: #3b2f8f; border-color: #3b2f8f; }
    .note-pill.closing-lead-note { background: #7a233f; border-color: #7a233f; }
    .note-pill.opener-note { background: #4d6f3f; border-color: #4d6f3f; }
    .note-pill.audit-note, .note-green { background: #68b56c; color: #10260f; border-color: #68b56c; }
    .note-pill.pto-note { background: #f2a541; color: #111; border-color: #f2a541; }
    .note-pill.off-note { background: #d14d56; border-color: #d14d56; }
    .note-yellow { background: #f0e44b; color: #111; border-color: #f0e44b; }
    .note-pink { background: #b44b77; color: #fff; border-color: #b44b77; }
    .note-gray { background: #d8d8d8; color: #111; border-color: #d8d8d8; }
    .badge-saturday { background: #ececec; }
    .badge-lead { background: #3b2f8f; color: #fff; border-color: #3b2f8f; }
    .hours-badge { background: #111; border-color: #111; }
    .roles-line { font-weight: 700; font-size: 14px; padding-bottom: 8px; }
    .cell-editor, .controls, .task-band, .task-editor, .note-color-field, .pto-editor { display: none !important; }
    @page { size: landscape; margin: 0.35in; }
  `;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>${styles}</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(range)}</p>
  ${tableMarkup}
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/\s+/g, "-").toLowerCase() || "schedule"}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getEmployeeUid(employee) {
  return employee.uid;
}

function createEmployeeUid(name) {
  return `${slugify(name)}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hydrateEmployees(employeeList) {
  employeeList.forEach((employee) => {
    if (!employee.uid) {
      employee.uid = createEmployeeUid(employee.name || "employee");
    }
    if (!employee.employmentType) {
      employee.employmentType = employee.targetHours && Number(employee.targetHours) !== 40 ? "part_time" : "full_time";
    }
    if (employee.targetHours === undefined || employee.targetHours === null || employee.targetHours === "") {
      employee.targetHours = employee.employmentType === "part_time" ? 20 : 40;
    }
    if (employee.leadEligible === undefined) {
      employee.leadEligible = leadEligibleNames.has(employee.name);
    }
  });
}

function syncCustomKeyField() {
  employeeCustomKeyTypeInput.disabled = employeeKeyTypeInput.value !== "CUSTOM";
}

function syncTargetHoursField() {
  const isPartTime = employeeEmploymentTypeInput.value === "part_time";
  employeeTargetHoursInput.disabled = !isPartTime;
  if (!isPartTime) {
    employeeTargetHoursInput.value = "40";
  }
}

function chooseShiftsForTarget(targetHours, slotCount, availableShifts) {
  const options = [...availableShifts, "OFF"];
  let bestPlan = Array(slotCount).fill("OFF");
  let bestScore = Number.POSITIVE_INFINITY;

  function search(index, currentPlan, currentHours) {
    if (index === slotCount) {
      const score = Math.abs(targetHours - currentHours);
      if (score < bestScore || (score === bestScore && currentHours > sumPlanHours(bestPlan))) {
        bestScore = score;
        bestPlan = [...currentPlan];
      }
      return;
    }

    options.forEach((shift) => {
      const shiftHours = getShiftHours(shift);
      currentPlan.push(shift);
      search(index + 1, currentPlan, currentHours + shiftHours);
      currentPlan.pop();
    });
  }

  search(0, [], 0);
  return bestPlan;
}

function sumPlanHours(plan) {
  return plan.reduce((total, shift) => total + getShiftHours(shift), 0);
}
