# NowTV React Interview

![NowTV](./logo.png)

## Commands

- **npm start**: Runs the web application in developer mode
- **npm test**: Executes Jest tests that have the `.test.js` extension

## Tasks

Feel free to create new files to help you complete these tasks. Please ask before downloading any external libraries, most will be fine.

1. In `service.js`, utilise the 'APIs' provided by `data.js` to create a promise resolving to an array of chatlog messages in the following format, sorted by time.

```json
[
  {
    "messageId": "12356",
    "userId": "613651251",
    "fullName": "Robin Balmforth",
    "timestamp": "2017-02-23T14:57:20.629Z",
    "email": "robin@example.com",
    "message": "Hello, World!",
    "avatar": null
  },
  ...
]
```
(Do not modify `data.js` to achieve this, but if you think there's an issue ask the developer helping you!)

2. Create a view of this dataset, with the root of your React application starting in `App.js`. Including:
  - Display the `avatar` where applicable
  - Display the `email` on hover
  - Format the timestamp to be human readable

3. Zip test back up and send it back to recruiter.

4. Bonus Questions:
  - How would you achieve this with Redux?
  
    With Redux, the application will have to store the chatlist in central redux store. By default this list will be empty.
    ChatList component would map to this store data as props.
    'getChatLog' method (in service.js) will become an action that would be fired on ChatList componentDidMount.
    When 'getChatLog' action will be fired it would update chatlist in store and update the view.

  - How would you handle an error from the API?
  
    If an error is returned from API, then the  promise in getChatLog will be rejected. 
    This would update the error state in App and display it in view. I have addressed this scenario in tests.
    Application can also convert the errors from API to generic user friendly error messages. 
    This can be done in getChatLog method while rejecting the promise.
      
  - If you were to continue this application, what would you add?
  
    Application needs some work on UI. To improve user experience better loading indicators can be introduced. To generate user friendly error messages you can type cast errors. 
  
  - If you were to deploy this application (or any web application) to production, how would you personally do it?
  
    Usually CI/CD pipeline would be set that upon check-in would build,run test and deploy to integration environment. From there the application should deployable to other environments (subject to testing)

  - Finally, what did you think of the test? 😀

    It was good and I enjoyed it.


