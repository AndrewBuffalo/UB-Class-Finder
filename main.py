from datetime import datetime
import sqlite3
#strfdate converts from OBJECT TO STRING
#strpdate converts from STRING TO OBJECT
#print((datetime.now().strftime("%A"))[0])

conn = sqlite3.connect("ub_classes.sqlite")
c = conn.cursor()

c.execute("SELECT * FROM classes WHERE status = 'Open' ")

print(len(c.fetchall()))

conn.commit()

conn.close()