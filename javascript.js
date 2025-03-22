document.addEventListener('DOMContentLoaded', function () {
    const calendarDays = document.getElementById('calendar-days');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const goButton = document.getElementById('go-button');
    const prevMonthButton = document.getElementById('prev-month-button');
    const nextMonthButton = document.getElementById('next-month-button');
    const selectedDateElement = document.getElementById('selected-date');
    const fileListElement = document.getElementById('file-list');
  
    let currentDate = new Date();
    let selectedDate = new Date(); // Track the selected date
  
    // Render the calendar
    function renderCalendar(year, month) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();
  
      calendarDays.innerHTML = '';
  
      // Fill in the blank days before the first day of the month
      for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('span');
        calendarDays.appendChild(emptyDay);
      }
  
      // Fill in the days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('span');
        day.textContent = i;
  
        // Highlight the selected date
        const dayDate = new Date(year, month, i);
        if (dayDate.toDateString() === selectedDate.toDateString()) {
          day.classList.add('selected');
        }
  
        // Add click event listener to handle date selection
        day.addEventListener('click', () => handleDateClick(year, month, i));
        calendarDays.appendChild(day);
      }
    }
  
    // Handle date click
    function handleDateClick(year, month, day) {
      selectedDate = new Date(year, month, day); // Update the selected date
      selectedDateElement.textContent = formatDate(selectedDate);
      displayFilesForDate(selectedDate);
      renderCalendar(year, month); // Re-render the calendar to highlight the selected date
    }
  
    // Display files for the selected date
    function displayFilesForDate(date) {
      const formattedDate = formatDate(date);
      const fileNamePattern = `*_${formattedDate.replace(/-/g, '_')}.pdf`;
  
      // Simulate fetching files (replace with actual file fetching logic)
      const files = [`THE_HINDU_UPSC_IAS_EDITION_HD_${formattedDate.replace(/-/g, '_')}.pdf`]; // Example file
      fileListElement.innerHTML = '';
  
      if (files.length > 0) {
        files.forEach(file => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = `data/${file}`;
          link.innerHTML = `${file} <span class="download-symbol">⬇️</span>`;
          link.download = file;
          listItem.appendChild(link);
          fileListElement.appendChild(listItem);
        });
      } else {
        fileListElement.innerHTML = '<li>No files found for this date.</li>';
      }
    }
  
    // Format date as DD-MM-YYYY
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
  
    // Initialize the calendar with the current month and year
    function initializeCalendar() {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
  
      // Set the current month and year in the dropdowns
      monthSelect.value = currentMonth;
      yearSelect.value = currentYear;
  
      // Render the calendar
      renderCalendar(currentYear, currentMonth);
      handleDateClick(currentYear, currentMonth, currentDate.getDate()); // Show today's files
    }
  
    // Event listener for the "Go" button
    goButton.addEventListener('click', () => {
      const selectedYear = parseInt(yearSelect.value);
      const selectedMonth = parseInt(monthSelect.value);
      renderCalendar(selectedYear, selectedMonth);
    });
  
    // Event listener for the "Previous Month" button
    prevMonthButton.addEventListener('click', () => {
      let currentMonth = parseInt(monthSelect.value);
      let currentYear = parseInt(yearSelect.value);
  
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
  
      monthSelect.value = currentMonth;
      yearSelect.value = currentYear;
      renderCalendar(currentYear, currentMonth);
    });
  
    // Event listener for the "Next Month" button
    nextMonthButton.addEventListener('click', () => {
      let currentMonth = parseInt(monthSelect.value);
      let currentYear = parseInt(yearSelect.value);
  
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
  
      monthSelect.value = currentMonth;
      yearSelect.value = currentYear;
      renderCalendar(currentYear, currentMonth);
    });
  
    // Initial render
    initializeCalendar();
  });