document.addEventListener('DOMContentLoaded', function () {
    const calendarDates = document.getElementById('calendar-dates');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDateElement = document.getElementById('selected-date');
    const filesList = document.getElementById('files');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Render the calendar
    function renderCalendar(month, year) {
        calendarDates.innerHTML = '';
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        currentMonthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(firstDay)} ${year}`;

        // Fill in the days
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            calendarDates.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-day');
            day.textContent = i;
            day.addEventListener('click', () => handleDateClick(year, month, i));
            calendarDates.appendChild(day);
        }
    }

    // Handle date click
    function handleDateClick(year, month, day) {
        const selectedDate = new Date(year, month, day);
        selectedDateElement.textContent = selectedDate.toLocaleDateString();
        displayFilesForDate(selectedDate);
    }

    // Display files for the selected date
    function displayFilesForDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const fileNamePattern = `*_${day}_${month}_${year}.pdf`;

        // Simulate fetching files (replace with actual file fetching logic)
        const files = [`THE_HINDU_UPSC_IAS_EDITION_HD_${day}_${month}_${year}.pdf`]; // Example file
        filesList.innerHTML = '';

        if (files.length > 0) {
            files.forEach(file => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `data/${file}`;
                link.textContent = file;
                link.download = file;
                listItem.appendChild(link);
                filesList.appendChild(listItem);
            });
        } else {
            filesList.innerHTML = '<li>No files found for this date.</li>';
        }
    }

    // Navigation buttons
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Initialize
    renderCalendar(currentMonth, currentYear);
    handleDateClick(currentYear, currentMonth, currentDate.getDate());
});






