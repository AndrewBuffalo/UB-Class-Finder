from datetime import datetime
import sqlite3
#strfdate converts from OBJECT TO STRING
#strpdate converts from STRING TO OBJECT
#print((datetime.now().strftime("%A"))[0])

conn = sqlite3.connect("ub_classes.sqlite")
c = conn.cursor()

#c.execute("SELECT * FROM classes WHERE time(ending_time) > '22:00:00' ")
c.execute("SELECT * FROM classes ")
classes = []
for i in c.fetchall():
    if i[5] not in classes:
        classes.append(i[5])
c.execute("SELECT * FROM classes WHERE time(ending_time) > '22:00:00'")
c.execute("SELECT * FROM classes WHERE time(ending_time) < '22:00:00'")
for i in c.fetchall():
    print(i)
conn.commit()

conn.close()