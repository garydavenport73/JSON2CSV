# JSON2CSV
Converts an array of objects in JSON format to CSV

Here is what I have done.  First of all, there are a lot of flavors of csv.  So I've approached it this way, and my files seem to open up ok in spreadsheet editors.  Adapted from RFC 4180 and MIME standards/wikipedia:

1) Each record should contain the same number of comma-separated fields.
2) Any field may be quoted (with double quotes).
3) If double-quotes are used to enclose fields, then a double-quote in a field must be represented by two double-quote characters. (internal " is escaped with "")
4) some type of carriage return/line feed

I know there are more complicated faster, and more elegant ways, but here is a readable and hopefully understandable function that will take in JSON and return a csv with those constraints.

Here is a rundown of the function, again not optimized for performance as it uses 2 passes.

1) Run through every array entry and get and collect all the key names on the first pass.
2) Make a header based on the key names
3) On a second pass, go through the entries and write the values using the keys.

If its undefined, don't write "undefined", instead write "".
If its not a string, stringify it. (After all its valid JSON, so just use JSON.stringify.)  This will take care of objects, arrays, null, boolean, etc.
If it is a string do nothing of course.

Now replace any interior " with "".

Now wrap each entry in an outer pair of "" separated by commas with no spaces.

Don't forget the new line \n between lines.

The result is a string that should open in most spreadsheets easily.
