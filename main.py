from datetime import datetime
import sqlite3
#strfdate converts from OBJECT TO STRING
#strpdate converts from STRING TO OBJECT
#print((datetime.now().strftime("%A"))[0])

conn = sqlite3.connect("ub_classes.sqlite")
c = conn.cursor()

c.execute("SELECT * FROM classes WHERE time(ending_time) < '08:00:00' ")

for i in c.fetchall():
    print(i)
conn.commit()

conn.close()