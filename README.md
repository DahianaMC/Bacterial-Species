# Bacterial-Species
## Challenge 12
### Objectives
- Create a bar chart of the top ten bacterial species in a volunteer’s navel. Use JavaScript to select only the most populous species.
- Create a bubble chart to visualize the relative frequency of all the bacterial species found in a volunteer’s navel.
- Complete the demographic information panel.

### Creating a Bar Chart
- We called the sample array from data, then we slice the top 10 bacterias since the sample values array is sorted already, we only sliced the data from 0 to 10. We need to convert the OTU_id numbers to strings to be able to make the bar chart requested.  We added the prefix OTU to the numbers after making them strings using the map and to string methods.

### Creating a Bubble Chart
- In this case we are plotting all the data from sample values and OTU_ids.  This data came from data.samples.

### Demographic Information
- The data came from data.metadata.  We are using object.entries and forEach methods to call each object from the metadata array.

### Extra Challenge: Adding a gauge chart
- It was very challenge to get this one displayed, the needle is moving properly depending on belly buttom washing frequency, but I could not figure it out how to put the neddle in the middle of the gauge.  I left the gauge in the plot becuase is almost done and I would like to know how to put it in the middle.  I will update my code after knowing how to do this.


