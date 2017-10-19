![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Code-401-Javascript Lab-27
===
This is day 27 of lab with Code Fellows. The purpose of the lab is to teach students the basics of react along with making ajax request to reddit for data.
# Reddit Search App
An app that allows the user to search redit for different boards. Each search will provide a number of topics for the provided board. The data displayed will be a link tag with the name of the topic and the number of upvotes it received. The user can also provide a limit which will show the amount of topics specified by this limit.
### main.js
* ##### Components
    * App
      * Contains all of the application state
      * Contains methods for modifying the application state
      * The state has a topics array for holding the results of the search
    * SearchForm
      * Contains a text input for the user to supply a reddit board to look up
      * Contains a number input for the user to limit the number of results to return
        * The number must be less than 100 and greater than 0
      * On submit the form makes a request to reddit
        * Makes a get request to http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}
        * On success it passes the results to the application state
        * On failure it adds a class name to the form called error and turns the input's border red.
    * SearchResultList
      * Inherits all search results through props
      * If there are topics in the application state it displays an unordered list
      * Each list item in the unordered list contains the following
        * an anchor tag with a href to the topic.url
        * inside the anchor a heading tag with the topic.title
        * inside the anchor a p tag with the number of topic.ups
