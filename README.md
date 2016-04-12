#How did I work with the data and visualization?
1. Without a more accurate headline and description, I think the first thing to do is to make clear what this data means exactly, aka its source, covered region, time period, etc. IAAF’s name appeared in the data and there are columns like “sanction” and “ineligible years”, so my guess is this is a list of suspended athletes by IAAF for doping violation.

2. By looking at the date columns, I also noticed the earliest “ineligible to date” is 8/27/2015, even though some of the “infraction date” start as early as 2004 (all of which under lifetime ban). This means the data probably only include athletes that are still under suspension currently (as of 8/27/2015), but not all the ones that have been punished since 2004. This is also supported by some similar documents I found on <a target="_blank" href="http://www.iaaf.org/download/download?filename=3deef999-07f5-4a93-96b9-03b7e18e0f3e.pdf&urlslug=List20athletes20serving20period20ineligibility20a20of20anti-doping20violation20IAAF%20rules">IAAF website</a>. But let me know if my guess was wrong. It is important to understand this since it might result in some misleading conclusions from the data. For example, at first glance I almost concluded that the IAAF sanctions have become less strict in the last decades since all the early infractions led to either lifetime ban or more than 10 years ineligibility, while as in recent years most sanctions are only 2 ineligible years. This is not true because all the lightly sanctioned athletes from 2004 are already released by now and no longer on this list, this dataset is therefore skewed and incomplete. Many analysis cannot be made due to this, such as “which year has most doping violations” or “what’s the average ineligible years for doping violations”. We need to be very careful about this.

3. The data is pretty clean and straightforward except for the column “rule”. There are misspelled drug names, inconsistent formats, extra space. What’s more, multiple violations for the same athlete are put in the same cell, making it hard to categorize and make analysis on this column. So I cleaned this column by dividing each violation into different columns and clustered them in Open Refine. By doing this, I was able to get the counts of different violations and get the top 10 for the chart.

4. I also calculated the number of doping athletes by country, which makes another chart people would be interested in. Russia is on the top of the list with 43 athletes.

5. Since the number of records is not huge, I decided to make a matrix of all the athletes on the list to allow users to explore the details of each one of them. I used national flags and border colors to categorize them and make it more visually interesting. You can also sort and filter these icons through multiple ways on the page.

#Functionalities I’d like to add
1. Animated effects of icons moving around

2. Filter icons by country and drug under tabs “Sort by Sanction Term” and “Sort by Ineligible Years Left” too

3. It doesn’t look perfect on mobile yet, better responsive design.

#Questions that might be interesting to report on
1. Why are sanctions different for the same violation? How does IAAF decide on this?

2. What’s the favorite drug for doping athletes from different countries? Is there any pattern? For example, 70% of Turkish athletes on the list used Stanozolol, while Kenyan athletes prefer Norandrosterone more (73%).

3. Why some of the suspended athletes seem to be getting their eligibility back before his/her sanction term ends?
