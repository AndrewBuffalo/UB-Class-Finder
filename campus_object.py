import sqlite3

    #format {north
#north: [(), (),(),()]
#south: [(), (), (),()]
#downtown:[(), (), (), ()]
#}
result = {}
south_list = []
north_list = []
downtown_list = []
conn = sqlite3.connect("ub_classes.sqlite")
c = conn.cursor()
c.execute("SELECT * FROM classes WHERE location = 'South Campus'")
for i in c.fetchall():
    south_list.append(i)
result['South Campus'] = south_list
c.execute("SELECT * FROM classes WHERE location = 'North Campus' ")
for i in c.fetchall():
    north_list.append(i)
result['North Campus'] = north_list
c.execute("SELECT * FROM classes WHERE location = 'Downtown Campus'")
for i in c.fetchall():
    downtown_list.append(i) 
result['Downtown Campus'] = downtown_list
u = 0
for i in result['South Campus']:
    u+=1
for i in result['Downtown Campus']:
    u+=1
for i in result['North Campus']:
    u+=1
#print(u)
result