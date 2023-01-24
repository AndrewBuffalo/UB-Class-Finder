from flask import Flask
from flask import render_template, make_response
from datetime import datetime, timedelta
import sqlite3
from pytz import timezone
import os
import json
import generating.converter as converter

app = Flask(__name__)


@app.route("/classes", methods=['POST', 'GET'])
def index():
    tz = timezone('EST')
    current_time = datetime.now(tz)
    result = {}
    south_campuslist = []
    north_campuslist = []
    down_townlist = []
    # print(os.getcwd() + r'\\ub_classes.sqlite')
    conn = sqlite3.connect(r'./ub_classes.sqlite')
    c = conn.cursor()
    current_time_4 = current_time - timedelta(hours=4)
    hm = current_time + timedelta(hours=10)
    # SOUTH CAMPUS START
    c.execute('''SELECT * FROM classes WHERE location = 'South Campus' ''')
    for i in c.fetchall():
        south_campuslist.append(i)
        # u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'South Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''', (datetime.strftime(current_time, "%H:%M:%S"),
          datetime.strftime(current_time_4, "%H:%M:%S"),
          datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        # MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
        if converter.converter((datetime.now().strftime('%A')) in str(i[5])):
            south_campuslist.remove(i)
    result['South Campus'] = south_campuslist
    # SOUTH CAMPUS END

    # NORTH CAMPUS START
    c.execute('''SELECT * FROM classes WHERE location = 'North Campus' ''')
    for i in c.fetchall():
        north_campuslist.append(i)
        # u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'North Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''', (datetime.strftime(current_time, "%H:%M:%S"),
          datetime.strftime(current_time_4, "%H:%M:%S"),
          datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        # MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
        if converter.converter((datetime.now().strftime('%A')) in str(i[5])):
            north_campuslist.remove(i)
    result['North Campus'] = north_campuslist
    # NORTH CAMPUS END

    # DOWNTOWN START
    c.execute('''SELECT * FROM classes WHERE location = 'Downtown Campus' ''')
    for i in c.fetchall():
        down_townlist.append(i)
        # u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'Downtown Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''', (datetime.strftime(current_time, "%H:%M:%S"),
          datetime.strftime(current_time_4, "%H:%M:%S"),
          datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        # MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
        if converter.converter((datetime.now().strftime('%A')) in str(i[5])):
            down_townlist.remove(i)
    result['Downtown Campus'] = down_townlist
    # DOWNTOWN END
    print(len(result['North Campus']) +
          len(result['South Campus']) + len(result['Downtown Campus']))
    return json.dumps(result)
# usable = usable
# Whatever you return is what I am going to receive in my frontend also prob return it using
# json.dumps(the final thing uve been working with) not entirely sure if it matters


def getClassList(usable):
    final = []
    for list in usable:
        final.append(list[8])
    return final


@app.route("/south", methods=['POST', 'GET'])
def south():
    usable = json.loads(index())
    usable = usable['South Campus']
    return json.dumps(getClassList(usable))


@app.route("/north", methods=['POST', 'GET'])
def north():
    usable = json.loads(index())
    usable = usable['North Campus']
    return json.dumps(getClassList(usable))


@app.route("/downtown", methods=['POST', 'GET'])
def downtown():
    usable = json.loads(index())
    usable = usable['Downtown Campus']
    return json.dumps(getClassList(usable))


if __name__ == '__main__':
    app.run(debug=True)
    #merge test