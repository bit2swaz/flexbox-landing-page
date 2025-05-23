document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeToggleButton(currentTheme);
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        updateThemeToggleButton('dark-mode');
    }

    function updateThemeToggleButton(theme) {
        const iconSpan = themeToggleBtn.querySelector('.icon');
        if (theme === 'light-mode') {
            iconSpan.textContent = '🌙';
        } else {
            iconSpan.textContent = '☀️';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeToggleButton('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeToggleButton('light-mode');
        }
    });

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('show-dropdown');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show-dropdown');
            }
        });

        dropdownLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownMenu.classList.toggle('show-dropdown');
                if (dropdownMenu.classList.contains('show-dropdown')) {
                    dropdownMenu.querySelector('a')?.focus();
                }
            } else if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show-dropdown');
                dropdownLink.focus();
            }
        });

        dropdownMenu.addEventListener('keydown', (e) => {
            const focusableElements = Array.from(dropdownMenu.querySelectorAll('a'));
            const focusedItemIndex = focusableElements.indexOf(document.activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (focusedItemIndex < focusableElements.length - 1) {
                    focusableElements[focusedItemIndex + 1].focus();
                } else {
                    focusableElements[0].focus();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (focusedItemIndex > 0) {
                    focusableElements[focusedItemIndex - 1].focus();
                } else {
                    focusableElements[focusableElements.length - 1].focus();
                }
            } else if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show-dropdown');
                dropdownLink.focus();
            }
        });
    });
});