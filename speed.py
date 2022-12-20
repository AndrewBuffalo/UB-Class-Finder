import csv
import time
import datetime

with open("ub_classes.csv") as f:
    time_beginning = datetime.datetime.now()
    reader = csv.reader(f)
    for line in reader:
        print(line)
    #time.sleep(5)
    time_end = datetime.datetime.now()
delta_t = time_end - time_beginning
print(delta_t) #parsing through the whole CSV takes 1.604365seconds