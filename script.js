const legacyStorageKey = "scheduleMakerStateV9";
const autosaveStorageKey = "scheduleOrganizer_autosave";
const savedSchedulesStorageKey = "scheduleOrganizer_savedSchedules";
const scheduleDataVersion = 3;

function createSaturdayRule(workWeeks, label = "") {
  return {
    workWeeks: [...workWeeks],
    label,
  };
}

const supervisorEmployeeOverrides = {
  "Mike Sedillo": {
    fixedDayOff: "Thursday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "Alternates with Storm"),
  },
  "Storm Anaya-Gonzales": {
    fixedDayOff: "Wednesday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week B"], "Alternates with Mike"),
  },
  "Valentina Aragon": {
    fixedDayOff: "Friday",
    employmentType: "full_time",
    targetHours: 40,
    latestShiftEnd: "5:00",
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Matthew"),
  },
  "Joaquin Garcia": {
    fixedDayOff: "Monday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week B", "Week C"], "Regular Saturday coverage"),
  },
  "Rudy Yanez": {
    fixedDayOff: "Thursday",
    employmentType: "part_time",
    targetHours: 20,
    saturdayRule: createSaturdayRule(["Week B"], "Every other Saturday"),
  },
  "Rose Manassara": {
    fixedDayOff: "Wednesday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Rodrigo"),
  },
  "Santiago Martinez": {
    fixedDayOff: "Thursday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "Alternating Saturday coverage"),
  },
  "Rodrigo Chavez": {
    fixedDayOff: "Wednesday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Rose"),
  },
  "Matthew Gutierrez": {
    fixedDayOff: "Friday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Valentina"),
  },
  "Christany Silva": {
    fixedDayOff: "Tuesday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Laura"),
  },
  "Laura Witkoffsky Gutierrez": {
    fixedDayOff: "Tuesday",
    employmentType: "full_time",
    targetHours: 40,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Christany"),
  },
};

const defaultEmployees = [
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
    fixedDayOff: "Thursday",
    saturdayGroup: 1,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "Alternates with Storm"),
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
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
    saturdayRule: createSaturdayRule(["Week B"], "Alternates with Mike"),
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
    fixedDayOff: "Friday",
    saturdayGroup: 2,
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Matthew"),
    latestShiftEnd: "5:00",
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
    fixedDayOff: "Wednesday",
    saturdayGroup: 2,
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Rodrigo"),
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
    fixedDayOff: "Monday",
    saturdayGroup: 1,
    saturdayRule: createSaturdayRule(["Week A", "Week B", "Week C"], "Regular Saturday coverage"),
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
    fixedDayOff: "Thursday",
    saturdayGroup: 2,
    saturdayRule: createSaturdayRule(["Week B"], "Every other Saturday"),
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
    fixedDayOff: "Thursday",
    saturdayGroup: 1,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "Alternating Saturday coverage"),
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
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Rose"),
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
    fixedDayOff: "Friday",
    saturdayGroup: 1,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Valentina"),
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
    fixedDayOff: "Tuesday",
    saturdayGroup: 2,
    saturdayRule: createSaturdayRule(["Week B", "Week C"], "3-week rotation with Laura"),
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
    fixedDayOff: "Tuesday",
    saturdayGroup: 1,
    saturdayRule: createSaturdayRule(["Week A", "Week C"], "3-week rotation with Christany"),
  },
];

const customShiftValue = "__CUSTOM_SHIFT__";
const partTimeDefaultShift = "11:00-4:00";
const autoFillHourTolerance = 1;
const maxNineAmWeekdayStarts = 3;
const earlyEndByFiveShifts = ["7:00-5:00", "7:30-5:00"];
const shiftPresets = [
  "8:00-6:00",
  "8:30-6:00",
  "8:00-5:30",
  "8:30-5:30",
  "8:00-5:00",
  "8:30-5:00",
  "9:00-5:00",
  "9:00-6:00",
  "8:30-1:30",
  "OFF",
  "PTO",
  customShiftValue,
];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const saturdayShift = "8:30-1:30";
const builtInTaskConfig = {
  lead: { label: "Lead", dailyRequired: 0, tagClass: "lead-note" },
  closingLead: { label: "Closing Lead", dailyRequired: 0, tagClass: "closing-lead-note" },
  opener: { label: "Opener", dailyRequired: 0, tagClass: "opener-note" },
  nightDrop: { label: "Night Drop", dailyRequired: 2, tagClass: "task-note" },
  driveThru: { label: "Drive Thru", dailyRequired: 1, tagClass: "info-note" },
  auditVault: { label: "Audit Vault", dailyRequired: 0, tagClass: "audit-note" },
};
const eventColors = [
  { value: "none", label: "No color" },
  { value: "yellow", label: "Yellow" },
  { value: "pink", label: "Pink" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "gray", label: "Gray" },
];
const cellColorOptions = [
  { value: "", label: "No color" },
  { value: "#fff4b5", label: "Soft Yellow" },
  { value: "#ffd6de", label: "Soft Pink" },
  { value: "#d7ebff", label: "Soft Blue" },
  { value: "#d9f0d6", label: "Soft Green" },
  { value: "#ececec", label: "Soft Gray" },
  { value: "#f8d7a8", label: "Soft Orange" },
];
const customTaskColorOptions = [
  { value: "pink", label: "Pink" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "gray", label: "Gray" },
];
const leadEligibleNames = new Set([
  "Mike Sedillo",
  "Storm Anaya-Gonzales",
  "Valentina Aragon",
  "Joaquin Garcia",
]);

let employees = cloneData(defaultEmployees);

const state = {
  currentWeekType: "Week A",
  weekStart: getMonday(new Date()),
  assignments: {},
  activeCell: null,
  selectedCells: [],
  customTasks: [],
  cellEditorDock: "right",
  loadedSaveId: "",
  loadedSaveName: "Autosaved Draft",
  lastAutosavedAt: "",
  unsavedChanges: false,
  bulkEditDraft: null,
  toastTimer: null,
};

const dayEvents = createDefaultDayEvents();

const weekStartInput = document.querySelector("#weekStart");
const weekTypeInput = document.querySelector("#weekType");
const scheduleTitle = document.querySelector("#scheduleTitle");
const scheduleRange = document.querySelector("#scheduleRange");
const scheduleHead = document.querySelector("#scheduleHead");
const scheduleBody = document.querySelector("#scheduleBody");
const coverageSummary = document.querySelector("#coverageSummary");
const cellTemplate = document.querySelector("#employeeCellTemplate");
const saveStatus = document.querySelector("#saveStatus");
const resetTasksButton = document.querySelector("#resetTasks");
const printScheduleButton = document.querySelector("#printSchedule");
const saveNamedScheduleButton = document.querySelector("#saveNamedSchedule");
const loadSavedSchedulesButton = document.querySelector("#loadSavedSchedules");
const exportScheduleJsonButton = document.querySelector("#exportScheduleJson");
const importScheduleJsonButton = document.querySelector("#importScheduleJson");
const importScheduleFileInput = document.querySelector("#importScheduleFile");
const openTutorialButton = document.querySelector("#openTutorial");
const manageCustomTasksButton = document.querySelector("#manageCustomTasks");
const resetScheduleButton = document.querySelector("#resetSchedule");
const autoFillCoverageButton = document.querySelector("#autoFillCoverage");
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
const cellEditorHeader = document.querySelector(".cell-editor-header");
const cellEditorBody = document.querySelector(".cell-editor-body");
const closeCellEditorBottomButton = document.querySelector("#closeCellEditorBottom");
const cellEditorTitle = document.querySelector("#cellEditorTitle");
const cellEditorSubtitle = document.querySelector("#cellEditorSubtitle");
const bulkEditorHint = document.querySelector("#bulkEditorHint");
const cellEditorShift = document.querySelector("#cellEditorShift");
const cellEditorCustomShiftButton = document.querySelector("#cellEditorCustomShift");
const cellEditorPtoField = document.querySelector("#cellEditorPtoField");
const cellEditorPtoHours = document.querySelector("#cellEditorPtoHours");
const cellEditorNote = document.querySelector("#cellEditorNote");
const cellEditorNoteColor = document.querySelector("#cellEditorNoteColor");
const cellEditorCellColor = document.querySelector("#cellEditorCellColor");
const builtInTaskList = document.querySelector("#builtInTaskList");
const customTaskList = document.querySelector("#customTaskList");
const cellEditorAddCustomTaskButton = document.querySelector("#cellEditorAddCustomTask");
const resetBulkSelectionButton = document.querySelector("#resetBulkSelection");
const applyBulkChangesButton = document.querySelector("#applyBulkChanges");
const saveScheduleModal = document.querySelector("#saveScheduleModal");
const saveScheduleNameInput = document.querySelector("#saveScheduleName");
const saveScheduleError = document.querySelector("#saveScheduleError");
const saveScheduleModalCancelButton = document.querySelector("#saveScheduleModalCancel");
const saveScheduleModalAcceptButton = document.querySelector("#saveScheduleModalAccept");
const loadSchedulesModal = document.querySelector("#loadSchedulesModal");
const savedSchedulesList = document.querySelector("#savedSchedulesList");
const loadSchedulesCloseButton = document.querySelector("#loadSchedulesClose");
const customTasksModal = document.querySelector("#customTasksModal");
const customTaskNameInput = document.querySelector("#customTaskName");
const customTaskColorInput = document.querySelector("#customTaskColor");
const customTaskError = document.querySelector("#customTaskError");
const customTaskCreateButton = document.querySelector("#customTaskCreate");
const customTaskManagerList = document.querySelector("#customTaskManagerList");
const customTasksCloseButton = document.querySelector("#customTasksClose");
const tutorialModal = document.querySelector("#tutorialModal");
const tutorialCloseButton = document.querySelector("#tutorialClose");
const toast = document.querySelector("#toast");
const cellEditorDockOverlay = document.querySelector("#cellEditorDockOverlay");
const dockZoneLeft = document.querySelector(".dock-zone-left");
const dockZoneRight = document.querySelector(".dock-zone-right");

let autosaveTimer = null;
let cellEditorDragState = null;
let cellClickSequence = null;

initialize();

