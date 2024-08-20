# SoftSharesAI2
This web application is a full-stack application designed for managing users and areas within an organization. It includes authentication and user management features and the ability to create, view, and manage organizational areas. It's supposed to work with the mobile application, where all users can share and recommend places in their respective areas.

# Features Implemented:
1. Authentication:
Users can register, log in, recover passwords, and change their password if needed.
JWT tokens are used to authenticate users, with tokens stored in localStorage for session management.

2. User Management:
Admin users can list all users, activate or deactivate users, and change their roles between "common user" and "administrator".
The interface for listing users includes a search functionality and pagination.
Admin users can click on a user’s name to view their profile, which includes details such as the user’s name, associated area, birthdate, and account status (active or inactive).
Area Management:

3. Users can view a list of all areas.
Only the super admin (user with ID = 0) can create new areas. Other users will see a message indicating they don't have permission to create areas.
The area creation interface allows the super admin to input the name of a new area and add it to the database.

# Remaining Features to Implement:

1. Enhanced Area Management:
Implement functionalities to edit and delete areas, as well as assigning users to specific areas.

2. Additional Menu Options:
Add more menu options for the super admin, such as "Create New Group," "Add Location," and "Create Forum."
Implement the backend and frontend logic for managing groups, locations, and forums.

3. Error Handling and Validation:
Improve error handling, especially for scenarios like duplicate entries or invalid inputs.
Add validation and feedback mechanisms in the user interface to enhance user experience.

4. Refinement and Optimization:
Optimize the codebase for performance and maintainability.
Enhance the overall user interface with better styling and usability improvements.

