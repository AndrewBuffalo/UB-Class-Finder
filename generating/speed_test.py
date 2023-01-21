# THIS PYTHON FILE IS ONLY FOR TESTING OUT THE SPEED OF RETRIEVING DATA
import csv
import time
import datetime

with open("ub_classes.csv") as f:
    time_beginning = datetime.datetime.now()
    reader = csv.reader(f)
    i=0
    for line in reader:
        i+=1
    #time.sleep(5)
    time_end = datetime.datetime.now()
delta_t = time_end - time_beginning 
print(delta_t) #parsing through the whole CSV takes 0:00:00.005003 seconds