function initialize() {
  populateDayOffOptions();
  hydrateEmployees(employees);
  loadInitialState();
  buildDefaultAssignments({ preserveAssignments: true });
  weekStartInput.value = formatDateInput(state.weekStart);
  weekTypeInput.value = state.currentWeekType;
  populateColorOptions(cellEditorNoteColor);
  populateCellColorOptions(cellEditorCellColor);
  populateCustomTaskColorOptions(customTaskColorInput);
  resetEmployeeForm();
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
    setDirtyAndAutosave("Week start updated.");
    render();
  });

  weekTypeInput.addEventListener("change", async (event) => {
    const accepted = await askForConfirmation({
      title: "Change Week Type?",
      message: "This will rebuild the week template. Week A, Week B, and Week C use the employee Saturday rotation rules, while Custom leaves Saturday open for manual planning.",
      actionLabel: "Update Rotation",
    });
    if (!accepted) {
      event.target.value = state.currentWeekType;
      return;
    }

    state.currentWeekType = event.target.value;
    buildDefaultAssignments({ preserveAssignments: false });
    setDirtyAndAutosave("Week type updated.");
    render();
  });

  resetTasksButton.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Reset Task Toggles?",
      message: "This clears Lead, Opener, Night Drop, Drive Thru, Audit Vault, custom tasks, and Closing Lead selections but keeps shifts and notes.",
      actionLabel: "Reset Tasks",
    });
    if (!accepted) {
      return;
    }

    resetTaskToggles();
    setDirtyAndAutosave("Task toggles reset.");
    render();
  });

  printScheduleButton.addEventListener("click", () => {
    window.print();
  });

  saveNamedScheduleButton.addEventListener("click", () => {
    openSaveScheduleModal();
  });

  loadSavedSchedulesButton.addEventListener("click", () => {
    openLoadSchedulesModal();
  });

  exportScheduleJsonButton.addEventListener("click", async () => {
    await exportSchedule(getSerializableState());
  });

  importScheduleJsonButton.addEventListener("click", () => {
    importScheduleFileInput.click();
  });

  openTutorialButton.addEventListener("click", () => {
    openModal(tutorialModal);
  });

  importScheduleFileInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await importSchedule(file);
    event.target.value = "";
  });

  manageCustomTasksButton.addEventListener("click", () => {
    openCustomTasksModal();
  });

  autoFillCoverageButton.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Auto Fill Coverage?",
      message: "This will reset shifts to target hours first, then replace existing opener, closer, night drop, and drive thru tags using the coverage rules.",
      actionLabel: "Auto Fill",
    });
    if (!accepted) {
      return;
    }

    autoFillCoverageTasks();
  });

  resetScheduleButton.addEventListener("click", async () => {
    const accepted = await askForConfirmation({
      title: "Reset Schedule?",
      message: "This rebuilds the schedule from the current employees, the selected week rotation, and fixed days off. Notes, cell colors, and task selections will be cleared.",
      actionLabel: "Reset Schedule",
      danger: true,
    });
    if (!accepted) {
      return;
    }

    buildDefaultAssignments({ preserveAssignments: false });
    clearSelection();
    setDirtyAndAutosave("Schedule reset.");
    render();
  });

  if (schedule40Button) {
    schedule40Button.addEventListener("click", async () => {
      const accepted = await askForConfirmation({
        title: "Schedule Target Hours?",
        message: "This will update shifts to match each employee's target hours where possible. Existing notes and task selections will stay.",
        actionLabel: "Apply Hours",
      });
      if (!accepted) {
        return;
      }

      scheduleEmployeesTo40Hours();
      setDirtyAndAutosave("Target hours applied.");
      render();
    });
  }

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

  closeCellEditorBottomButton.addEventListener("click", () => {
    clearSelection();
    render();
  });

  cellEditorHeader.addEventListener("pointerdown", startCellEditorDrag);

  cellEditorAddCustomTaskButton.addEventListener("click", () => {
    openCustomTasksModal();
  });

  cellEditorCustomShiftButton.addEventListener("click", async () => {
    if (isBulkEditing()) {
      await handleBulkCustomShift();
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected || selected.day === "Saturday") {
      return;
    }

    const customShift = await askForCustomShift(selected.assignment.shift);
    if (!customShift) {
      return;
    }

    selected.assignment.shift = customShift;
    selected.assignment.ptoHours = selected.assignment.shift === "PTO" ? selected.assignment.ptoHours : 0;
    if (["OFF", "PTO"].includes(selected.assignment.shift)) {
      selected.assignment.tasks = createEmptyTaskState();
      selected.assignment.customTasks = [];
    }
    setDirtyAndAutosave("Custom shift updated.");
    render();
  });

  cellEditorShift.addEventListener("change", async (event) => {
    if (isBulkEditing()) {
      state.bulkEditDraft.shift = event.target.value;
      state.bulkEditDraft.shiftChanged = event.target.value !== "";
      if (event.target.value !== "PTO") {
        state.bulkEditDraft.ptoHours = "";
        state.bulkEditDraft.ptoHoursChanged = false;
        cellEditorPtoHours.value = "";
      }
      syncPtoFieldVisibility({
        bulkMode: true,
        shiftValue: event.target.value,
      });
      cellEditorPtoHours.disabled = !(state.bulkEditDraft.shiftChanged && state.bulkEditDraft.shift === "PTO");
      if (event.target.value === customShiftValue) {
        await handleBulkCustomShift();
        return;
      }
      applyBulkUpdate(
        state.selectedCells,
        {
          shift: state.bulkEditDraft.shift,
          shiftChanged: state.bulkEditDraft.shiftChanged,
          ptoHours: state.bulkEditDraft.ptoHours,
          ptoHoursChanged: state.bulkEditDraft.ptoHoursChanged,
        },
        { preserveDraft: true }
      );
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected) {
      return;
    }

    await updateAssignmentShift(selected.employee, selected.day, selected.assignment, event.target.value);
  });

  cellEditorPtoHours.addEventListener("input", (event) => {
    if (isBulkEditing()) {
      if (!(state.bulkEditDraft.shiftChanged && state.bulkEditDraft.shift === "PTO")) {
        return;
      }
      state.bulkEditDraft.ptoHours = event.target.value;
      state.bulkEditDraft.ptoHoursChanged = true;
      applyBulkUpdate(
        state.selectedCells,
        {
          ptoHours: state.bulkEditDraft.ptoHours,
          ptoHoursChanged: true,
        },
        { preserveDraft: true }
      );
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected || selected.assignment.shift !== "PTO") {
      return;
    }

    selected.assignment.ptoHours = sanitizeHoursInput(event.target.value);
    setDirtyAndAutosave();
    renderBody();
    renderEmployeeRoster();
    renderSaveStatus();
  });

  cellEditorNote.addEventListener("input", (event) => {
    if (isBulkEditing()) {
      state.bulkEditDraft.note = event.target.value;
      state.bulkEditDraft.noteChanged = true;
      applyBulkUpdate(
        state.selectedCells,
        {
          note: state.bulkEditDraft.note,
          noteChanged: true,
        },
        { preserveDraft: true }
      );
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected) {
      return;
    }

    selected.assignment.note = event.target.value;
    setDirtyAndAutosave();
    renderBody();
    renderSaveStatus();
  });

  cellEditorNoteColor.addEventListener("change", (event) => {
    if (isBulkEditing()) {
      state.bulkEditDraft.noteColor = event.target.value;
      state.bulkEditDraft.noteColorChanged = true;
      applyBulkUpdate(
        state.selectedCells,
        {
          noteColor: state.bulkEditDraft.noteColor,
          noteColorChanged: true,
        },
        { preserveDraft: true }
      );
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected) {
      return;
    }

    selected.assignment.noteColor = event.target.value;
    setDirtyAndAutosave();
    renderBody();
    renderSaveStatus();
  });

  cellEditorCellColor.addEventListener("change", (event) => {
    if (isBulkEditing()) {
      state.bulkEditDraft.cellColor = event.target.value;
      state.bulkEditDraft.cellColorChanged = true;
      applyBulkUpdate(
        state.selectedCells,
        {
          cellColor: state.bulkEditDraft.cellColor,
          cellColorChanged: true,
        },
        { preserveDraft: true }
      );
      return;
    }

    const selected = getSingleSelectedAssignment();
    if (!selected) {
      return;
    }

    setCellColor(getCellId(selected.employee.uid, selected.day), event.target.value);
    setDirtyAndAutosave();
    renderBody();
    renderSaveStatus();
  });

  applyBulkChangesButton.addEventListener("click", () => {});

  resetBulkSelectionButton.addEventListener("click", async () => {
    if (state.selectedCells.length === 0) {
      return;
    }

    const cellCount = state.selectedCells.length;
    const isSingle = cellCount === 1;

    const accepted = await askForConfirmation({
      title: isSingle ? "Reset Cell?" : "Reset Selected Cells?",
      message: isSingle
        ? "Reset this cell back to its default schedule state?"
        : `Reset ${cellCount} selected cells back to their default schedule state?`,
      actionLabel: isSingle ? "Reset Cell" : "Reset Selected",
      danger: true,
    });
    if (!accepted) {
      return;
    }

    resetSelectedCellsToDefault(state.selectedCells);
  });

  document.addEventListener("mousedown", (event) => {
    if (hasVisibleModal()) {
      return;
    }

    const insideGrid = event.target.closest(".schedule-table");
    const insideEditor = event.target.closest(".cell-editor");
    const insideSafeArea = event.target.closest(
      ".employee-panel, .app-header, .legend-panel, .coverage-panel"
    );
    if (!insideGrid && !insideEditor && !insideSafeArea) {
      clearSelection();
      render();
    }
  });

  saveScheduleModalCancelButton.addEventListener("click", () => {
    closeModal(saveScheduleModal);
  });

  saveScheduleModalAcceptButton.addEventListener("click", () => {
    const name = saveScheduleNameInput.value.trim();
    if (!name) {
      saveScheduleError.textContent = "Please enter a save name.";
      return;
    }

    saveNamedSchedule(name, getSerializableState());
    closeModal(saveScheduleModal);
  });

  saveScheduleModal.addEventListener("click", (event) => {
    if (event.target === saveScheduleModal) {
      closeModal(saveScheduleModal);
    }
  });

  loadSchedulesCloseButton.addEventListener("click", () => {
    closeModal(loadSchedulesModal);
  });

  loadSchedulesModal.addEventListener("click", (event) => {
    if (event.target === loadSchedulesModal) {
      closeModal(loadSchedulesModal);
    }
  });

  customTaskCreateButton.addEventListener("click", () => {
    const label = customTaskNameInput.value.trim();
    if (!label) {
      customTaskError.textContent = "Enter a task name before adding it.";
      return;
    }

    createCustomTask(label, customTaskColorInput.value);
    customTaskNameInput.value = "";
    customTaskColorInput.value = customTaskColorOptions[0].value;
    customTaskError.textContent = "";
    renderCustomTasksModal();
    renderCellEditor();
  });

  customTasksCloseButton.addEventListener("click", () => {
    closeModal(customTasksModal);
  });

  customTasksModal.addEventListener("click", (event) => {
    if (event.target === customTasksModal) {
      closeModal(customTasksModal);
    }
  });

  tutorialCloseButton.addEventListener("click", () => {
    closeModal(tutorialModal);
  });

  tutorialModal.addEventListener("click", (event) => {
    if (event.target === tutorialModal) {
      closeModal(tutorialModal);
    }
  });

  cellEditorBody.addEventListener(
    "wheel",
    (event) => {
      const canScroll = cellEditorBody.scrollHeight > cellEditorBody.clientHeight;
      if (!canScroll) {
        return;
      }

      event.preventDefault();
      cellEditorBody.scrollTop += event.deltaY;
    },
    { passive: false }
  );
}

function createDefaultDayEvents() {
  return {
    Monday: { text: "", color: "none" },
    Tuesday: { text: "", color: "none" },
    Wednesday: { text: "", color: "none" },
    Thursday: { text: "", color: "none" },
    Friday: { text: "", color: "none" },
    Saturday: { text: "", color: "none" },
  };
}

function initializeBulkEditDraft() {
  return {
    shift: "",
    shiftChanged: false,
    ptoHours: "",
    ptoHoursChanged: false,
    note: "",
    noteChanged: false,
    noteColor: "none",
    noteColorChanged: false,
    cellColor: "",
    cellColorChanged: false,
    taskActions: {},
    customTaskActions: {},
  };
}

function createEmptyTaskState() {
  return {
    lead: false,
    closingLead: false,
    opener: false,
    nightDrop: false,
    driveThru: false,
    auditVault: false,
  };
}

