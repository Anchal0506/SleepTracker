# Sleep Tracker

### Introduction

The Sleep Tracker application allows users to log their sleep patterns by providing a timestamp and the number of hours slept. Users can easily retrieve their sleep records from the database, sorted by timestamp. Moreover, Sleep Tracker enables users to delete specific sleep records as needed.

### Tracker Features

- Users record sleep by timestamp & hours
- Users can retrieve sleep records recorded in DB sorted by timestamp
- Perticular record can be deleted if user wants to

### Installation Guide

- Clone this repository [here](https://github.com/Anchal0506/SleepTracker).
- Run `npm install` to install all dependencies

### Usage

- Run `npm start` to start the application.
- Connect to the API using Postman on port 3000.
- API will listen on address http://localhost:3000

### API Endpoints

| HTTP Verbs | Endpoints      | Action                                |
| ---------- | -------------- | ------------------------------------- |
| POST       | /sleep         | To add sleep record                   |
| GET        | /sleep/:userId | To retrieve all sleep records of user |
| DELETE     | /api/causes    | To delete a single sleep record       |

### Routes 

```js
POST /sleep
```

<table>
<tr>
<td> REQUEST METHOD </td> <td> ROUTE </td> <td> BODY </td>
</tr>
<tr>
<td> POST </td>
<td> <code> /sleep </code> </td>
<td>

```dart
{
  "userId": string & required,
  "timestamp": integer & required,
  "hours": integer & required,
}
```

</td>
</tr>
</table>

<hr>

#### Example Request
```bash
curl --location 'http://localhost:3000/sleep' \
--header 'Content-Type: application/json' \
--data '{
    "userId":1,
    "hours":12,
    "timestamp":1234567
}'
```
<hr>

<table>
<tr>
<td> RESPONSE STATUS </td>  <td> RESPONSE </td> <td> EXAMPLE RESPONSE </td>
</tr>
<tr>
<td> 201 </td>
<td>

```dart
{
    "id": integer
    "userId": string ,
    "timestamp": integer ,
    "hours": integer ,
}
```
<td> 

```json
{
    "id": 4,
    "userId": 1,
    "hours": 12,
    "timestamp": 1234567
}
```
</td>

</td>
</tr>
<tr>
<td> 400 </td>
<td>

```dart
{
    "error": string
}
```

</td>
<td>

```json
{
    error: "userId, hours, and timestamp are required" 
}
```
</td>
</tr>
</table>
<hr>
<br>

```js
GET /sleep/:userId
```

<table>
<tr>
<td> REQUEST METHOD </td> <td> ROUTE </td> <td> BODY </td>
</tr>
<tr>
<td> GET </td>
<td> <code> /sleep/:userId </code> </td>
<td>
<code> - </code>

</td>
</tr>
</table>

<hr>

#### Example Request
```bash
curl --location 'http://localhost:3000/sleep/1'
```
<hr>



<table>
<tr>
<td> RESPONSE STATUS </td>  <td> RESPONSE </td> <td> EXAMPLE RESPONSE </td>
</tr>
<tr>
<td> 200 </td>
<td>

```dart
[
    {
        "id": integer
        "userId": string ,
        "timestamp": integer ,
        "hours": integer ,
    }
]
```

</td>
<td>

```dart
[
    {
        "id": 4,
        "userId": 1,
        "hours": 12,
        "timestamp": 1234567
    },
    {
        "id": 4,
        "userId": 1,
        "hours": 12,
        "timestamp": 1234567
    },
]
```
</td>
</tr>
</table>
<hr>


```js
DELETE /sleep/:recordId
```

<table>
<tr>
<td> REQUEST METHOD </td> <td> ROUTE </td> <td> BODY </td>
</tr>
<tr>
<td> DELETE </td>
<td> <code> /sleep/:recordId </code> </td>
<td>

`-`

</td>
</tr>
</table>

<hr>

#### Example Request

```bash
curl --location --request DELETE 'http://localhost:3000/sleep/123' 
```

<hr>

<table>
<tr>
<td> RESPONSE STATUS </td>  <td> RESPONSE </td> <td> EXAMPLE RESPONSE </td>
</tr>
<tr>
<td> 204 </td>
<td>

`-`

</td>
<td> 

`-`
</td>
</tr>
<tr>
<td> 404 </td>
<td>

```dart
{
    "error": string
}
```
</td>
<td>

```json
    {
        "error" : "Record not found"
    }
```
</td>
</tr>
</table>
<hr>



### Test

- To run test `npm test`
- Test are in `/test` folder

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [Mocha](https://mochajs.org/) This is NodeJS Teating framewor.
- [Chai](https://www.chaijs.com/) Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

### Authors

- [Anchal Kawale](https://github.com/Anchal0506)
