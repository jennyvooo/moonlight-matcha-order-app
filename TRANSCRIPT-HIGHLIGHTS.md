## Transcript Highlights

### 1. Planning the app architecture (Early in the session)
Before writing any code, I asked Claude to help plan the structure of the application, including the components, state management, and localStorage data model. This helped break the project into manageable pieces and ensured the five required features would work together before starting implementation.

### 2. Debugging cart logic issues (Mid-session)
During a code review of the cart logic, Claude identified several bugs. One issue was using `Date.now()` as the cart item ID, which could create duplicate IDs if two items were added within the same millisecond. This was fixed by switching to `crypto.randomUUID()` so each cart item would always have a unique identifier.

### 3. Using human judgment to reject a design suggestion (Late session)
Toward the end of development, Claude suggested adding emoji icons and gradient backgrounds to menu items because there were no available images. I rejected this change because it did not match the design direction I wanted for the app. Instead, I redirected the work toward improving the responsive layout and polishing the interface.