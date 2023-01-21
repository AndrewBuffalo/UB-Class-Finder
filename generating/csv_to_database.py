from datetime import datetime
import time
import sqlite3
import csv 


conn = sqlite3.connect('ub_classes.sqlite')
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS classes')
cur.execute('''
CREATE TABLE "classes"(
    "class" TEXT,
    "course" TEXT,
    "title" TEXT,
    "section" TEXT,
    "type" TEXT,
    "days" TEXT,
    "beginning_time" TIME,
    "ending_time" TIME,
    "room" TEXT,
    "location" TEXT,
    "instructors" TEXT,
    "status" TEXT  
)
''')

with open("ub_classes_query.csv") as f:
    reader = csv.reader(f)
    for line in reader:
        class_ = line[0]
        course = line[1]
        title = line[2]
        section = line[3]
        type_ = line[4]
        days = line[5]
        beginning_time = line[6]
        ending_time = line[7]
        room = line[8]
        location = line[9]
        instructors  = line[10]
        status = line[11]
        #print(line[12])
        cur.execute('''INSERT INTO classes(class,course,title,section,type,days,beginning_time,ending_time,room,location,instructors,status)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)''',(class_,course,title,section,type_,days,beginning_time,ending_time,room,location,instructors,status))
        conn.commit()