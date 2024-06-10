# How to run:
## Frontend
1. In the terminal, enter `cd fronted`.
2. Now that you're in the `frontend` folder, enter `npm install` in the terminal.
3. Wait for the modules to be installed.
4. After installing the modules, interminal, enter `npm run dev`.

## Backend
1. Make sure that you're inside the `backend` folder. Enter `cd backend` if you're in the main folder.
2. Now that you're in the `backend` folder, enter `npm install` in the terminal.
3. Wait for the modules to be installed.
4. After installing the modules, in the terminal, enter `npm start`.

---

# APIs
### Users
<dl>
  <dt>Users</dt>
  <dd>// @route   GET api/users</dd>
  <dd>// @desc    Get all users</dd>
  ---
  <dd>// @route   POST api/users</dd>
  <dd>// @desc    Add a new user</dd>
  ---
  <dd>// @route   PUT api/users/:id</dd>
  <dd>// @desc    Update a user</dd>
  ---
  <dd>// @route   DELETE api/users/:id</dd>
  <dd>// @desc    Delete a user</dd>

<dt>Announcements</dt>
<dd>// @route   GET api/announcements</dd>
  <dd>// @desc    Get all announcements</dd>
  ---
  <dd>// @route GET api/announcements/:id</dd>
  <dd>// @desc Get an announcement by ID</dd>
  --
  <dd>// @route DELETE api/announcements/:announcement_id</dd>
  <dd>// @desc Delete an announcement</dd>
  ---
  <dd>@route POST api/announcements/:id/comments</dd>
  <dd>@desc Add a comment to an announcement</dd>
  ---
  <dd>@route POST api/announcements/:id/like</dd>
  <dd>@desc Add a like to an announcement</dd>
</dl>
