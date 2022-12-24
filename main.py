from datetime import datetime

# import sqlite3
# import csv 


# conn = sqlite3.connect('ub_classes.sqlite')
# cur = conn.cursor()

# cur.execute('DROP TABLE IF EXISTS classes')
# cur.execute('''
# CREATE TABLE "classes"(
#     "" ,
#     "" ,

# )
# ''')

#strfdate converts from OBJECT TO STRING
#strpdate converts from STRING TO OBJECT

time = "5:00 PM- 5:50 PM" #I REMOVED A SPACE
#CHANGE CSV FROM " 1:00 PM - 1:50 PM" TO "1:00 PM" AND "1:50 PM"
#d = datetime.strptime(time, "%H:%M:%S")
time = time.split("-")
#print(time[0])
time_object = datetime.strptime(time[0], '%I:%M %p')
d = datetime.strftime(time_object, "%H:%M:%S")
print(d) #this is a strong in the right way