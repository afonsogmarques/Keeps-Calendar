# Keeps interview Calendar project :calendar:
This is an Angular front-end project that implements a calendar view with a number of required features. It was designed to be user-friendly, visually appealing, and fully functional on most desktop and mobile resolutions. The project is fully functional and user-friendly, with a focus on ease of use and practicality. However, there are several areas where the project could be improved: The app is not yet fully responsive, and there are some visual bugs that need to be addressed. Additionally, the app has not yet been tested, so there may be some bugs that need to be fixed.

# Live Demo
https://keeps-calendar.netlify.app

## Features
- Display a calendar view for a selected month.
- Add reminders with a title, date, time and color.
- Display reminders on a calendar day view.
- Display a notification icon with the amount of reminders on a single calendar day view.
- Handle reminder overflow on a single day.
- Edit reminders including title, date, time and color.
- Delete reminders.
- Dark mode.
- Persist data through browser's local storage, including dark mode preference.
- Attempt at responsive design.

## Usage
The calendar view displays the current month by default. You can navigate to previous and next months (and years) using the left and right arrow screen buttons.

### Adding a reminder
To add a reminder, click on a day in the calendar view. A modal with all the reminders set to that date - sorted by ascending order of time - will pop-up. You will see a '+' button at the top, click it and fill in the reminder form that appears. The maximum allowed number of characters is 30, so don't go William Shakespeare on it! Pick a time, an **optional** priority tag, and you should be all set to submit that form! To do that, simply click the 'Done' icon button, or hit the 'Enter / Return' key. And don't worry, if you forget to fill in any of the details, inputs will start to turn red everywhere 🔴

### Editing a reminder
To edit a reminder, click the pencil icon on the far-right side of its designated box. A new form should pop up in its place, which allows you to edit the reminder in the same fashion the aforementioned input does. This time around, however, you'll also be allowed to edit the date of the reminder, just in case you misclicked it the first time. Don't worry if it just disappears, it surely has been moved to the new date.

### Deleting a reminder
Yep. You guessed it. Just click that cross icon next to the pencil icon. Couldn't make it any easier.

### Closing the modal
To close the open day modal, click outside of the modal bounds, or press the 'Escape' key.

##  
**All the data is updated as you interact with the app. The current day is automatically highlighted and the reminders automatically updated as well. For example, as soon as you update a reminder's date, that reminder will disappear from the current modal view and will be moved to the newly set date and appear in the relevant day in the calendar view.**

## Further Improvements
- If given more time, I would probably have made the app fully responsive. Although it works well on most desktop resolutions, it is not 100% cross-browser compatible (some visual bugs are still present, for example, in Safari), and it isn't pixel-perfect (at least to my standards) on all mobile resolutions.
- I don't know much about testing, so that is another topic I would've delved into if provided more time.
- Would've also added new animations/transitions and polished out some of the already existing ones.
- Would probably try to implement a search bar, in order to be able to search reminders.
- Would add filters to the modal view, so that the user could filter reminders, for example, by tag.

## Thank you for reading this far, and hope you enjoying using my calendar!
If you have any questions, feel free to reach out to me! Cheers!

