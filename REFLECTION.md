# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Using plain dom code you need to add file one by one import,routing and connect all files with the correct order and file, while declaratively setup it for you so you can edit file immediately.

2. Why must a component name start with a capital letter?
so that react can differentiate between regular html and section of styling 

3. What does a fragment <>...</> do, and why not just use a <div>?
<> indicate what section we add in the interface for example <div> stand for divison making a differences between other section layout, <h1> means heading usually use for words only.

4. Name one benefit of splitting the UI into small components.
more flexible in styling, testing and fix.

# week 4 reflection
- After finishing and complete the code, one bug that is found is that Vendor card did not return any vendor in json file, instead it return
"${vendor.id}" 
This is then fix by go into useVendors.js files. To check wether the json files is fetched and parsed I added console log so that
I can see the logs on browser console, unexpectedly I was wrong and it works fine, this told me that the data is moving fine. Then check the
VendorCard because the error is message sent by that file. In the code there is actually a human mistake where the code read it not as a insertable value
instead it read it as string because I used ''. to fix this mistake I just need to change it to backticks ``.