function createEmptyAssignment(shift = "OFF") {
  return {
    shift,
    note: "",
    noteColor: "none",
    cellColor: "",
    ptoHours: 0,
    tasks: createEmptyTaskState(),
    customTasks: [],
  };
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadInitialState() {
  const autosave = loadAutosaveDraft();
  if (autosave) {
    applyLoadedData(autosave, {
      loadedName: autosave.name || getAutosaveDraftName(autosave.payload),
      loadedId: "",
      lastAutosavedAt: autosave.updatedAt || autosave.createdAt || "",
      markClean: true,
    });
    return;
  }

  const legacy = migrateLegacyState();
  if (legacy) {
    applyLoadedData(legacy, {
      loadedName: legacy.name || getAutosaveDraftName(legacy.payload),
      loadedId: "",
      markClean: true,
    });
    saveAutosaveDraft();
    return;
  }

  employees = cloneData(defaultEmployees);
  hydrateEmployees(employees);
  state.loadedSaveName = getAutosaveDraftName();
}

function render() {
  weekStartInput.value = formatDateInput(state.weekStart);
  weekTypeInput.value = state.currentWeekType;

  const dates = weekDays.map((_, index) => addDays(state.weekStart, index));
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(state.weekStart);

  scheduleTitle.textContent = `${monthLabel} Schedule`;
  scheduleRange.textContent = `${state.currentWeekType} • ${formatLongDate(dates[0])} - ${formatLongDate(dates[5])}`;

  renderSaveStatus();
  renderHeader(dates);
  renderBody();
  renderCoverage();
  renderEmployeeRoster();
  renderCellEditor();
}

function renderSaveStatus() {
  const parts = [];
  parts.push(
    state.lastAutosavedAt
      ? `Last autosaved at ${formatDateTime(state.lastAutosavedAt)}`
      : "Autosave ready"
  );
  parts.push(`Loaded: ${getCurrentScheduleLabel()}`);
  parts.push(state.unsavedChanges ? "Unsaved changes" : "All changes saved");
  if (state.selectedCells.length > 1) {
    parts.push(`Bulk edit: ${state.selectedCells.length} cells selected`);
  }
  saveStatus.textContent = parts.join(" • ");
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
      setDirtyAndAutosave();
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
      setDirtyAndAutosave();
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
      const cellId = getCellId(employeeUid, day);
      const cell = cellTemplate.content.firstElementChild.cloneNode(true);
      const assignment = ensureAssignment(employeeUid, day);
      const notes = cell.querySelector(".cell-notes");
      const shiftDisplay = cell.querySelector(".shift-display");
      const editButton = cell.querySelector(".cell-edit-button");

      shiftDisplay.textContent = assignment.shift;
      cell.classList.toggle("is-off", assignment.shift === "OFF");
      cell.classList.toggle("is-pto", assignment.shift === "PTO");
      cell.classList.toggle("is-selected", state.selectedCells.length === 1 && state.selectedCells[0] === cellId);
      cell.classList.toggle("is-multi-selected", state.selectedCells.length > 1 && state.selectedCells.includes(cellId));
      applyCellVisualState(cell, shiftDisplay, assignment);

      cell.addEventListener("click", (event) => {
        handleCellClick(event, cellId);
      });

      editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        clearPendingCellClickSequence();
        openCellEditorForCell(cellId);
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
      <span class="badge">ID ${employee.idNumber || "N/A"}</span>
      <span class="badge">Drawer ${employee.drawerNumber || "N/A"}</span>
      <span class="badge hours-badge">${formatHours(scheduledHours)} hrs</span>
      ${leadBadge}
    </div>
    <div class="roles-line">${employee.roles.join(", ")}</div>
  `;

  return cell;
}

function renderCellEditor() {
  const selectedCount = state.selectedCells.length;
  if (selectedCount === 0) {
    cellEditor.classList.add("is-hidden");
    return;
  }

  cellEditor.classList.remove("is-hidden");
  const bulkMode = isBulkEditing();
  cellEditor.classList.toggle("is-docked-left", state.cellEditorDock === "left");
  cellEditor.classList.toggle("is-bulk-editing", bulkMode);
  bulkEditorHint.classList.toggle("is-hidden", !bulkMode);
  applyBulkChangesButton.classList.add("is-hidden");
  resetBulkSelectionButton.classList.toggle("is-hidden", selectedCount === 0);
  closeCellEditorBottomButton.textContent = bulkMode ? "Close" : "Close";
  applyBulkChangesButton.textContent = bulkMode ? "Apply" : "Apply To Selected Cells";
  resetBulkSelectionButton.textContent = bulkMode ? "Reset" : "Reset Cell";

  if (bulkMode) {
    renderBulkEditor();
    return;
  }

  state.bulkEditDraft = null;
  const selected = getSingleSelectedAssignment();
  if (!selected) {
    cellEditor.classList.add("is-hidden");
    return;
  }

  const { employee, day, assignment } = selected;
  cellEditorTitle.textContent = `${employee.name} • ${day}`;
  cellEditorSubtitle.textContent = `${employee.keyType} Key • Drawer ${employee.drawerNumber || "N/A"}`;
  populateShiftEditorOptions(assignment.shift, day, employee);
  cellEditorShift.value = assignment.shift;
  cellEditorCustomShiftButton.disabled = day === "Saturday";
  syncPtoFieldVisibility({
    bulkMode: false,
    shiftValue: assignment.shift,
  });
  cellEditorPtoHours.disabled = assignment.shift !== "PTO";
  cellEditorPtoHours.value = assignment.shift === "PTO" ? String(assignment.ptoHours || "") : "";
  cellEditorNote.value = assignment.note;
  cellEditorNote.placeholder = assignment.shift === "PTO" ? "Optional PTO note" : "Add note";
  cellEditorNote.className = getNoteInputClass(assignment.noteColor);
  cellEditorNoteColor.value = assignment.noteColor ?? "none";
  syncCellColorSelectValue(assignment.cellColor);
  renderTaskEditorLists(assignment, false);
}

function renderBulkEditor() {
  if (!state.bulkEditDraft) {
    state.bulkEditDraft = initializeBulkEditDraft();
  }

  cellEditorTitle.textContent = `Editing ${state.selectedCells.length} selected cells`;
  cellEditorSubtitle.textContent = "Only the values you change will be applied to the whole selection.";
  populateShiftEditorOptions("", getSelectionHasSaturdayOnly() ? "Saturday" : "Monday", null);
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Leave unchanged";
  cellEditorShift.prepend(placeholder);
  cellEditorShift.value = state.bulkEditDraft.shiftChanged ? state.bulkEditDraft.shift : "";
  cellEditorCustomShiftButton.disabled = getSelectionHasSaturdayOnly();
  syncPtoFieldVisibility({
    bulkMode: true,
    shiftValue: state.bulkEditDraft.shiftChanged ? state.bulkEditDraft.shift : "",
  });
  cellEditorPtoHours.disabled = !(
    state.bulkEditDraft.shiftChanged && state.bulkEditDraft.shift === "PTO"
  );
  cellEditorPtoHours.value = state.bulkEditDraft.ptoHoursChanged ? state.bulkEditDraft.ptoHours : "";
  cellEditorNote.value = state.bulkEditDraft.noteChanged ? state.bulkEditDraft.note : "";
  cellEditorNote.placeholder = "Leave untouched unless you want to apply a note";
  cellEditorNote.className = "cell-note-input";
  cellEditorNoteColor.value = state.bulkEditDraft.noteColorChanged ? state.bulkEditDraft.noteColor : "none";
  syncCellColorSelectValue(state.bulkEditDraft.cellColor);
  renderTaskEditorLists(null, true);
}

function renderTaskEditorLists(assignment, bulkMode) {
  builtInTaskList.innerHTML = "";
  customTaskList.innerHTML = "";

  Object.entries(builtInTaskConfig).forEach(([taskId, config]) => {
    if (bulkMode) {
      builtInTaskList.appendChild(buildBulkTaskRow(taskId, config.label, false));
      return;
    }
    builtInTaskList.appendChild(buildSingleTaskRow(taskId, config.label, assignment, false));
  });

  state.customTasks.forEach((task) => {
    if (bulkMode) {
      customTaskList.appendChild(buildBulkTaskRow(task.id, task.label, true));
      return;
    }
    customTaskList.appendChild(buildSingleTaskRow(task.id, task.label, assignment, true));
  });
}

function buildSingleTaskRow(taskId, label, assignment, isCustomTask) {
  const taskLabel = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = isCustomTask
    ? assignment.customTasks.includes(taskId)
    : Boolean(assignment.tasks[taskId]);
  input.disabled = ["OFF", "PTO"].includes(assignment.shift);
  input.addEventListener("change", () => {
    if (input.disabled) {
      return;
    }

    if (isCustomTask) {
      updateCustomTaskSelection(assignment, taskId, input.checked);
    } else {
      assignment.tasks[taskId] = input.checked;
    }
    setDirtyAndAutosave();
    render();
  });

  taskLabel.appendChild(input);
  taskLabel.append(label);
  return taskLabel;
}

function buildBulkTaskRow(taskId, label, isCustomTask) {
  const row = document.createElement("label");
  row.textContent = label;
  const select = document.createElement("select");
  [
    { value: "", label: "No change" },
    { value: "add", label: "Add" },
    { value: "remove", label: "Remove" },
  ].forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    select.appendChild(option);
  });

  const actionMap = isCustomTask ? state.bulkEditDraft.customTaskActions : state.bulkEditDraft.taskActions;
  select.value = actionMap[taskId] || "";
  select.addEventListener("change", () => {
    actionMap[taskId] = select.value;
    applyBulkUpdate(
      state.selectedCells,
      isCustomTask
        ? { customTaskActions: { [taskId]: select.value } }
        : { taskActions: { [taskId]: select.value } },
      { preserveDraft: true }
    );
  });

  row.appendChild(select);
  return row;
}

function appendCellNotes(notesRoot, employee, day, assignment) {
  notesRoot.innerHTML = "";

  if (assignment.shift === "OFF") {
    const offTag = document.createElement("span");
    offTag.className = "note-pill off-note";
    offTag.textContent =
      day === "Saturday"
        ? "Saturday OFF"
        : day === employee.fixedDayOff &&
          doesEmployeeWorkSaturday(employee)
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

  const taskTags = [];
  Object.entries(assignment.tasks).forEach(([taskId, isActive]) => {
    if (!isActive || !builtInTaskConfig[taskId]) {
      return;
    }
    taskTags.push({
      label: builtInTaskConfig[taskId].label,
      className: builtInTaskConfig[taskId].tagClass,
    });
  });

  assignment.customTasks.forEach((taskId) => {
    const task = state.customTasks.find((entry) => entry.id === taskId);
    if (task) {
      taskTags.push({
        label: task.label,
        className: getCustomTaskColorClass(task.color),
      });
    }
  });

  taskTags.forEach((task) => {
    const tag = document.createElement("span");
    tag.className = `note-pill ${task.className}`;
    tag.textContent = task.label;
    notesRoot.appendChild(tag);
  });
}

function renderCoverage() {
  coverageSummary.innerHTML = "";

  weekDays.forEach((day) => {
    const totals = employees.reduce(
      (summary, employee) => {
        const assignment = ensureAssignment(getEmployeeUid(employee), day);
        if (!["OFF", "PTO"].includes(assignment.shift)) {
          summary.staffed += 1;
        }

        Object.keys(builtInTaskConfig).forEach((taskName) => {
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

function renderEmployeeRoster() {
  employeeRoster.innerHTML = "";

  employees.forEach((employee) => {
    const card = document.createElement("article");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${employee.name}</strong>
      <p>${employee.keyType} Key • ID ${employee.idNumber || "N/A"} • Drawer ${employee.drawerNumber || "N/A"}</p>
      <p>Roles: ${employee.roles.join(", ")}</p>
      <p>${employee.employmentType === "part_time" ? `Part Time • ${formatHours(employee.targetHours)} hrs` : "Full Time • 40 hrs"} • Fixed Day Off: ${employee.fixedDayOff}</p>
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

function renderSavedSchedulesList() {
  savedSchedulesList.innerHTML = "";
  const schedules = getStoredNamedSchedules();
  if (schedules.length === 0) {
    savedSchedulesList.innerHTML = `<div class="saved-schedule-item"><div class="saved-schedule-meta"><strong>No saved schedules yet</strong><p>Save a named draft to load it later.</p></div></div>`;
    return;
  }

  schedules
    .sort((left, right) => new Date(right.updatedAt) - new Date(left.updatedAt))
    .forEach((entry) => {
      const item = document.createElement("div");
      item.className = "saved-schedule-item";
      item.innerHTML = `
        <div class="saved-schedule-meta">
          <strong>${escapeHtml(entry.name)}</strong>
          <p>Updated ${formatDateTime(entry.updatedAt)}</p>
        </div>
        <div class="saved-schedule-actions">
          <button type="button" data-action="load">Load</button>
          <button type="button" class="secondary-button" data-action="delete">Delete</button>
        </div>
      `;

      item.querySelector('[data-action="load"]').addEventListener("click", () => {
        loadNamedSchedule(entry.id);
      });

      item.querySelector('[data-action="delete"]').addEventListener("click", async () => {
        const accepted = await askForConfirmation({
          title: "Delete Saved Schedule?",
          message: `Delete "${entry.name}" from named saves?`,
          actionLabel: "Delete Save",
          danger: true,
        });
        if (!accepted) {
          return;
        }
        deleteNamedSchedule(entry.id);
        renderSavedSchedulesList();
      });

      savedSchedulesList.appendChild(item);
    });
}

function renderCustomTasksModal() {
  customTaskManagerList.innerHTML = "";
  if (state.customTasks.length === 0) {
    customTaskManagerList.innerHTML = `<div class="saved-schedule-item"><div class="saved-schedule-meta"><strong>No custom tasks yet</strong><p>Add one above to make it available in the cell editor.</p></div></div>`;
    return;
  }

  state.customTasks.forEach((task) => {
    const item = document.createElement("div");
    item.className = "saved-schedule-item";
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.label;
    const colorSelect = document.createElement("select");
    populateCustomTaskColorOptions(colorSelect);
    colorSelect.value = task.color || customTaskColorOptions[0].value;
    const colorPreview = document.createElement("span");
    colorPreview.className = `custom-task-color-preview ${getCustomTaskColorClass(colorSelect.value)}`;
    colorPreview.textContent = "Preview";
    colorSelect.addEventListener("change", () => {
      colorPreview.className = `custom-task-color-preview ${getCustomTaskColorClass(colorSelect.value)}`;
    });
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "secondary-button";
    deleteButton.textContent = "Delete";

    saveButton.addEventListener("click", () => {
      const nextLabel = input.value.trim();
      if (!nextLabel) {
        customTaskError.textContent = "Task names cannot be blank.";
        return;
      }
      updateCustomTask(task.id, nextLabel, colorSelect.value);
      customTaskError.textContent = "";
      renderCustomTasksModal();
      renderCellEditor();
    });

    deleteButton.addEventListener("click", async () => {
      const accepted = await askForConfirmation({
        title: "Delete Custom Task?",
        message: `Delete "${task.label}" from your custom task list?`,
        actionLabel: "Delete Task",
        danger: true,
      });
      if (!accepted) {
        return;
      }
      deleteCustomTask(task.id);
      renderCustomTasksModal();
      renderCellEditor();
    });

    const meta = document.createElement("div");
    meta.className = "saved-schedule-meta";
    const strong = document.createElement("strong");
    strong.textContent = task.label;
    meta.appendChild(strong);
    meta.appendChild(input);
    meta.appendChild(colorSelect);
    meta.appendChild(colorPreview);

    const actions = document.createElement("div");
    actions.className = "saved-schedule-actions";
    actions.appendChild(saveButton);
    actions.appendChild(deleteButton);

    item.appendChild(meta);
    item.appendChild(actions);
    customTaskManagerList.appendChild(item);
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
  const safeRoles = Array.isArray(employee.roles) ? employee.roles : [];
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
    option.checked = safeRoles.includes(option.value);
  });
  employeeLeadEligibleInput.checked = isLeadEligible(employee);
  employeeCustomRolesInput.value = safeRoles
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
  employeeForm.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

function saveEmployee() {
  const name = employeeNameInput.value.trim();
  const keyType =
    employeeKeyTypeInput.value === "CUSTOM"
      ? employeeCustomKeyTypeInput.value.trim()
      : employeeKeyTypeInput.value;
  const idNumber = employeeIdNumberInput.value.trim();
  const drawerNumber = employeeDrawerNumberInput.value.trim();
  const selectedRoles = employeeRoleOptions.filter((option) => option.checked).map((option) => option.value);
  const customRoles = employeeCustomRolesInput.value
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
  const roles = [...new Set([...selectedRoles, ...customRoles])];
  const leadEligible = employeeLeadEligibleInput.checked;
  const fixedDayOff = employeeFixedDayOffInput.value;
  const saturdayGroup = Number(employeeSaturdayGroupInput.value);
  const employmentType = employeeEmploymentTypeInput.value;
  const targetHours = employmentType === "part_time" ? Number(employeeTargetHoursInput.value) || 20 : 40;
  const editingUid = employeeForm.dataset.editingUid;
  const existingEmployee = employees.find((employee) => getEmployeeUid(employee) === editingUid);

  if (!name || !keyType || roles.length === 0) {
    return;
  }

  const duplicate = idNumber
    ? employees.find((employee) => employee.idNumber === idNumber && getEmployeeUid(employee) !== editingUid)
    : null;
  if (duplicate) {
    showToast("That ID number is already being used.");
    return;
  }

  const supervisorOverride = supervisorEmployeeOverrides[name];

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
    saturdayRule: existingEmployee?.saturdayRule
      ? cloneData(existingEmployee.saturdayRule)
      : supervisorOverride?.saturdayRule
        ? cloneData(supervisorOverride.saturdayRule)
        : getDefaultSaturdayRuleForEmployee({ saturdayGroup }),
    latestShiftEnd: existingEmployee?.latestShiftEnd || supervisorOverride?.latestShiftEnd || "",
  };

  const existingIndex = employees.findIndex((employee) => getEmployeeUid(employee) === editingUid);
  if (existingIndex >= 0) {
    employees.splice(existingIndex, 1, employeeRecord);
  } else {
    employees.push(employeeRecord);
  }

  buildDefaultAssignments({ preserveAssignments: true });
  setDirtyAndAutosave("Employee saved.");
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
  state.selectedCells = state.selectedCells.filter((cellId) => parseCellId(cellId).employeeUid !== employeeUid);
  setDirtyAndAutosave("Employee removed.");
  render();
}

function buildDefaultAssignments({ preserveAssignments = true } = {}) {
  const previousAssignments = preserveAssignments ? cloneData(state.assignments) : {};
  const nextAssignments = {};

  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    const previousEmployeeAssignments = previousAssignments[employeeUid] ?? {};
    const defaultWeekPlan = generateDefaultWeekPlan(employee);
    nextAssignments[employeeUid] = {};

    weekDays.forEach((day) => {
      const shift = defaultWeekPlan[day] ?? "OFF";
      const priorAssignment = normalizeAssignment(previousEmployeeAssignments[day], shift);
      nextAssignments[employeeUid][day] = priorAssignment;

      if (!preserveAssignments) {
        nextAssignments[employeeUid][day] = createEmptyAssignment(shift);
      }

      if (day === "Saturday" && !["OFF", saturdayShift, "PTO"].includes(nextAssignments[employeeUid][day].shift)) {
        nextAssignments[employeeUid][day].shift = shift;
      }
    });
  });

  state.assignments = nextAssignments;
}

function generateDefaultWeekPlan(employee, weekType = state.currentWeekType) {
  const worksSaturday = doesEmployeeWorkSaturdayForWeekType(employee, weekType);
  const usesPartTimePattern = employee.employmentType === "part_time";
  const weekdaySlots = usesPartTimePattern ? (worksSaturday ? 3 : 4) : worksSaturday ? 4 : 5;
  const weekdayShiftOptions = getAvailableWeekdayShifts(employee);
  const fallbackTargetHours = employee.employmentType === "part_time" ? 20 : 40;
  const targetHours = Number(employee.targetHours ?? fallbackTargetHours) || fallbackTargetHours;
  const saturdayHours = worksSaturday ? getShiftHours(saturdayShift, employee) : 0;
  const weekdayPlan = chooseShiftsForTarget(
    Math.max(0, targetHours - saturdayHours),
    weekdaySlots,
    weekdayShiftOptions,
    employee
  );
  let weekdayIndex = 0;
  const plan = {};

  weekDays.forEach((day) => {
    if (day === "Saturday") {
      plan[day] = worksSaturday ? saturdayShift : "OFF";
      return;
    }

    if ((usesPartTimePattern || worksSaturday) && day === employee.fixedDayOff) {
      plan[day] = "OFF";
      return;
    }

    plan[day] = weekdayPlan[weekdayIndex] ?? "OFF";
    weekdayIndex += 1;
  });

  return plan;
}

function generateDefaultWeekPlanForWeekType(employee, weekType) {
  return generateDefaultWeekPlan(employee, weekType);
}

function getDefaultShift(employee, day, workingSaturday) {
  if (day === "Saturday") {
    return workingSaturday ? saturdayShift : "OFF";
  }

  if (workingSaturday && day === employee.fixedDayOff) {
    return "OFF";
  }

  const preferredDefault = employee.keyType === "A" ? "8:00-5:00" : "8:30-6:00";
  if (isShiftAllowedForEmployee(employee, day, preferredDefault)) {
    return preferredDefault;
  }

  return getAvailableWeekdayShifts(employee)[0] || "OFF";
}

function resetTaskToggles() {
  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    weekDays.forEach((day) => {
      const assignment = ensureAssignment(employeeUid, day);
      assignment.tasks = createEmptyTaskState();
      assignment.customTasks = [];
    });
  });
}

function scheduleEmployeesTo40Hours() {
  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    const defaultWeekPlan = generateDefaultWeekPlan(employee);

    weekDays.forEach((day) => {
      const assignment = ensureAssignment(employeeUid, day);
      assignment.shift = defaultWeekPlan[day] ?? "OFF";

      if (["OFF", "PTO"].includes(assignment.shift)) {
        assignment.tasks = createEmptyTaskState();
        assignment.customTasks = [];
        assignment.ptoHours = 0;
      }
    });
  });
}

function autoFillCoverageTasks() {
  scheduleEmployeesTo40Hours();

  weekDays.forEach((day) => {
    ensureCoverageShiftsForDay(day);
    limitNineAmStartsForDay(day);
  });

  rebalanceHoursAfterCoverage();

  const taskCounts = {
    openerAssigned: 0,
    closerAssigned: 0,
    nightDropAssigned: 0,
    driveThruAssigned: 0,
    openerCounts: new Map(),
    closerCounts: new Map(),
    nightDropCounts: new Map(),
    driveThruCounts: new Map(),
  };

  clearAutoCoverageTasks();
  weekDays.forEach((day) => {
    ensureCoverageShiftsForDay(day);
    limitNineAmStartsForDay(day);
    assignAutoCoverageTasksForDay(day, taskCounts);
  });

  rebalanceHoursWithCoverageLocked();
  weekDays.forEach((day) => {
    ensureCoverageShiftsForDay(day);
    limitNineAmStartsForDay(day, { coverageLocked: true });
  });

  const finalTaskCounts = {
    openerAssigned: 0,
    closerAssigned: 0,
    nightDropAssigned: 0,
    driveThruAssigned: 0,
    openerCounts: new Map(),
    closerCounts: new Map(),
    nightDropCounts: new Map(),
    driveThruCounts: new Map(),
  };

  clearAutoCoverageTasks();
  weekDays.forEach((day) => {
    assignAutoCoverageTasksForDay(day, finalTaskCounts);
  });

  setDirtyAndAutosave("Coverage auto-filled.");
  render();
  showToast(
    `Auto-filled ${finalTaskCounts.openerAssigned} openers, ${finalTaskCounts.closerAssigned} closers, ${finalTaskCounts.nightDropAssigned} night drops, and ${finalTaskCounts.driveThruAssigned} drive thru assignments.`
  );
}

function clearAutoCoverageTasks() {
  employees.forEach((employee) => {
    weekDays.forEach((day) => {
      const assignment = ensureAssignment(getEmployeeUid(employee), day);
      assignment.tasks.opener = false;
      assignment.tasks.closingLead = false;
      assignment.tasks.nightDrop = false;
      assignment.tasks.driveThru = false;
    });
  });
}

function assignAutoCoverageTasksForDay(day, taskCounts) {
  ensureFinalOpenerCoverage(day);

  const scheduledEmployees = getScheduledEmployeesForDay(day);
  const eligibleEmployees = scheduledEmployees.filter(({ employee }) => isLeadEligible(employee));
  const openingTime = getCoverageOpeningTime(day);
  const closingTime = getCoverageClosingTime(day);

  const openerCandidate = [...eligibleEmployees]
    .sort((left, right) => {
      const leftUid = getEmployeeUid(left.employee);
      const rightUid = getEmployeeUid(right.employee);
      const openerDelta = (taskCounts.openerCounts.get(leftUid) || 0) - (taskCounts.openerCounts.get(rightUid) || 0);
      if (openerDelta !== 0) {
        return openerDelta;
      }
      const leftStart = getShiftStart(left.assignment.shift) ?? Number.POSITIVE_INFINITY;
      const rightStart = getShiftStart(right.assignment.shift) ?? Number.POSITIVE_INFINITY;
      return leftStart - rightStart;
    })
    .find(({ employee, assignment }) => {
      const start = getShiftStart(assignment.shift);
      if (start === null || start !== openingTime) {
        return false;
      }
      return scheduledEmployees.some(({ employee: otherEmployee, assignment: otherAssignment }) => {
        if (getEmployeeUid(otherEmployee) === getEmployeeUid(employee)) {
          return false;
        }
        return shiftCoversTime(otherAssignment.shift, openingTime);
      });
    });

  if (openerCandidate) {
    openerCandidate.assignment.tasks.opener = true;
    const openerUid = getEmployeeUid(openerCandidate.employee);
    taskCounts.openerCounts.set(openerUid, (taskCounts.openerCounts.get(openerUid) || 0) + 1);
    taskCounts.openerAssigned += 1;
  }

  const closerCandidate = [...eligibleEmployees]
    .filter(({ employee }) => !openerCandidate || getEmployeeUid(employee) !== getEmployeeUid(openerCandidate.employee))
    .sort((left, right) => {
      const leftUid = getEmployeeUid(left.employee);
      const rightUid = getEmployeeUid(right.employee);
      const closerDelta = (taskCounts.closerCounts.get(leftUid) || 0) - (taskCounts.closerCounts.get(rightUid) || 0);
      if (closerDelta !== 0) {
        return closerDelta;
      }
      const leftEnd = getShiftEnd(left.assignment.shift) ?? 0;
      const rightEnd = getShiftEnd(right.assignment.shift) ?? 0;
      return rightEnd - leftEnd;
    })
    .find(({ employee, assignment }) => {
      const end = getShiftEnd(assignment.shift);
      if (end === null || end < closingTime) {
        return false;
      }
      const coworkersClosing = scheduledEmployees.filter(({ employee: otherEmployee, assignment: otherAssignment }) => {
        const otherEnd = getShiftEnd(otherAssignment.shift);
        if (otherEnd === null) {
          return false;
        }
        return otherEnd >= closingTime && getEmployeeUid(otherEmployee) !== getEmployeeUid(employee);
      });
      return coworkersClosing.length >= 3;
    });

  if (closerCandidate) {
    closerCandidate.assignment.tasks.closingLead = true;
    const closerUid = getEmployeeUid(closerCandidate.employee);
    taskCounts.closerCounts.set(closerUid, (taskCounts.closerCounts.get(closerUid) || 0) + 1);
    taskCounts.closerAssigned += 1;
  }

  const nightDropCandidates = [...scheduledEmployees]
    .filter(({ employee }) => !["Mike Sedillo", "Storm Anaya-Gonzales"].includes(employee.name))
    .sort((left, right) => {
      const leftUid = getEmployeeUid(left.employee);
      const rightUid = getEmployeeUid(right.employee);
      const countDelta = (taskCounts.nightDropCounts.get(leftUid) || 0) - (taskCounts.nightDropCounts.get(rightUid) || 0);
      if (countDelta !== 0) {
        return countDelta;
      }
      const leftStart = getShiftStart(left.assignment.shift) ?? Number.POSITIVE_INFINITY;
      const rightStart = getShiftStart(right.assignment.shift) ?? Number.POSITIVE_INFINITY;
      if (leftStart !== rightStart) {
        return leftStart - rightStart;
      }
      return getShiftHours(right.assignment.shift, right.employee) - getShiftHours(left.assignment.shift, left.employee);
    })
    .slice(0, 2);

  nightDropCandidates.forEach(({ employee, assignment }) => {
    assignment.tasks.nightDrop = true;
    const uid = getEmployeeUid(employee);
    taskCounts.nightDropCounts.set(uid, (taskCounts.nightDropCounts.get(uid) || 0) + 1);
    taskCounts.nightDropAssigned += 1;
  });

  const driveThruCandidate = [...scheduledEmployees]
    .filter(({ employee }) => !["Mike Sedillo", "Storm Anaya-Gonzales"].includes(employee.name))
    .sort((left, right) => {
      const leftUid = getEmployeeUid(left.employee);
      const rightUid = getEmployeeUid(right.employee);
      const countDelta = (taskCounts.driveThruCounts.get(leftUid) || 0) - (taskCounts.driveThruCounts.get(rightUid) || 0);
      if (countDelta !== 0) {
        return countDelta;
      }
      const hourDelta = getShiftHours(right.assignment.shift, right.employee) - getShiftHours(left.assignment.shift, left.employee);
      if (hourDelta !== 0) {
        return hourDelta;
      }
      const leftStart = getShiftStart(left.assignment.shift) ?? Number.POSITIVE_INFINITY;
      const rightStart = getShiftStart(right.assignment.shift) ?? Number.POSITIVE_INFINITY;
      return leftStart - rightStart;
    })
    .at(0);

  if (driveThruCandidate) {
    driveThruCandidate.assignment.tasks.driveThru = true;
    const driveUid = getEmployeeUid(driveThruCandidate.employee);
    taskCounts.driveThruCounts.set(driveUid, (taskCounts.driveThruCounts.get(driveUid) || 0) + 1);
    taskCounts.driveThruAssigned += 1;
  }
}

function ensureFinalOpenerCoverage(day) {
  const openingTime = getCoverageOpeningTime(day);
  let scheduledEmployees = getScheduledEmployeesForDay(day);
  let eligibleEmployees = scheduledEmployees.filter(({ employee }) => isLeadEligible(employee));

  let openingLead = eligibleEmployees.find(({ assignment }) => getShiftStart(assignment.shift) === openingTime);
  if (!openingLead) {
    const leadCandidate = chooseCoverageCandidate(eligibleEmployees, day, "open", { forceCoverage: true });
    if (leadCandidate) {
      setAssignmentToCoverageShift(leadCandidate.employee, day, leadCandidate.assignment, "open", { forceCoverage: true });
    }
  }

  scheduledEmployees = getScheduledEmployeesForDay(day);
  let openingStaff = scheduledEmployees.filter(({ assignment }) => getShiftStart(assignment.shift) === openingTime);
  if (openingStaff.length < 2) {
    const neededOpeners = 2 - openingStaff.length;
    const additionalOpeners = scheduledEmployees
      .filter(({ assignment }) => getShiftStart(assignment.shift) !== openingTime)
      .filter(({ employee }) => hasCoverageShiftOption(employee, day, "open"))
      .slice(0, neededOpeners);

    additionalOpeners.forEach(({ employee, assignment }) => {
      setAssignmentToCoverageShift(employee, day, assignment, "open");
    });
  }
}

function getScheduledEmployeesForDay(day) {
  return employees
    .map((employee) => ({
      employee,
      assignment: ensureAssignment(getEmployeeUid(employee), day),
    }))
    .filter(({ assignment }) => !["OFF", "PTO"].includes(assignment.shift));
}

function ensureCoverageShiftsForDay(day) {
  const openingTime = getCoverageOpeningTime(day);
  const closingTime = getCoverageClosingTime(day);

  const eligibleLeads = getScheduledEmployeesForDay(day).filter(({ employee }) => isLeadEligible(employee));
  const openerLead = chooseCoverageCandidate(eligibleLeads, day, "open");
  if (openerLead) {
    setAssignmentToCoverageShift(openerLead.employee, day, openerLead.assignment, "open");
  }

  let openingStaff = getScheduledEmployeesForDay(day).filter(
    ({ assignment }) => getShiftStart(assignment.shift) === openingTime
  );
  if (openingStaff.length < 2) {
    const neededOpeners = 2 - openingStaff.length;
    const additionalOpeners = getScheduledEmployeesForDay(day)
      .filter(({ employee, assignment }) => {
        const uid = getEmployeeUid(employee);
        return (
          getShiftStart(assignment.shift) !== openingTime &&
          (!openerLead || uid !== getEmployeeUid(openerLead.employee)) &&
          hasCoverageShiftOption(employee, day, "open")
        );
      })
      .slice(0, neededOpeners);

    additionalOpeners.forEach(({ employee, assignment }) => {
      setAssignmentToCoverageShift(employee, day, assignment, "open");
    });
  }

  const protectedOpeningStaff = getScheduledEmployeesForDay(day).filter(
    ({ assignment }) => getShiftStart(assignment.shift) === openingTime
  );
  const protectedOpeningUids = new Set(
    protectedOpeningStaff.map(({ employee }) => getEmployeeUid(employee))
  );

  const closingLeadPool = getScheduledEmployeesForDay(day).filter(
    ({ employee }) =>
      isLeadEligible(employee) &&
      !protectedOpeningUids.has(getEmployeeUid(employee))
  );
  const closerLead = chooseCoverageCandidate(closingLeadPool, day, "close");
  if (closerLead) {
    setAssignmentToCoverageShift(closerLead.employee, day, closerLead.assignment, "close");
  }

  let closingStaff = getScheduledEmployeesForDay(day).filter(
    ({ assignment }) => (getShiftEnd(assignment.shift) ?? 0) >= closingTime
  );
  if (closingStaff.length < 4) {
    const neededClosers = 4 - closingStaff.length;
    const additionalClosers = getScheduledEmployeesForDay(day)
      .filter(({ employee, assignment }) => {
        const uid = getEmployeeUid(employee);
        return (
          (getShiftEnd(assignment.shift) ?? 0) < closingTime &&
          !protectedOpeningUids.has(uid) &&
          (!closerLead || uid !== getEmployeeUid(closerLead.employee)) &&
          hasCoverageShiftOption(employee, day, "close")
        );
      })
      .slice(0, neededClosers);

    additionalClosers.forEach(({ employee, assignment }) => {
      setAssignmentToCoverageShift(employee, day, assignment, "close");
    });
  }
}

function limitNineAmStartsForDay(day, options = {}) {
  if (day === "Saturday") {
    return;
  }

  const nineAmStart = parseShiftTime("9:00");
  if (nineAmStart === null) {
    return;
  }

  let lateStarters = getScheduledEmployeesForDay(day).filter(
    ({ assignment }) => getShiftStart(assignment.shift) === nineAmStart
  );

  while (lateStarters.length > maxNineAmWeekdayStarts) {
    const bestCandidate = lateStarters
      .map(({ employee }) => getBestEarlierStartOption(employee, day, options))
      .filter(Boolean)
      .sort((left, right) => {
        if (left.targetDelta !== right.targetDelta) {
          return left.targetDelta - right.targetDelta;
        }
        if (left.hoursDelta !== right.hoursDelta) {
          return left.hoursDelta - right.hoursDelta;
        }
        if (left.start !== right.start) {
          return right.start - left.start;
        }
        return left.name.localeCompare(right.name);
      })
      .at(0);

    if (!bestCandidate) {
      break;
    }

    ensureAssignment(bestCandidate.employeeUid, day).shift = bestCandidate.shift;
    lateStarters = getScheduledEmployeesForDay(day).filter(
      ({ assignment }) => getShiftStart(assignment.shift) === nineAmStart
    );
  }
}

function getBestEarlierStartOption(employee, day, options = {}) {
  const employeeUid = getEmployeeUid(employee);
  const assignment = ensureAssignment(employeeUid, day);
  const currentShift = assignment.shift;
  const currentStart = getShiftStart(currentShift);
  const nineAmStart = parseShiftTime("9:00");
  if (currentStart !== nineAmStart) {
    return null;
  }

  const candidateOptions = getEarlierStartShiftOptions(employee, day, options);
  if (candidateOptions.length === 0) {
    return null;
  }

  const currentHours = getShiftHours(currentShift, employee);
  const currentTotalHours = getEmployeeScheduledHours(employee);
  const targetHours = getEmployeeTargetHours(employee);
  const tolerance = options.coverageLocked ? 0 : autoFillHourTolerance;

  const bestShift = [...candidateOptions]
    .sort((left, right) => {
      const leftNextTotal = currentTotalHours - currentHours + getShiftHours(left, employee);
      const rightNextTotal = currentTotalHours - currentHours + getShiftHours(right, employee);
      const leftTargetDelta = getAutoFillHourDelta(targetHours, leftNextTotal, tolerance);
      const rightTargetDelta = getAutoFillHourDelta(targetHours, rightNextTotal, tolerance);
      if (leftTargetDelta !== rightTargetDelta) {
        return leftTargetDelta - rightTargetDelta;
      }

      const leftHoursDelta = Math.abs(getShiftHours(left, employee) - currentHours);
      const rightHoursDelta = Math.abs(getShiftHours(right, employee) - currentHours);
      if (leftHoursDelta !== rightHoursDelta) {
        return leftHoursDelta - rightHoursDelta;
      }

      const leftStart = getShiftStart(left) ?? 0;
      const rightStart = getShiftStart(right) ?? 0;
      return rightStart - leftStart;
    })
    .at(0);

  if (!bestShift) {
    return null;
  }

  const nextTotalHours = currentTotalHours - currentHours + getShiftHours(bestShift, employee);
  return {
    employeeUid,
    name: employee.name,
    shift: bestShift,
    start: getShiftStart(bestShift) ?? 0,
    hoursDelta: Math.abs(getShiftHours(bestShift, employee) - currentHours),
    targetDelta: getAutoFillHourDelta(targetHours, nextTotalHours, tolerance),
  };
}

function getEarlierStartShiftOptions(employee, day, options = {}) {
  const employeeUid = getEmployeeUid(employee);
  const assignment = ensureAssignment(employeeUid, day);
  const currentStart = getShiftStart(assignment.shift);
  const openingTime = getCoverageOpeningTime(day);
  const baseOptions = options.coverageLocked
    ? getCoverageLockedRebalanceOptions(employee, day)
    : getRebalanceShiftOptions(employee, day);

  return [...new Set(baseOptions)].filter((shift) => {
    if (!isShiftTime(shift) || shift === assignment.shift) {
      return false;
    }

    const shiftStart = getShiftStart(shift);
    return shiftStart !== null && shiftStart >= openingTime && shiftStart < currentStart;
  });
}

function chooseCoverageCandidate(candidates, day, mode, options = {}) {
  return [...candidates]
    .filter(({ employee }) => hasCoverageShiftOption(employee, day, mode))
    .sort((left, right) => {
      const leftHours = getShiftHours(left.assignment.shift, left.employee);
      const rightHours = getShiftHours(right.assignment.shift, right.employee);
      if (mode === "open") {
        const leftStart = getShiftStart(left.assignment.shift) ?? Number.POSITIVE_INFINITY;
        const rightStart = getShiftStart(right.assignment.shift) ?? Number.POSITIVE_INFINITY;
        if (leftStart !== rightStart) {
          return leftStart - rightStart;
        }
      }
      if (mode === "close") {
        const leftEnd = getShiftEnd(left.assignment.shift) ?? 0;
        const rightEnd = getShiftEnd(right.assignment.shift) ?? 0;
        if (leftEnd !== rightEnd) {
          return rightEnd - leftEnd;
        }
      }
      return rightHours - leftHours;
    })
    .at(0);
}

function hasCoverageShiftOption(employee, day, mode) {
  return getCoverageShiftOptions(employee, day, mode).length > 0;
}

function setAssignmentToCoverageShift(employee, day, assignment, mode, options = {}) {
  const employeeUid = getEmployeeUid(employee);
  const currentShift = ensureAssignment(employeeUid, day).shift;
  const nextShift = chooseCoverageShift(employee, day, currentShift, mode, options);
  if (!nextShift) {
    return false;
  }
  ensureAssignment(employeeUid, day).shift = nextShift;
  return true;
}

function chooseCoverageShift(employee, day, currentShift, mode, options = {}) {
  const shiftOptions = getCoverageShiftOptions(employee, day, mode);
  if (shiftOptions.length === 0) {
    return "";
  }

  const currentHours = getShiftHours(currentShift, employee);
  const currentTotalHours = getEmployeeScheduledHours(employee);
  const targetHours = getEmployeeTargetHours(employee);
  return [...shiftOptions]
    .sort((left, right) => {
      const leftNextTotal = currentTotalHours - currentHours + getShiftHours(left, employee);
      const rightNextTotal = currentTotalHours - currentHours + getShiftHours(right, employee);
      const leftTargetDelta = getAutoFillHourDelta(
        targetHours,
        leftNextTotal,
        options.forceCoverage ? autoFillHourTolerance + 1 : autoFillHourTolerance
      );
      const rightTargetDelta = getAutoFillHourDelta(
        targetHours,
        rightNextTotal,
        options.forceCoverage ? autoFillHourTolerance + 1 : autoFillHourTolerance
      );
      if (leftTargetDelta !== rightTargetDelta) {
        return leftTargetDelta - rightTargetDelta;
      }

      const leftHoursDelta = Math.abs(getShiftHours(left, employee) - currentHours);
      const rightHoursDelta = Math.abs(getShiftHours(right, employee) - currentHours);
      if (leftHoursDelta !== rightHoursDelta) {
        return leftHoursDelta - rightHoursDelta;
      }
      if (mode === "open") {
        const leftEnd = getShiftEnd(left) ?? 0;
        const rightEnd = getShiftEnd(right) ?? 0;
        return rightEnd - leftEnd;
      }
      const leftStart = getShiftStart(left) ?? Number.POSITIVE_INFINITY;
      const rightStart = getShiftStart(right) ?? Number.POSITIVE_INFINITY;
      return leftStart - rightStart;
    })
    .at(0);
}

function getCoverageShiftOptions(employee, day, mode) {
  if (day === "Saturday") {
    return isShiftAllowedForEmployee(employee, day, saturdayShift) ? [saturdayShift] : [];
  }

  const openingTime = getCoverageOpeningTime(day);
  const closingTime = getCoverageClosingTime(day);
  return getAvailableWeekdayShifts(employee).filter((shift) => {
    if (!isShiftAllowedForEmployee(employee, day, shift)) {
      return false;
    }

    const start = getShiftStart(shift);
    const end = getShiftEnd(shift);
    if (mode === "open") {
      return start === openingTime;
    }
    if (mode === "close") {
      return end !== null && end >= closingTime;
    }
    return false;
  });
}

function getEmployeeTargetHours(employee) {
  const fallbackTargetHours = employee.employmentType === "part_time" ? 20 : 40;
  return Number(employee.targetHours ?? fallbackTargetHours) || fallbackTargetHours;
}

function getAutoFillHourDelta(targetHours, totalHours, tolerance = autoFillHourTolerance) {
  if (totalHours < targetHours) {
    return targetHours - totalHours;
  }
  if (totalHours <= targetHours + tolerance) {
    return 0;
  }
  return totalHours - (targetHours + tolerance);
}

function rebalanceHoursAfterCoverage() {
  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    const targetHours = getEmployeeTargetHours(employee);
    const adjustableDays = weekDays.filter((day) => isDayAdjustableForHours(employee, day));

    let improved = true;
    let attempts = 0;
    while (improved && attempts < 12) {
      improved = false;
      attempts += 1;
      const currentTotal = getEmployeeScheduledHours(employee);
      const currentDelta = getAutoFillHourDelta(targetHours, currentTotal);

      for (const day of adjustableDays) {
        const options = getRebalanceShiftOptions(employee, day);
        const assignment = ensureAssignment(employeeUid, day);
        let bestShift = assignment.shift;
        let bestDelta = currentDelta;

        options.forEach((optionShift) => {
          const nextTotal =
            currentTotal - getShiftHours(assignment.shift, employee) + getShiftHours(optionShift, employee);
          const nextDelta = getAutoFillHourDelta(targetHours, nextTotal);
          if (nextDelta < bestDelta) {
            bestDelta = nextDelta;
            bestShift = optionShift;
          }
        });

        if (bestShift !== assignment.shift) {
          ensureAssignment(employeeUid, day).shift = bestShift;
          improved = true;
          break;
        }
      }
    }
  });
}

function isDayAdjustableForHours(employee, day) {
  if (day === "Saturday") {
    return false;
  }

  const assignment = ensureAssignment(getEmployeeUid(employee), day);
  if (["PTO"].includes(assignment.shift)) {
    return false;
  }

  const openingTime = getCoverageOpeningTime(day);
  const closingTime = getCoverageClosingTime(day);
  const start = getShiftStart(assignment.shift);
  const end = getShiftEnd(assignment.shift);
  return start !== openingTime && (end ?? 0) < closingTime;
}

function getRebalanceShiftOptions(employee, day) {
  const assignment = ensureAssignment(getEmployeeUid(employee), day);
  const options = new Set([assignment.shift]);
  getAvailableWeekdayShifts(employee).forEach((shift) => {
    if (isShiftAllowedForEmployee(employee, day, shift)) {
      options.add(shift);
    }
  });
  if (day !== employee.fixedDayOff) {
    options.add("OFF");
  }
  return [...options];
}

function rebalanceHoursWithCoverageLocked() {
  employees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    const targetHours = getEmployeeTargetHours(employee);
    const adjustableDays = weekDays.filter((day) => isDayAdjustableWithCoverageLocked(employee, day));

    let improved = true;
    let attempts = 0;
    while (improved && attempts < 12) {
      improved = false;
      attempts += 1;
      const currentTotal = getEmployeeScheduledHours(employee);
      const currentDelta = getAutoFillHourDelta(targetHours, currentTotal, 0);

      for (const day of adjustableDays) {
        const assignment = ensureAssignment(employeeUid, day);
        const options = getCoverageLockedRebalanceOptions(employee, day);
        let bestShift = assignment.shift;
        let bestDelta = currentDelta;

        options.forEach((optionShift) => {
          const nextTotal =
            currentTotal - getShiftHours(assignment.shift, employee) + getShiftHours(optionShift, employee);
          const nextDelta = getAutoFillHourDelta(targetHours, nextTotal, 0);
          if (nextDelta < bestDelta) {
            bestDelta = nextDelta;
            bestShift = optionShift;
          }
        });

        if (bestShift !== assignment.shift) {
          ensureAssignment(employeeUid, day).shift = bestShift;
          improved = true;
          break;
        }
      }
    }
  });
}

function isDayAdjustableWithCoverageLocked(employee, day) {
  if (day === "Saturday") {
    return false;
  }

  const assignment = ensureAssignment(getEmployeeUid(employee), day);
  if (assignment.shift === "PTO") {
    return false;
  }

  return getCoverageLockedRebalanceOptions(employee, day).length > 1;
}

function getCoverageLockedRebalanceOptions(employee, day) {
  const assignment = ensureAssignment(getEmployeeUid(employee), day);
  const openingTime = getCoverageOpeningTime(day);
  const closingTime = getCoverageClosingTime(day);
  const openingStaffCount = getScheduledEmployeesForDay(day).filter(
    ({ assignment: dayAssignment }) => shiftCoversTime(dayAssignment.shift, openingTime)
  ).length;
  const closingStaffCount = getScheduledEmployeesForDay(day).filter(
    ({ assignment: dayAssignment }) => (getShiftEnd(dayAssignment.shift) ?? 0) >= closingTime
  ).length;

  const options = new Set([assignment.shift]);
  getAvailableWeekdayShifts(employee).forEach((shift) => {
    if (!isShiftAllowedForEmployee(employee, day, shift)) {
      return;
    }

    const supportsOpenNow = shiftCoversTime(assignment.shift, openingTime);
    const supportsCloseNow = (getShiftEnd(assignment.shift) ?? 0) >= closingTime;
    const supportsOpenNext = shiftCoversTime(shift, openingTime);
    const supportsCloseNext = (getShiftEnd(shift) ?? 0) >= closingTime;

    if (assignment.tasks.opener && !supportsOpenNext) {
      return;
    }
    if (assignment.tasks.closingLead && !supportsCloseNext) {
      return;
    }
    if (!assignment.tasks.opener && supportsOpenNow && openingStaffCount <= 2 && !supportsOpenNext) {
      return;
    }
    if (!assignment.tasks.closingLead && supportsCloseNow && closingStaffCount <= 4 && !supportsCloseNext) {
      return;
    }

    options.add(shift);
  });

  if (day !== employee.fixedDayOff) {
    const supportsOpenNow = shiftCoversTime(assignment.shift, openingTime);
    const supportsCloseNow = (getShiftEnd(assignment.shift) ?? 0) >= closingTime;
    if (
      !assignment.tasks.opener &&
      !assignment.tasks.closingLead &&
      !(supportsOpenNow && openingStaffCount <= 2) &&
      !(supportsCloseNow && closingStaffCount <= 4)
    ) {
      options.add("OFF");
    }
  }

  return [...options];
}

function getEmployeeSpecificWeekdayShifts(employee) {
  const shifts = [];
  if (employee?.latestShiftEnd === "5:00") {
    shifts.push(...earlyEndByFiveShifts);
  }
  return shifts;
}

function getEmployeeScheduledHours(employee) {
  const employeeUid = getEmployeeUid(employee);
  return weekDays.reduce(
    (total, day) => total + getAssignmentHours(ensureAssignment(employeeUid, day), employee),
    0
  );
}

function getAssignmentHours(assignment, employee = null) {
  if (!assignment) {
    return 0;
  }
  if (assignment.shift === "PTO") {
    return Number(assignment.ptoHours) || 0;
  }
  return getShiftHours(assignment.shift, employee);
}

function getShiftHours(shift, employee = null) {
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
  const deductLunch = employee?.employmentType !== "part_time";
  return rawHours >= 6 && deductLunch ? rawHours - 1 : rawHours;
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

function hasOpenerCoverageIssue(day) {
  return employees.some((employee) => {
    const openerAssignment = ensureAssignment(getEmployeeUid(employee), day);
    if (!openerAssignment?.tasks.opener || ["OFF", "PTO"].includes(openerAssignment.shift)) {
      return false;
    }

    const openerStart = getShiftStart(openerAssignment.shift);
    if (openerStart === null) {
      return true;
    }

    return !employees.some((otherEmployee) => {
      if (getEmployeeUid(otherEmployee) === getEmployeeUid(employee)) {
        return false;
      }

      const otherAssignment = ensureAssignment(getEmployeeUid(otherEmployee), day);
      return shiftCoversTime(otherAssignment?.shift, openerStart);
    });
  });
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

function getShiftEnd(shift) {
  if (!shift || ["OFF", "PTO"].includes(shift) || !shift.includes("-")) {
    return null;
  }
  return parseShiftTime(shift.split("-")[1]);
}

function getCoverageOpeningTime(day) {
  return parseShiftTime(day === "Saturday" ? "8:30" : "8:00");
}

function getCoverageClosingTime(day) {
  return parseShiftTime(day === "Saturday" ? "1:30" : "6:00");
}

function isLeadEligible(employee) {
  return employee.leadEligible === true;
}

function formatHours(hours) {
  return Number.isInteger(hours) ? String(hours) : Number(hours).toFixed(1);
}

function populateShiftEditorOptions(currentShift, day, employee = null) {
  cellEditorShift.innerHTML = "";
  const editorPresets = [...shiftPresets];
  getEmployeeSpecificWeekdayShifts(employee).forEach((shift) => {
    if (!editorPresets.includes(shift)) {
      editorPresets.splice(0, 0, shift);
    }
  });
  if (employee?.employmentType === "part_time" && !editorPresets.includes(partTimeDefaultShift)) {
    editorPresets.splice(0, 0, partTimeDefaultShift);
  }

  const optionGroups = [
    {
      label: "Early Start",
      options: earlyEndByFiveShifts,
    },
    {
      label: "Full Day",
      options: ["8:00-6:00", "8:30-6:00", "9:00-6:00"],
    },
    {
      label: "Early Out",
      options: ["8:00-5:30", "8:30-5:30", "8:00-5:00", "8:30-5:00", "9:00-5:00"],
    },
    {
      label: "Part Time",
      options: [partTimeDefaultShift],
    },
    {
      label: "Status",
      options: [saturdayShift, "OFF", "PTO"],
    },
  ];

  optionGroups.forEach((group) => {
    const availableOptions = group.options.filter((preset) => editorPresets.includes(preset));
    if (availableOptions.length === 0) {
      return;
    }

    const optgroup = document.createElement("optgroup");
    optgroup.label = group.label;
    availableOptions.forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset;
      option.textContent = getShiftOptionLabel(preset);
      if (!isShiftAllowedForEmployee(employee, day, preset) && preset !== currentShift) {
        option.disabled = true;
      }
      optgroup.appendChild(option);
    });
    cellEditorShift.appendChild(optgroup);
  });

  const customOption = document.createElement("option");
  customOption.value = customShiftValue;
  customOption.textContent = "Custom...";
  if (day === "Saturday") {
    customOption.disabled = true;
  }
  cellEditorShift.appendChild(customOption);

  if (currentShift && !shiftPresets.includes(currentShift)) {
    const customCurrent = document.createElement("option");
    customCurrent.value = currentShift;
    customCurrent.textContent = currentShift;
    cellEditorShift.appendChild(customCurrent);
  }
}

async function updateAssignmentShift(employee, day, assignment, nextShift) {
  if (nextShift === customShiftValue) {
    const customShift = await askForCustomShift(assignment.shift);
    if (!customShift) {
      renderCellEditor();
      return;
    }
    nextShift = customShift;
  }

  if (!isShiftAllowedForEmployee(employee, day, nextShift)) {
    renderCellEditor();
    return;
  }

  assignment.shift = nextShift;
  if (["OFF", "PTO"].includes(assignment.shift)) {
    assignment.tasks = createEmptyTaskState();
    assignment.customTasks = [];
    assignment.cellColor = "";
  }
  if (assignment.shift !== "PTO") {
    assignment.ptoHours = 0;
  }
  setDirtyAndAutosave("Shift updated.");
  render();
}

function handleCellClick(event, cellId) {
  if (event.metaKey || event.ctrlKey) {
    clearPendingCellClickSequence();
    toggleCellSelection(cellId);
    render();
    return;
  }

  queueCellClickAction(cellId);
}

function openCellEditorForCell(cellId) {
  selectCell(cellId);
  render();
}

function selectCell(cellId) {
  state.selectedCells = [cellId];
  state.activeCell = cellId;
  state.bulkEditDraft = null;
}

function toggleCellSelection(cellId) {
  const exists = state.selectedCells.includes(cellId);
  if (exists) {
    state.selectedCells = state.selectedCells.filter((entry) => entry !== cellId);
  } else {
    state.selectedCells = [...state.selectedCells, cellId];
  }

  state.activeCell = state.selectedCells.length === 1 ? state.selectedCells[0] : null;
  state.bulkEditDraft = state.selectedCells.length > 1 ? state.bulkEditDraft || initializeBulkEditDraft() : null;
}

function clearSelection() {
  state.selectedCells = [];
  state.activeCell = null;
  state.bulkEditDraft = null;
}

function clearPendingCellClickSequence() {
  if (cellClickSequence?.timer) {
    window.clearTimeout(cellClickSequence.timer);
  }
  cellClickSequence = null;
}

function queueCellClickAction(cellId) {
  if (cellClickSequence?.cellId === cellId) {
    window.clearTimeout(cellClickSequence.timer);
    cellClickSequence.count += 1;
  } else {
    clearPendingCellClickSequence();
    cellClickSequence = {
      cellId,
      count: 1,
      timer: null,
    };
  }

  cellClickSequence.timer = window.setTimeout(() => {
    const pending = cellClickSequence;
    clearPendingCellClickSequence();
    if (!pending) {
      return;
    }

    if (pending.count >= 3) {
      applyQuickCellShortcut(pending.cellId, "PTO");
      return;
    }

    if (pending.count === 2) {
      applyQuickCellShortcut(pending.cellId, "OFF");
      return;
    }

    selectCell(pending.cellId);
    render();
  }, 280);
}

function applyQuickCellShortcut(cellId, shortcutType) {
  const { employeeUid, day } = parseCellId(cellId);
  const employee = employees.find((entry) => getEmployeeUid(entry) === employeeUid);
  if (!employee) {
    return;
  }

  const assignment = ensureAssignment(employeeUid, day);
  selectCell(cellId);

  if (shortcutType === "OFF") {
    assignment.shift = "OFF";
    assignment.tasks = createEmptyTaskState();
    assignment.customTasks = [];
    assignment.cellColor = "";
    assignment.ptoHours = 0;
    setDirtyAndAutosave("Cell set to OFF.");
    render();
    return;
  }

  if (shortcutType === "PTO") {
    const ptoHours = getQuickPtoHours(employee, day, assignment);
    assignment.shift = "PTO";
    assignment.tasks = createEmptyTaskState();
    assignment.customTasks = [];
    assignment.cellColor = "";
    assignment.ptoHours = ptoHours;
    setDirtyAndAutosave("Cell set to PTO.");
    render();
  }
}

function getQuickPtoHours(employee, day, assignment) {
  const currentHours = getShiftHours(assignment.shift, employee);
  if (currentHours > 0) {
    return currentHours;
  }

  const defaultShift = getDefaultShift(employee, day, doesEmployeeWorkSaturday(employee));
  const defaultHours = getShiftHours(defaultShift, employee);
  return defaultHours > 0 ? defaultHours : employee.employmentType === "part_time" ? 5 : 8;
}

function startCellEditorDrag(event) {
  if (event.target.closest("button, input, select, textarea, label")) {
    return;
  }

  event.preventDefault();
  cellEditorDragState = {
    startX: event.clientX,
    moved: false,
    previewDock: state.cellEditorDock,
    originalWidth: cellEditor.getBoundingClientRect().width,
    pointerId: event.pointerId,
  };

  cellEditor.classList.add("is-dragging");
  cellEditorHeader.classList.add("is-dragging");
  cellEditor.style.width = `${cellEditorDragState.originalWidth}px`;
  cellEditorDockOverlay.classList.remove("is-hidden");
  if (cellEditorHeader.setPointerCapture) {
    try {
      cellEditorHeader.setPointerCapture(event.pointerId);
    } catch (error) {
      console.warn("Pointer capture unavailable for cell editor drag.", error);
    }
  }
  document.addEventListener("pointermove", onCellEditorDrag);
  document.addEventListener("pointerup", endCellEditorDrag);
  document.addEventListener("pointercancel", endCellEditorDrag);
}

function onCellEditorDrag(event) {
  if (!cellEditorDragState || event.pointerId !== cellEditorDragState.pointerId) {
    return;
  }

  const deltaX = event.clientX - cellEditorDragState.startX;
  if (Math.abs(deltaX) > 12) {
    cellEditorDragState.moved = true;
  }

  const midpoint = window.innerWidth / 2;
  const neutralZone = 140;
  dockZoneLeft.classList.remove("is-active");
  dockZoneRight.classList.remove("is-active");

  if (!cellEditorDragState.moved) {
    return;
  }

  if (event.clientX < midpoint - neutralZone) {
    dockZoneLeft.classList.add("is-active");
    cellEditorDragState.previewDock = "left";
  } else if (event.clientX > midpoint + neutralZone) {
    dockZoneRight.classList.add("is-active");
    cellEditorDragState.previewDock = "right";
  } else {
    cellEditorDragState.previewDock = state.cellEditorDock;
  }
}

function endCellEditorDrag(event) {
  if (!cellEditorDragState || event.pointerId !== cellEditorDragState.pointerId) {
    return;
  }

  const moved = cellEditorDragState.moved;
  const previewDock = getDockTargetFromClientX(event.clientX, cellEditorDragState.previewDock);
  cellEditorDragState = null;
  cellEditor.classList.remove("is-dragging");
  cellEditorHeader.classList.remove("is-dragging");
  if (cellEditorHeader.hasPointerCapture?.(event.pointerId)) {
    cellEditorHeader.releasePointerCapture(event.pointerId);
  }
  document.removeEventListener("pointermove", onCellEditorDrag);
  document.removeEventListener("pointerup", endCellEditorDrag);
  document.removeEventListener("pointercancel", endCellEditorDrag);
  cellEditor.style.width = "";
  cellEditorDockOverlay.classList.add("is-hidden");
  dockZoneLeft.classList.remove("is-active");
  dockZoneRight.classList.remove("is-active");

  if (!moved) {
    return;
  }

  state.cellEditorDock = previewDock || state.cellEditorDock;
  setDirtyAndAutosave();
  renderCellEditor();
}

function getDockTargetFromClientX(clientX, fallbackDock = state.cellEditorDock) {
  const midpoint = window.innerWidth / 2;
  const neutralZone = 140;
  if (clientX < midpoint - neutralZone) {
    return "left";
  }
  if (clientX > midpoint + neutralZone) {
    return "right";
  }
  return fallbackDock;
}

function isBulkEditing() {
  return state.selectedCells.length > 1;
}

function getSingleSelectedAssignment() {
  const cellId = state.selectedCells[0];
  if (!cellId) {
    return null;
  }

  const { employeeUid, day } = parseCellId(cellId);
  const employee = employees.find((entry) => getEmployeeUid(entry) === employeeUid);
  const assignment = employee ? ensureAssignment(employeeUid, day) : null;
  if (!employee || !assignment) {
    return null;
  }

  return { employee, day, assignment };
}

function getSelectionHasSaturdayOnly() {
  return state.selectedCells.length > 0 && state.selectedCells.every((cellId) => parseCellId(cellId).day === "Saturday");
}

async function handleBulkCustomShift() {
  if (getSelectionHasSaturdayOnly()) {
    return;
  }
  const customShift = await askForCustomShift();
  if (!customShift) {
    return;
  }
  state.bulkEditDraft.shift = customShift;
  state.bulkEditDraft.shiftChanged = true;
  cellEditorShift.value = customShift;
  syncPtoFieldVisibility({
    bulkMode: true,
    shiftValue: customShift,
  });
  cellEditorPtoHours.disabled = true;
  applyBulkUpdate(
    state.selectedCells,
    {
      shift: state.bulkEditDraft.shift,
      shiftChanged: true,
    },
    { preserveDraft: true }
  );
}

function applyBulkUpdate(selectedCellIds, updates, options = {}) {
  const normalizedIds = [...new Set(selectedCellIds)];
  if (normalizedIds.length === 0) {
    return;
  }

  const nextUpdates = {
    shift: updates.shift,
    shiftChanged: Boolean(updates.shiftChanged),
    ptoHours: updates.ptoHours,
    ptoHoursChanged: Boolean(updates.ptoHoursChanged),
    note: updates.note,
    noteChanged: Boolean(updates.noteChanged),
    noteColor: updates.noteColor,
    noteColorChanged: Boolean(updates.noteColorChanged),
    cellColor: updates.cellColor,
    cellColorChanged: Boolean(updates.cellColorChanged),
    taskActions: updates.taskActions || {},
    customTaskActions: updates.customTaskActions || {},
  };

  normalizedIds.forEach((cellId) => {
    const { employeeUid, day } = parseCellId(cellId);
    const assignment = ensureAssignment(employeeUid, day);

    if (nextUpdates.shiftChanged) {
      const nextShift = nextUpdates.shift;
      const employee = employees.find((entry) => getEmployeeUid(entry) === employeeUid);
      if (isShiftAllowedForEmployee(employee, day, nextShift)) {
        assignment.shift = nextShift;
        if (["OFF", "PTO"].includes(nextShift)) {
          assignment.tasks = createEmptyTaskState();
          assignment.customTasks = [];
          assignment.cellColor = "";
        }
        if (nextShift !== "PTO") {
          assignment.ptoHours = 0;
        }
      }
    }

    if (nextUpdates.ptoHoursChanged && assignment.shift === "PTO") {
      assignment.ptoHours = sanitizeHoursInput(nextUpdates.ptoHours);
    }

    if (nextUpdates.noteChanged) {
      assignment.note = nextUpdates.note;
    }

    if (nextUpdates.noteColorChanged) {
      assignment.noteColor = nextUpdates.noteColor;
    }

    if (nextUpdates.cellColorChanged) {
      assignment.cellColor = nextUpdates.cellColor;
    }

    Object.entries(nextUpdates.taskActions).forEach(([taskId, action]) => {
      if (!action || ["OFF", "PTO"].includes(assignment.shift)) {
        return;
      }
      assignment.tasks[taskId] = action === "add";
    });

    Object.entries(nextUpdates.customTaskActions).forEach(([taskId, action]) => {
      if (!action || ["OFF", "PTO"].includes(assignment.shift)) {
        return;
      }
      updateCustomTaskSelection(assignment, taskId, action === "add");
    });
  });

  if (!options.preserveDraft) {
    state.bulkEditDraft = initializeBulkEditDraft();
  }
  setDirtyAndAutosave(options.message || "");
  if (options.preserveDraft) {
    renderBody();
    renderCoverage();
    renderEmployeeRoster();
    renderSaveStatus();
    return;
  }
  render();
}

function resetSelectedCellsToDefault(selectedCellIds) {
  const normalizedIds = [...new Set(selectedCellIds)];

  normalizedIds.forEach((cellId) => {
    const { employeeUid, day } = parseCellId(cellId);
    const employee = employees.find((entry) => getEmployeeUid(entry) === employeeUid);
    if (!employee) {
      return;
    }

    const workingSaturday = doesEmployeeWorkSaturday(employee);
    const shift = getDefaultShift(employee, day, workingSaturday);
    state.assignments[employeeUid][day] = createEmptyAssignment(shift);
  });

  state.bulkEditDraft = initializeBulkEditDraft();
  setDirtyAndAutosave(`Reset ${normalizedIds.length} selected cells.`);
  render();
}

function updateCustomTaskSelection(assignment, taskId, shouldInclude) {
  const next = new Set(assignment.customTasks);
  if (shouldInclude) {
    next.add(taskId);
  } else {
    next.delete(taskId);
  }
  assignment.customTasks = [...next];
}

function getDefaultSaturdayRuleForEmployee(employee) {
  if (employee.saturdayRule?.workWeeks?.length) {
    return {
      workWeeks: employee.saturdayRule.workWeeks.filter((week) => ["Week A", "Week B", "Week C"].includes(week)),
      label: employee.saturdayRule.label || "",
    };
  }

  if (employee.saturdayGroup === 2) {
    return createSaturdayRule(["Week B"], "Every other Saturday");
  }
  return createSaturdayRule(["Week A", "Week C"], "Every other Saturday");
}

function doesEmployeeWorkSaturday(employee) {
  return doesEmployeeWorkSaturdayForWeekType(employee, state.currentWeekType);
}

function doesEmployeeWorkSaturdayForWeekType(employee, weekType) {
  if (weekType === "Custom") {
    return false;
  }

  const saturdayRule = getDefaultSaturdayRuleForEmployee(employee);
  return saturdayRule.workWeeks.includes(weekType);
}

function getAvailableWeekdayShifts(employee) {
  if (employee?.employmentType === "part_time") {
    return [partTimeDefaultShift].filter((shift) => isShiftAllowedForEmployee(employee, "Monday", shift));
  }

  const shifts = [...shiftPresets];
  return shifts.filter((shift, index) => shifts.indexOf(shift) === index).filter((shift) => {
    if (["OFF", "PTO", customShiftValue, saturdayShift].includes(shift)) {
      return false;
    }
    return isShiftAllowedForEmployee(employee, "Monday", shift);
  });
}

function isShiftAllowedForEmployee(employee, day, shift) {
  if (!employee || !shift || ["OFF", "PTO"].includes(shift)) {
    return true;
  }

  if (day === "Saturday") {
    return shift === saturdayShift;
  }

  if (!employee.latestShiftEnd || !isShiftTime(shift)) {
    return true;
  }

  const endTime = shift.split("-")[1];
  const endMinutes = parseShiftTime(endTime);
  const latestEndMinutes = parseShiftTime(employee.latestShiftEnd);
  if (endMinutes === null || latestEndMinutes === null) {
    return true;
  }

  return endMinutes <= latestEndMinutes;
}

function applyCellVisualState(cell, shiftDisplay, assignment) {
  const color = assignment.cellColor || "";
  cell.style.backgroundColor = color || "";
  const textColor = color ? getReadableTextColor(color) : "";
  shiftDisplay.style.color = textColor || "";
}

function getReadableTextColor(hexColor) {
  const normalized = hexColor.replace("#", "");
  if (normalized.length !== 6) {
    return "#111111";
  }
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.6 ? "#111111" : "#ffffff";
}

function ensureAssignment(employeeUid, day) {
  state.assignments[employeeUid] ||= {};
  state.assignments[employeeUid][day] = normalizeAssignment(state.assignments[employeeUid][day], "OFF");
  return state.assignments[employeeUid][day];
}

function normalizeAssignment(assignment, fallbackShift) {
  const nextAssignment = assignment ? cloneData(assignment) : {};
  return {
    shift: nextAssignment.shift ?? fallbackShift,
    note: nextAssignment.note ?? "",
    noteColor: nextAssignment.noteColor ?? "none",
    cellColor: nextAssignment.cellColor ?? "",
    ptoHours: sanitizeHoursInput(nextAssignment.ptoHours ?? 0),
    tasks: {
      ...createEmptyTaskState(),
      ...(nextAssignment.tasks || {}),
    },
    customTasks: Array.isArray(nextAssignment.customTasks) ? nextAssignment.customTasks.filter(Boolean) : [],
  };
}

function saveAutosaveDraft() {
  const payload = getSerializableState();
  const now = new Date().toISOString();
  const draftName = getAutosaveDraftName(payload);
  const wrapper = {
    id: "autosave",
    name: draftName,
    createdAt: payload.createdAt || now,
    updatedAt: now,
    version: scheduleDataVersion,
    payload,
  };

  try {
    localStorage.setItem(autosaveStorageKey, JSON.stringify(wrapper));
    if (!state.loadedSaveId) {
      state.loadedSaveName = draftName;
    }
    state.lastAutosavedAt = now;
    state.unsavedChanges = false;
    renderSaveStatus();
  } catch (error) {
    console.warn("Autosave failed.", error);
  }
}

function loadAutosaveDraft() {
  try {
    const raw = localStorage.getItem(autosaveStorageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return normalizeLoadedSchedule(parsed);
  } catch (error) {
    console.warn("Autosave draft could not be loaded.", error);
    return null;
  }
}

function saveNamedSchedule(name, data) {
  const schedules = getStoredNamedSchedules();
  const now = new Date().toISOString();
  const existing = state.loadedSaveId
    ? schedules.find((entry) => entry.id === state.loadedSaveId && entry.name === state.loadedSaveName && name === state.loadedSaveName)
    : null;
  const id = existing?.id || `save-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = existing?.createdAt || now;
  const nextEntry = {
    id,
    name,
    createdAt,
    updatedAt: now,
    version: scheduleDataVersion,
    payload: data,
  };
  const nextSchedules = schedules.filter((entry) => entry.id !== id);
  nextSchedules.push(nextEntry);

  try {
    localStorage.setItem(savedSchedulesStorageKey, JSON.stringify(nextSchedules));
    state.loadedSaveId = id;
    state.loadedSaveName = name;
    state.unsavedChanges = false;
    renderSaveStatus();
    showToast("Saved successfully.");
    renderSavedSchedulesList();
  } catch (error) {
    console.warn("Named save failed.", error);
    showToast("Saving failed.");
  }
}

function loadNamedSchedule(id) {
  const schedules = getStoredNamedSchedules();
  const entry = schedules.find((item) => item.id === id);
  if (!entry) {
    showToast("That save could not be found.");
    return;
  }

  const normalized = normalizeLoadedSchedule(entry);
  if (!normalized) {
    showToast("That save could not be loaded.");
    return;
  }

  applyLoadedData(normalized, {
    loadedName: entry.name,
    loadedId: entry.id,
    markClean: true,
  });
  saveAutosaveDraft();
  render();
  closeModal(loadSchedulesModal);
  showToast(`Loaded ${entry.name}.`);
}

function deleteNamedSchedule(id) {
  const schedules = getStoredNamedSchedules().filter((entry) => entry.id !== id);
  try {
    localStorage.setItem(savedSchedulesStorageKey, JSON.stringify(schedules));
    if (state.loadedSaveId === id) {
      state.loadedSaveId = "";
      state.loadedSaveName = getAutosaveDraftName();
    }
    renderSaveStatus();
    showToast("Deleted save.");
  } catch (error) {
    console.warn("Delete save failed.", error);
    showToast("Delete failed.");
  }
}

async function exportSchedule(data) {
  const weekLabel = state.currentWeekType.toLowerCase().replace(/\s+/g, "");
  const safeName = slugify(state.loadedSaveName || "schedule");
  const filename =
    state.loadedSaveId
      ? `custom-schedule-${safeName}.json`
      : `schedule-${weekLabel}-${formatDateInput(state.weekStart)}.json`;

  const exportPayload = {
    id: state.loadedSaveId || "",
    name: state.loadedSaveName || getAutosaveDraftName(data),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: scheduleDataVersion,
    payload: data,
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  if ("showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: "JSON Schedule Export",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      showToast("Exported successfully.");
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
      console.warn("Native export failed, falling back to download.", error);
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Exported successfully.");
}

async function importSchedule(file) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const normalized = normalizeLoadedSchedule(parsed);
    if (!normalized) {
      throw new Error("Invalid save format.");
    }

    applyLoadedData(normalized, {
      loadedName: parsed.name || file.name.replace(/\.json$/i, ""),
      loadedId: parsed.id || "",
      markClean: true,
    });
    saveAutosaveDraft();
    render();
    showToast("Imported successfully.");
  } catch (error) {
    console.warn("Import failed.", error);
    showToast("Invalid file.");
  }
}

function getStoredNamedSchedules() {
  try {
    const raw = localStorage.getItem(savedSchedulesStorageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    console.warn("Saved schedules could not be read.", error);
    return [];
  }
}

function normalizeLoadedSchedule(raw) {
  const wrapper = raw && raw.payload ? raw : { payload: raw };
  const payload = wrapper.payload;
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const sourceVersion = wrapper.version || payload.version || 1;
  const normalizedWeekType = ["Week A", "Week B", "Week C", "Custom"].includes(payload.currentWeekType)
    ? payload.currentWeekType
    : "Week A";

  const normalizedEmployees = Array.isArray(payload.employees) ? cloneData(payload.employees) : cloneData(defaultEmployees);
  if (sourceVersion < 3) {
    normalizedEmployees.forEach(applySupervisorDefaultsToEmployee);
  }
  hydrateEmployees(normalizedEmployees);

  const normalizedEvents = createDefaultDayEvents();
  if (payload.dayEvents && typeof payload.dayEvents === "object") {
    weekDays.forEach((day) => {
      const saved = payload.dayEvents[day];
      if (typeof saved === "string") {
        normalizedEvents[day] = { text: saved, color: "none" };
      } else if (saved && typeof saved === "object") {
        normalizedEvents[day] = {
          text: saved.text ?? "",
          color: saved.color ?? "none",
        };
      }
    });
  }

  const normalizedAssignments = {};
  const rawAssignments = payload.assignments && typeof payload.assignments === "object" ? payload.assignments : {};
  normalizedEmployees.forEach((employee) => {
    const employeeUid = getEmployeeUid(employee);
    normalizedAssignments[employeeUid] = {};
    const defaultWeekPlan = generateDefaultWeekPlanForWeekType(employee, normalizedWeekType);
    weekDays.forEach((day) => {
      if (sourceVersion < 3) {
        normalizedAssignments[employeeUid][day] = createEmptyAssignment(defaultWeekPlan[day] ?? "OFF");
        return;
      }
      normalizedAssignments[employeeUid][day] = normalizeAssignment(
        rawAssignments[employeeUid]?.[day],
        defaultWeekPlan[day] ?? "OFF"
      );
    });
  });

  const normalizedCustomTasks = Array.isArray(payload.customTasks)
    ? payload.customTasks
        .filter((task) => task && typeof task.label === "string" && task.label.trim())
        .map((task) => ({
          id: task.id || `task-${slugify(task.label)}-${Math.random().toString(36).slice(2, 6)}`,
          label: task.label.trim(),
          color: customTaskColorOptions.some((option) => option.value === task.color)
            ? task.color
            : customTaskColorOptions[0].value,
        }))
    : [];

  return {
    id: wrapper.id || "",
    name: wrapper.name || "Imported Schedule",
    createdAt: wrapper.createdAt || "",
    updatedAt: wrapper.updatedAt || "",
    version: sourceVersion,
    payload: {
      version: sourceVersion,
      currentWeekType: normalizedWeekType,
      cellEditorDock: payload.cellEditorDock === "left" ? "left" : "right",
      weekStart: payload.weekStart || formatDateInput(getMonday(new Date())),
      employees: normalizedEmployees,
      assignments: normalizedAssignments,
      dayEvents: normalizedEvents,
      customTasks: normalizedCustomTasks,
    },
  };
}

function applyLoadedData(normalized, options = {}) {
  const payload = normalized.payload;
  employees = payload.employees;
  hydrateEmployees(employees);
  state.currentWeekType = payload.currentWeekType || "Week A";
  state.cellEditorDock = payload.cellEditorDock === "left" ? "left" : "right";
  state.weekStart = getMonday(new Date(`${payload.weekStart}T12:00:00`));
  state.assignments = payload.assignments || {};
  state.customTasks = payload.customTasks || [];
  weekDays.forEach((day) => {
    dayEvents[day] = payload.dayEvents?.[day] || { text: "", color: "none" };
  });
  clearSelection();
  resetEmployeeForm();
  state.loadedSaveId = options.loadedId ?? normalized.id ?? "";
  state.loadedSaveName =
    options.loadedName || normalized.name || (state.loadedSaveId ? "Loaded Schedule" : getAutosaveDraftName(payload));
  state.lastAutosavedAt = options.lastAutosavedAt || normalized.updatedAt || "";
  state.unsavedChanges = options.markClean ? false : state.unsavedChanges;
}

function getAutosaveDraftName(payload = null) {
  const source = payload || getSerializableState();
  const weekType = source.currentWeekType || state.currentWeekType || "Week A";
  const weekStartValue =
    source.weekStart ||
    (state.weekStart instanceof Date ? formatDateInput(state.weekStart) : formatDateInput(getMonday(new Date())));
  return `${weekType} Draft - ${weekStartValue}`;
}

function getCurrentScheduleLabel() {
  return state.loadedSaveId ? state.loadedSaveName || "Loaded Schedule" : getAutosaveDraftName();
}

function getSerializableState() {
  return {
    version: scheduleDataVersion,
    weekStart: formatDateInput(state.weekStart),
    currentWeekType: state.currentWeekType,
    cellEditorDock: state.cellEditorDock,
    employees: cloneData(employees),
    assignments: cloneData(state.assignments),
    dayEvents: cloneData(dayEvents),
    customTasks: cloneData(state.customTasks),
  };
}

function migrateLegacyState() {
  try {
    const raw = localStorage.getItem(legacyStorageKey);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return normalizeLoadedSchedule(parsed);
  } catch (error) {
    console.warn("Legacy save migration failed.", error);
    return null;
  }
}

function queueAutosave() {
  window.clearTimeout(autosaveTimer);
  autosaveTimer = window.setTimeout(() => {
    saveAutosaveDraft();
  }, 350);
}

function setDirtyAndAutosave(message = "") {
  if (!state.loadedSaveId) {
    state.loadedSaveName = getAutosaveDraftName();
  }
  state.unsavedChanges = true;
  renderSaveStatus();
  queueAutosave();
  if (message) {
    showToast(message);
  }
}

function createCustomTask(label, color = customTaskColorOptions[0].value) {
  const duplicate = state.customTasks.some(
    (task) => task.label.trim().toLowerCase() === label.trim().toLowerCase()
  );
  if (duplicate) {
    showToast("That custom task already exists.");
    return;
  }

  const task = {
    id: `task-${slugify(label)}-${Math.random().toString(36).slice(2, 6)}`,
    label,
    color: customTaskColorOptions.some((option) => option.value === color)
      ? color
      : customTaskColorOptions[0].value,
  };
  state.customTasks.push(task);
  setDirtyAndAutosave("Custom task added.");
  render();
}

function updateCustomTask(taskId, label, color = customTaskColorOptions[0].value) {
  const task = state.customTasks.find((entry) => entry.id === taskId);
  if (!task) {
    return;
  }
  task.label = label;
  task.color = customTaskColorOptions.some((option) => option.value === color)
    ? color
    : customTaskColorOptions[0].value;
  setDirtyAndAutosave("Custom task updated.");
  render();
}

function deleteCustomTask(taskId) {
  state.customTasks = state.customTasks.filter((task) => task.id !== taskId);
  Object.values(state.assignments).forEach((employeeAssignments) => {
    weekDays.forEach((day) => {
      const assignment = employeeAssignments[day];
      if (assignment) {
        assignment.customTasks = (assignment.customTasks || []).filter((entry) => entry !== taskId);
      }
    });
  });
  setDirtyAndAutosave("Custom task deleted.");
  render();
}

function setCellColor(cellId, color) {
  const { employeeUid, day } = parseCellId(cellId);
  ensureAssignment(employeeUid, day).cellColor = color;
}

function clearCellColor(cellId) {
  const { employeeUid, day } = parseCellId(cellId);
  ensureAssignment(employeeUid, day).cellColor = "";
}

function getCellId(employeeUid, day) {
  return `${employeeUid}__${day}`;
}

function parseCellId(cellId) {
  const [employeeUid, day] = cellId.split("__");
  return { employeeUid, day };
}

function openSaveScheduleModal() {
  saveScheduleNameInput.value = state.loadedSaveId
    ? state.loadedSaveName
    : `${state.currentWeekType} ${formatDateInput(state.weekStart)}`;
  saveScheduleError.textContent = "";
  openModal(saveScheduleModal);
  saveScheduleNameInput.focus();
}

function openLoadSchedulesModal() {
  renderSavedSchedulesList();
  openModal(loadSchedulesModal);
}

function openCustomTasksModal() {
  renderCustomTasksModal();
  customTaskError.textContent = "";
  openModal(customTasksModal);
  customTaskNameInput.focus();
}

function openModal(modal) {
  modal.classList.remove("is-hidden");
}

function closeModal(modal) {
  modal.classList.add("is-hidden");
}

function hasVisibleModal() {
  return !confirmModal.classList.contains("is-hidden") ||
    !customShiftModal.classList.contains("is-hidden") ||
    !saveScheduleModal.classList.contains("is-hidden") ||
    !loadSchedulesModal.classList.contains("is-hidden") ||
    !customTasksModal.classList.contains("is-hidden");
}

function askForConfirmation({ title, message, actionLabel = "Continue", danger = false }) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmAcceptButton.textContent = actionLabel;
  confirmAcceptButton.classList.toggle("danger-button", danger);
  openModal(confirmModal);
  confirmCancelButton.focus();

  return new Promise((resolve) => {
    const cleanup = (answer) => {
      closeModal(confirmModal);
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
  openModal(customShiftModal);
  customShiftInput.focus();

  return new Promise((resolve) => {
    const cleanup = (value) => {
      closeModal(customShiftModal);
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

function showToast(message) {
  if (!message) {
    return;
  }
  toast.textContent = message;
  toast.classList.remove("is-hidden");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.add("is-hidden");
  }, 2200);
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

function getShiftOptionLabel(preset) {
  return preset === customShiftValue ? "Custom..." : preset;
}

function getEventInputClass(color) {
  return color === "none" ? "event" : `event event-${color}`;
}

function getNoteInputClass(color) {
  return color === "none" ? "cell-note-input" : `cell-note-input note-${color}`;
}

function sanitizeHoursInput(value) {
  const next = Number(value);
  return Number.isFinite(next) ? Math.max(0, next) : 0;
}

function populateCellColorOptions(selectElement) {
  selectElement.innerHTML = "";
  cellColorOptions.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.value;
    option.textContent = color.label;
    selectElement.appendChild(option);
  });
}

function syncCellColorSelectValue(color) {
  const hasMatch = cellColorOptions.some((option) => option.value === (color || ""));
  cellEditorCellColor.value = hasMatch ? color || "" : "";
}

function populateCustomTaskColorOptions(selectElement) {
  selectElement.innerHTML = "";
  customTaskColorOptions.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.value;
    option.textContent = color.label;
    selectElement.appendChild(option);
  });
}

function getCustomTaskColorClass(color) {
  return customTaskColorOptions.some((option) => option.value === color)
    ? `custom-task-${color}`
    : "task-note";
}

function syncPtoFieldVisibility({ bulkMode, shiftValue }) {
  if (bulkMode) {
    cellEditorPtoField.classList.toggle("is-hidden", shiftValue !== "PTO");
    return;
  }

  cellEditorPtoField.classList.toggle("is-hidden", shiftValue !== "PTO");
}

function formatDateTime(value) {
  if (!value) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
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
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hydrateEmployees(employeeList) {
  employeeList.forEach((employee, index) => {
    const safeName = typeof employee.name === "string" && employee.name.trim()
      ? employee.name.trim()
      : `Employee ${index + 1}`;

    employee.name = safeName;
    employee.uid ||= createEmployeeUid(safeName);
    employee.keyType = typeof employee.keyType === "string" && employee.keyType.trim()
      ? employee.keyType.trim()
      : "A";
    employee.idNumber = typeof employee.idNumber === "string" ? employee.idNumber.trim() : "";
    employee.drawerNumber = typeof employee.drawerNumber === "string" ? employee.drawerNumber.trim() : "";

    if (Array.isArray(employee.roles)) {
      employee.roles = employee.roles.map((role) => String(role).trim()).filter(Boolean);
    } else if (typeof employee.roles === "string") {
      employee.roles = employee.roles
        .split(",")
        .map((role) => role.trim())
        .filter(Boolean);
    } else {
      employee.roles = ["T", "FSC"];
    }

    employee.fixedDayOff = weekDays.slice(0, 5).includes(employee.fixedDayOff)
      ? employee.fixedDayOff
      : "Monday";

    const saturdayGroup = Number(employee.saturdayGroup);
    employee.saturdayGroup = saturdayGroup === 2 ? 2 : 1;
    employee.saturdayRule = getDefaultSaturdayRuleForEmployee(employee);
    employee.latestShiftEnd =
      typeof employee.latestShiftEnd === "string" && employee.latestShiftEnd.trim()
        ? employee.latestShiftEnd.trim()
        : "";

    if (!employee.employmentType) {
      employee.employmentType =
        employee.targetHours && Number(employee.targetHours) !== 40 ? "part_time" : "full_time";
    }
    employee.employmentType = employee.employmentType === "part_time" ? "part_time" : "full_time";

    if (employee.targetHours === undefined || employee.targetHours === null || employee.targetHours === "") {
      employee.targetHours = employee.employmentType === "part_time" ? 20 : 40;
    }
    employee.targetHours = Number(employee.targetHours) || (employee.employmentType === "part_time" ? 20 : 40);
    if (employee.employmentType === "full_time") {
      employee.targetHours = 40;
    }

    if (employee.leadEligible === undefined) {
      employee.leadEligible = leadEligibleNames.has(employee.name);
    } else {
      employee.leadEligible = employee.leadEligible === true;
    }
  });
}

function applySupervisorDefaultsToEmployee(employee) {
  const override = supervisorEmployeeOverrides[employee?.name];
  if (!override) {
    return employee;
  }

  employee.fixedDayOff = override.fixedDayOff;
  employee.employmentType = override.employmentType;
  employee.targetHours = override.targetHours;
  employee.saturdayRule = cloneData(override.saturdayRule);
  employee.latestShiftEnd = override.latestShiftEnd || "";
  return employee;
}

function syncCustomKeyField() {
  employeeCustomKeyTypeInput.disabled = employeeKeyTypeInput.value !== "CUSTOM";
}

function syncTargetHoursField() {
  const isPartTime = employeeEmploymentTypeInput.value === "part_time";
  employeeTargetHoursInput.disabled = !isPartTime;
  if (!isPartTime) {
    employeeTargetHoursInput.value = "40";
    return;
  }

  if (!employeeTargetHoursInput.value || employeeTargetHoursInput.value === "40") {
    employeeTargetHoursInput.value = "20";
  }
}

function chooseShiftsForTarget(targetHours, slotCount, availableShifts, employee = null) {
  const options = [...availableShifts, "OFF"];
  let bestPlan = Array(slotCount).fill("OFF");
  let bestScore = Number.POSITIVE_INFINITY;

  function search(index, currentPlan, currentHours) {
    if (index === slotCount) {
      const score = Math.abs(targetHours - currentHours);
      if (score < bestScore || (score === bestScore && currentHours > sumPlanHours(bestPlan, employee))) {
        bestScore = score;
        bestPlan = [...currentPlan];
      }
      return;
    }

    options.forEach((shift) => {
      const shiftHours = getShiftHours(shift, employee);
      currentPlan.push(shift);
      search(index + 1, currentPlan, currentHours + shiftHours);
      currentPlan.pop();
    });
  }

  search(0, [], 0);
  return bestPlan;
}

function sumPlanHours(plan, employee = null) {
  return plan.reduce((total, shift) => total + getShiftHours(shift, employee), 0);
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
    .schedule-cell { min-height: 96px; padding: 0; background: #fff; }
    .shift-line { min-height: 42px; display: flex; align-items: flex-start; justify-content: center; padding: 8px 6px 6px; }
    .shift-display { width: 100%; text-align: center; font-weight: 800; }
    .note-pill.info-note, .note-blue { background: #5c9ed6; color: #fff; border-color: #5c9ed6; }
    .note-pill.lead-note { background: #3b2f8f; color: #fff; border-color: #3b2f8f; }
    .note-pill.closing-lead-note { background: #7a233f; color: #fff; border-color: #7a233f; }
    .note-pill.opener-note { background: #4d6f3f; color: #fff; border-color: #4d6f3f; }
    .note-pill.task-note { background: #800040; color: #fff; border-color: #800040; }
    .note-pill.custom-task-yellow { background: #f0e44b; color: #111; border-color: #f0e44b; }
    .note-pill.custom-task-pink { background: #b44b77; color: #fff; border-color: #b44b77; }
    .note-pill.custom-task-blue { background: #5c9ed6; color: #fff; border-color: #5c9ed6; }
    .note-pill.custom-task-green { background: #68b56c; color: #10260f; border-color: #68b56c; }
    .note-pill.custom-task-gray { background: #d8d8d8; color: #111; border-color: #d8d8d8; }
    .note-pill.custom-task-orange { background: #f2a541; color: #111; border-color: #f2a541; }
    .note-pill.audit-note, .note-green { background: #68b56c; color: #10260f; border-color: #68b56c; }
    .note-pill.pto-note { background: #f2a541; color: #111; border-color: #f2a541; }
    .note-pill.off-note { background: #d14d56; color: #fff; border-color: #d14d56; }
    .note-yellow { background: #f0e44b; color: #111; border-color: #f0e44b; }
    .note-pink { background: #b44b77; color: #fff; border-color: #b44b77; }
    .note-gray { background: #d8d8d8; color: #111; border-color: #d8d8d8; }
    .badge-saturday { background: #ececec; }
    .badge-lead { background: #3b2f8f; color: #fff; border-color: #3b2f8f; }
    .hours-badge { background: #111; color: #fff; border-color: #111; }
    .roles-line { font-weight: 700; font-size: 14px; padding-bottom: 8px; }
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
